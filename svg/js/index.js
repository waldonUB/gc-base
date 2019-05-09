var nodes = document.getElementsByClassName("b-node")
var ToolContainer = document.getElementById("ToolContainer")
var toolBox = document.getElementById("toolBox")
var designArea = document.getElementById("designArea")
var selectNode
var timer
var isInDesignArea = false
for (let node of nodes) {
    node.addEventListener('mousedown', function (e) {
        e.preventDefault() // 阻止默认事件
        ToolContainer.setAttribute('data-content', 'show') // 显示遮罩，计算鼠标坐标
        selectNode = node.cloneNode(true)
        selectNode.style.position = 'absolute'
        // selectNode.style.opacity = 0.8
        selectNode.style.listStyle = 'none'
        selectNode.style.cursor = 'pointer'
        selectNode.style.display = 'none'
        selectNode.style.border = '2px solid rgba(131, 208, 242, 1)'
        selectNode.style.backgroundColor = 'rgba(131, 208, 242, 0.2)'
        selectNode.style.borderRadius = '4px'
        selectNode.style.padding = '4px 8px'
        ToolContainer.appendChild(selectNode)
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
//     toolBox.setAttribute('data-content', 'show') // 显示遮罩，计算鼠标坐标
//     e.preventDefault() // 阻止默认事件
//     initSelectNode()
// })
/**
 * @param e 为回调函数中的当前元素，移到哪里就是哪个元素
 * */
designArea.addEventListener('mouseover', function (e) {
    console.log(`我经过designArea`)
    isInDesignArea = true
})
ToolContainer.addEventListener('mousemove', function (e) {
    e.preventDefault() // 阻止默认事件
    clearTimeout(timer)
    timer = setTimeout(function () {
        if (selectNode) {
            selectNode.style.left = e.offsetX + 'px'
            selectNode.style.top = e.offsetY + 'px'
            selectNode.style.display = 'block'
        }
    }, 10)
})

// 全局事件要注意了
window.addEventListener('mouseup', function () {
    setTimeout(function () {
        if (selectNode) { // 防止js队列没执行完
            ToolContainer.removeChild(selectNode)
            selectNode = null
            ToolContainer.setAttribute('data-content', '') // 关闭遮罩
        }
    }, 15)
})

