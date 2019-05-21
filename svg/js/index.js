'use strict'
const nodes = document.getElementsByClassName("b-node") // 获取的所有流程节点
const headerNode = document.getElementById("headerNode") // 头部容器
const toolBox = document.getElementById("toolBox")// 左边工具栏
const center = document.getElementById("center")// 画布的wrapper
const designArea = document.getElementById("designArea") // 流程设计画布
let selectNode // 工具栏中被选中的节点
let isInDesignArea = false // 是否放到流程画布中
let toolBar // 点击画布中流程节点显示的工具栏
/*-------------------------- 流程内的svg节点相关 --------------------------*/
let svgNode
let isMove = false // 判断svg元素是允许移动
let isArrowDown = false // 判断箭头是否被按下
let dottedLine // 箭头按下的虚线
let svgNodesInfo = [] // 画布上所有svg节点的信息数组
let startNodeInfo = {} // 连线开始的svg节点的信息
let endNodeInfo = {} // 连线结束的svg节点的信息
let linesInfo = [] // 连接线信息集合
for (let node of nodes) {
    node.addEventListener('mousedown', function (e) {
        e.preventDefault() // 阻止默认事件
        selectNode = node.cloneNode(true)
        selectNode.style.position = 'absolute'
        selectNode.style.listStyle = 'none'
        selectNode.style.border = '2px solid rgba(131, 208, 242, 1)'
        selectNode.style.backgroundColor = 'rgba(131, 208, 242, 0.2)'
        selectNode.style.borderRadius = '4px'
        selectNode.style.padding = '4px 8px'
        selectNode.style.left = e.clientX
        selectNode.style.top = e.clientY
        document.body.style.overflow = 'hidden'
        document.body.appendChild(selectNode)
    })
}
// 用事件代理的方法代替多个绑定事件
// toolBox.addEventListener('mousedown', function (e) {
//     if (e.target.nodeName.toLowerCase() === 'li') {
//         selectNode = e.target.cloneNode(true)
//     } else if(e.target.nodeName.toLowerCase() === 'span') {
//         可以获取parent的node，考虑到各个浏览器属性名不一样，暂时不用
//         selectNode = e.target.cloneNode(true)
//     } else if(e.target.nodeName.toLowerCase() === 'img') {
//         selectNode = e.target.cloneNode(true)
//     }
//     e.preventDefault() // 阻止默认事件
//     initSelectNode()
// })
// 以坐标计算的方式代替绑定移入移除
// designArea.addEventListener('mouseover', function () {
//     isInDesignArea = true
// })
// designArea.addEventListener('mouseout', function () {
//     isInDesignArea = false
// })
/**
 * 以坐标计算的方式监听元素放的位置，避免绑定多个移入移除事件
 * */
function getOffsetXY(e) {
    let startX = toolBox.offsetWidth
    let startY = headerNode.offsetHeight
    let endX = toolBox.offsetWidth + designArea.clientWidth
    let endY = headerNode.offsetHeight + designArea.clientHeight
    isInDesignArea = e.clientX > startX && e.clientY > startY && e.clientX < endX && e.clientY < endY
}
/**
 * 放置左边工具栏选择的元素
 * */
var bodyMove = (function() {
    let flag = true
    return function (e) {
        if (flag) {
            flag = false
            setTimeout(function () {
                if (selectNode) {
                    selectNode.style.left = e.clientX + 'px'
                    selectNode.style.top = e.clientY + 'px'
                }
                flag = true
            }, 15)
        }
    }
})()
/**
 * @param e 为回调函数中的当前元素，移到哪里就是哪个元素
 * */
document.body.addEventListener('mousemove', bodyMove)
document.body.addEventListener('mouseup', bodyMouseup, false)

/**
 * body内的鼠标弹起事件
 * */
function bodyMouseup(e) {
    // 从左边工具栏拖拽进画布
    if (selectNode) {
        document.body.removeChild(selectNode)
        getOffsetXY(e)
        if (isInDesignArea) {
            const id = selectNode.id
            const x = e.clientX - toolBox.offsetWidth
            const y = e.clientY - headerNode.offsetHeight
            const node = processNodeFactory(id, x, y)
            const nodeInfoId = getUUID()
            node.setAttribute("id", nodeInfoId)
            designArea.appendChild(node)
            svgNodesInfo.push(getSvgNodeInfo(node.getBBox(), nodeInfoId))
        }
        selectNode = null
        document.body.style.overflow = 'auto'
    }
    // 弹起后不再允许移动
    if (isMove) {
        isMove = false
    }
    let isInLi = isMouseupInLi(e)
    let isInSvg = isMouseupInSvg(e)
    // 弹起位置不在svg元素和工具栏内时，清除工具栏
    if (toolBar && toolBar.parentNode && !isInLi && !isInSvg) {
        toolBar.parentNode.removeChild(toolBar)
    }
    // 箭头连线按钮是否被按下
    if (isArrowDown) {
        if (isInSvg) {
            const nodeInfoId = e.target.getAttribute("id")
            endNodeInfo = svgNodesInfo.find(item => item.id === nodeInfoId)
            let line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
            line.setAttribute("stroke", "#000")
            line.setAttribute("marker-end", "url(#myArrow)")
            line.setAttribute("x1", startNodeInfo['right']['x'])
            line.setAttribute("y1", startNodeInfo['right']['y'])
            line.setAttribute("x2", endNodeInfo['left']['x'])
            line.setAttribute("y2", endNodeInfo['left']['y'])
            designArea.appendChild(line)
            debugger
            let lineInfo = line.getBBox()
            linesInfo.push(line)
            startNodeInfo = {}
            endNodeInfo = {}
            svgNode = e.target
        }
        if (dottedLine && dottedLine.parentNode) {
            dottedLine.parentNode.removeChild(dottedLine)
        }
        isArrowDown = false
    }
}
/**
 * 根据传入的流程id和坐标创建对应svg实例
 * */
function processNodeFactory(id, x, y) {
    let node
    switch (id) {
        case 'startEvent':
            node = createStartEvent(x, y)
            break
        case 'endEvent':
            node = createEndEvent(x, y)
            break
        case 'userTask':
            node = createRect(x, y)
    }
    node.addEventListener('mousedown', svgDown)
    node.addEventListener('mouseup', designAreaUp, false)
    return node
}

/**
 * 创建开始节点
 * */
function createStartEvent(x , y) {
    const startEvent = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    startEvent.setAttribute("cx", x)
    startEvent.setAttribute("cy", y)
    startEvent.setAttribute("r", '20')
    startEvent.style.stroke = 'rgba(88, 88, 88, 1)'
    startEvent.style.fill = 'transparent' // 这个属性为none时的时候，点不到svg元素中心
    // startEvent.style.pointerEvents = 'pointer'
    return startEvent
}

/**
 * 创建结束节点
 * */
function createEndEvent(x , y) {
    const endEvent = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    endEvent.setAttribute("cx", x)
    endEvent.setAttribute("cy", y)
    endEvent.setAttribute("r", '20')
    endEvent.style.stroke = 'rgba(88, 88, 88, 1)'
    endEvent.style.fill = 'transparent'
    endEvent.style.strokeWidth = '4px'
    return endEvent
}

/**
 * 创建用户任务图
 * */
function createRect(x , y) {
    const userRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    userRect.setAttribute("x", x)
    userRect.setAttribute("y", y)
    userRect.setAttribute("rx", '10')
    userRect.setAttribute("width", '120')
    userRect.setAttribute("height", '80')
    userRect.style.stroke = 'rgba(88, 88, 88, 1)'
    userRect.style.fill = 'transparent'
    userRect.style.borderRadius = '4px'
    return userRect
}



/**
 * 鼠标按下svg节点
 * */
function svgDown(e) {
    isMove = true
    e.preventDefault() // 防止出现拖拽的图标
    svgNode = e.target
}
/**
 * 鼠标在画布上移动
 * */
var designAreaMove = (function () {
    let flag = true
    return function (e) {
        if (svgNode && flag) { // 避免定义不必要的定时器
            flag = false
            setTimeout(function () { // 节流用的
                const currentX = e.clientX - toolBox.offsetWidth
                const currentY = e.clientY - headerNode.offsetHeight
                if (svgNode && isMove) {
                    let nodeInfo = svgNode.getBBox()
                    switch (svgNode.nodeName) {
                        case 'circle':
                            svgNode.setAttribute("cx", currentX)
                            svgNode.setAttribute("cy", currentY)
                            break;
                        case 'rect':
                            svgNode.setAttribute("x", (currentX - nodeInfo.width / 2))
                            svgNode.setAttribute("y", (currentY - nodeInfo.height / 2))
                            break;
                    }
                    const currentNodeId = svgNode.getAttribute("id")
                    const currentSvgNodeInfo = getSvgNodeInfo(svgNode.getBBox(), currentNodeId)
                    svgNodesInfo = svgNodesInfo.filter(item => item.id !== currentNodeId)
                    svgNodesInfo.push(currentSvgNodeInfo)
                } else if (svgNode && isArrowDown) {
                    dottedLine.setAttribute("x2", currentX)
                    dottedLine.setAttribute("y2", currentY)
                    if (!dottedLine.parentNode) {
                        designArea.appendChild(dottedLine)
                    }
                }
                flag = true
            }, 20)
        }
    }
})()
designArea.addEventListener('mousemove', designAreaMove)
/**
 * 监听头部鼠标移进事件
 * */
headerNode.addEventListener('mouseover', function () {
    if (svgNode) { // 防止从头部移除window窗口的监听范围
        svgNode = null
    }
})

/**
 * 流程画布内，svg元素鼠标弹起事件
 * */
function designAreaUp(e) {
    let currentNode = e.target.getBBox()
    toolBar = getToolBar(currentNode)
    center.appendChild(toolBar)
}

/**
 * 创建跟随svg元素移动的单例工具栏
 * */
let getToolBar = (function () {
    let toolBar
    if (!toolBar) {
        toolBar = document.createElement('div')
        let arrow = document.createElement('li')
        let trash = document.createElement('li')
        arrow.setAttribute("class", "iconfont icon-config iconarrow_");
        trash.setAttribute("class", "iconfont icon-config icontrash");
        toolBar.style.width = '100px'
        toolBar.style.height = '30px'
        toolBar.style.position = 'absolute'
        toolBar.appendChild(arrow)
        toolBar.appendChild(trash)
        trash.addEventListener('click', trashFn, false)
        arrow.addEventListener('mousedown', arrowDownFn)
    }
    return function (currentNode) {
        toolBar.style.left = (currentNode.x + currentNode.width) + 'px'
        toolBar.style.top = (currentNode.y - 30) + 'px'
        return toolBar
    }
}())

/**
 * 判断是否在svg元素内弹起
 * */
function isMouseupInSvg(e) {
    let nodeName = e.target.nodeName
    switch (nodeName) {
        case "circle":
        case "rect":
        case "path":
            return true
        default:
            return false
    }
}

/**
 * 判断是否在工具栏的元素内，默认为li
 * */
function isMouseupInLi(e) {
    let nodeName = e.target.nodeName.toLowerCase()
    return nodeName === 'li'
}
