/**
 * 返回svg节点各个方位坐标的点
 * */
function getSvgNodeInfo(currentNodeBBox, nodeInfoId) {
    return {
        id: nodeInfoId,
        top: {
            x: currentNodeBBox.x + currentNodeBBox.width / 2,
            y: currentNodeBBox.y,
        },
        right: {
            x: currentNodeBBox.x + currentNodeBBox.width,
            y: currentNodeBBox.y + currentNodeBBox.height / 2,
        },
        bottom: {
            x: currentNodeBBox.x + currentNodeBBox.width / 2,
            y: currentNodeBBox.y + currentNodeBBox.height,
        },
        left: {
            x: currentNodeBBox.x,
            y: currentNodeBBox.y + currentNodeBBox.height / 2,
        },
        center: {
            x: currentNodeBBox.x + currentNodeBBox.width / 2,
            y: currentNodeBBox.y + currentNodeBBox.height / 2,
        },
        lines: [{
            direction: '',
            lineId: ''
        }]
    }
}

/*-------------------------- svg节点工具栏的操作 --------------------------*/
/**
 * 工具栏的trash事件,从画布上移除当前svg节点，并删除引用
 * */
function trashFn(e) {
    if (svgNode && svgNode.parentNode) {
        svgNode.parentNode.removeChild(svgNode)
        svgNode = null
    }
    let currentToolBar = e.target.parentNode
    let currentArea = e.target.parentNode.parentNode
    if (currentToolBar && currentArea) {
        currentArea.removeChild(currentToolBar)
    }
}
/**
 * 工具栏arrow按下的触发事件
 * */
function arrowDownFn() {
    let currentNode = svgNode.getBBox()
    let nodeInfoId = svgNode.getAttribute("id")
    startNodeInfo = svgNodesInfo.find(item => item.id === nodeInfoId)
    isArrowDown = true
    if (!dottedLine) {
        dottedLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        dottedLine.setAttribute("stroke", "#000")
        dottedLine.setAttribute("stroke-dasharray", "1 2")
    }
    let nodeCenterX = currentNode.x + (currentNode.width / 2)
    let nodeCenterY = currentNode.y + (currentNode.height / 2)
    dottedLine.setAttribute("x1", nodeCenterX.toString())
    dottedLine.setAttribute("y1", nodeCenterY.toString())
}
