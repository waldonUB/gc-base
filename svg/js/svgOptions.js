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
        }
    }
}
