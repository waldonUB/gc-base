var nodes = document.getElementsByClassName("b-node")
var headerNode = document.getElementById("headerNode")
var toolBox = document.getElementById("toolBox")
var designArea = document.getElementById("designArea")
var selectNode
var timer
var isInDesignArea = false
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
designArea.addEventListener('mouseover', function (e) {
    isInDesignArea = true
})
designArea.addEventListener('mouseout', function (e) {
    isInDesignArea = false
})
/**
 * @param e 为回调函数中的当前元素，移到哪里就是哪个元素
 * */
document.body.addEventListener('mousemove', function (e) {
    clearTimeout(timer)
    timer = setTimeout(function () {
        if (selectNode) {
            selectNode.style.left = e.clientX + 'px'
            selectNode.style.top = e.clientY + 'px'
        }
    }, 10)
})
document.body.addEventListener('mouseup', function (e) {
    setTimeout(function () {
        if (selectNode) { // 防止js队列没执行完
            document.body.removeChild(selectNode)
            if (isInDesignArea) {
                var id = selectNode.id
                var x = e.clientX - toolBox.offsetWidth
                var y = e.clientY - headerNode.offsetHeight
                var node = processNodeFactory(id, x, y)
                designArea.appendChild(node)
            }
            selectNode = null
            document.body.style.overflow = 'auto'
        }
    }, 15)
})

/**
 * 根据传入的流程id和坐标创建对应svg实例
 * */
function processNodeFactory(id, x, y) {
    switch (id) {
        case 'startEvent':
            return createStartEvent(x, y)
        case 'endEvent':
            return createEndEvent(x, y)
        case 'userTask':
            return createRect(x, y)
    }
}

/**
 * 创建开始节点
 * */
function createStartEvent(x , y) {
    var startEvent = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    debugger
    startEvent.setAttribute("cx", x)
    startEvent.setAttribute("cy", y)
    startEvent.setAttribute("r", '20')
    startEvent.style.stroke = 'rgba(88, 88, 88, 1)'
    startEvent.style.fill = 'none'
    // startEvent.style.pointerEvents = 'pointer'
    return startEvent
}

/**
 * 创建结束节点
 * */
function createEndEvent(x , y) {
    var endEvent = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    endEvent.setAttribute("cx", x)
    endEvent.setAttribute("cy", y)
    endEvent.setAttribute("r", '20')
    endEvent.style.stroke = 'rgba(88, 88, 88, 1)'
    endEvent.style.fill = 'none'
    endEvent.style.strokeWidth = '4px'
    return endEvent
}

/**
 * 创建用户任务图
 * */
var createRect = function (x , y) {
    var userRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    userRect.setAttribute("x", x)
    userRect.setAttribute("y", y)
    userRect.setAttribute("rx", '10')
    userRect.setAttribute("width", '120')
    userRect.setAttribute("height", '80')
    userRect.style.stroke = 'rgba(88, 88, 88, 1)'
    userRect.style.fill = 'none'
    userRect.style.borderRadius = '4px'
    return userRect
}
