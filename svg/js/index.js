var nodes = document.getElementsByClassName("b-node")
var toolBox = document.getElementById("toolBox")
var designArea = document.getElementById("designArea")
var selectNode
var timer
for (let node of nodes) {
    node.addEventListener('mousedown', function (e) {
        e.preventDefault() // 阻止默认事件
        selectNode = node.cloneNode(true)
        selectNode.style.position = 'absolute'
        selectNode.style.opacity = 0.5
        selectNode.style.listStyle = 'none'
        selectNode.style.cursor = 'pointer'
        selectNode.style.left = e.offsetX + 'px'
        selectNode.style.top = e.offsetY + 'px'
        toolBox.appendChild(selectNode)
    })
}
/**
 * @param e 为回调函数中的当前元素，移到哪里就是哪个元素
 * */
toolBox.addEventListener('mousemove', function (e) {
    e.preventDefault() // 阻止默认事件
    if (selectNode) {
        selectNode.style.left = e.offsetX + 'px'
        selectNode.style.top = e.offsetY + 'px'
        console.log(e)
    }
    console.log(e.offsetX + ' ' +  e.offsetY)
    clearTimeout(timer)
    timer = setTimeout(function () {

    }, 15)
}, true)
designArea.addEventListener('mousemove', function (e) {
    console.log(e.offsetX + ' ' +  e.offsetY)
    // clearTimeout(timer)
    // timer = setTimeout(function () {
    //     if (selectNode) {
    //         selectNode.style.left = e.clientX + 'px'
    //         selectNode.style.top = e.clientY + 'px'
    //         // designArea.appendChild(selectNode)
    //     }
    // }, 15)
})
// 全局事件要注意了
window.addEventListener('mouseup', function () {
    setTimeout(function () {
        if (selectNode) { // 防止js队列没执行完
            toolBox.removeChild(selectNode)
            selectNode = null
        }
    }, 15)
})
