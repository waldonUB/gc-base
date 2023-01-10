/**
 * 该案例演示当label太长时候，指定多少个字符后显示省略号。
 * 有两种方式进行处理：
 * 1、从数据中处理，处理完以后再进行渲染；
 * 2、自定义节点或边时，进行处理：
 *  group.addShape('text', {
 *     attrs: {
 *       text: fittingString(cfg.label, 50, 12),
 *       ...
 *     }
 *  })
 *
 */

/**
 * 计算字符串的长度
 * @param {string} str 指定的字符串
 */
var calcStrLen = function calcStrLen(str) {
  var len = 0
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
      len++
    } else {
      len += 2
    }
  }
  return len
}

/**
 * 计算显示的字符串
 * @param {string} str 要裁剪的字符串
 * @param {number} maxWidth 最大宽度
 * @param {number} fontSize 字体大小
 */
var fittingString = function fittingString(str, maxWidth, fontSize) {
  var fontWidth = fontSize * 1.3 //字号+边距
  maxWidth = maxWidth * 2 // 需要根据自己项目调整
  var width = calcStrLen(str) * fontWidth
  var ellipsis = '…'
  if (width > maxWidth) {
    var actualLen = Math.floor((maxWidth - 10) / fontWidth)
    var result = str.substring(0, actualLen) + ellipsis
    return result
  }
  return str
}
