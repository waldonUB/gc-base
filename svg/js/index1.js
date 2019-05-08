var timer = null
var liElement = document.getElementById("startEvent")
var center = document.getElementsByClassName("center")[0]
var liCopy1 = liElement.cloneNode(true)
liCopy1.style.position = 'absolute'
center.appendChild(liCopy1)
console.log(liElement)
// moveFn
var moveEle = function(target, e) {
    target.style.left = e.clientX + 'px'
    target.style.top = e.clientY + 'px'
    target.style.opacity = 0.5
}
var onMouseMove = function (e) {
    clearTimeout(timer)
    timer = setTimeout(moveEle, 15)
}
var onMouseDown = function(e) {
    var liCopy2 = liElement.cloneNode(true)
}
center.addEventListener('mousemove', onMouseMove)
