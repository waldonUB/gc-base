const obj = {
  a: {
    a1: {
      a2: {
        a3: 'a',
      },
    },
  },
  b: [1, 3, { b1: [{ b2: 'b' }] }],
  c: function () {
    console.log('c')
  },
}

const getType = function (target) {
  return Object.prototype.toString.call(target).slice(8, -1)
}

/**
 * 深拷贝实现
 * @author waldon
 * @date 2022-02-13
 * @param {*} target - param
 */
const deepClone = function (target = {}, map = new Map()) {
  const type = getType(target)
  if (type === 'Object' || type === 'Array') {
    const newTarget = type === 'Object' ? {} : []
    if (map.has(target)) {
      return newTarget
    }
    map.set(target, newTarget)
    for (const item in target) {
      const subType = getType(item)
      newTarget[item] =
        subType === 'Object' || subType === 'Array' ? deepClone(target[item]) : target[item]
      return newTarget
    }
  } else if (type === 'Map') {
  } else {
    return target
  }
}

obj.d = obj
// todo waldon 结果不对

console.log(deepClone(obj))
