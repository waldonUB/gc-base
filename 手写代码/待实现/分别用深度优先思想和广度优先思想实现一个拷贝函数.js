// 解析：[第 6 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/10)

function getType(target) {
  return Object.prototype.toString.call(target).slice(0, 8)
}

// todo waldon 层序遍历

function deepClone(target, map = new Map()) {
  if (['Array', 'Object'].includes(getType(target))) {
    let cloneTarget = getType(target) === 'Array' ? [] : {}
    for (const item in target) {
      // cloneTarget =
    }
  } else {
    return target
  }
}
