// 解析：[第 6 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/10)

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
  d: '',
  e: new Set(),
  f: new Map(),
}
function getType(target) {
  return Object.prototype.toString.call(target).slice(0, 8)
}

function getType(target) {
  return Object.prototype.toString.call(target).slice(8, -1)
}

function deepClone(target, map = new Map()) {
  if (['Array', 'Object'].includes(getType(target))) {
    const isPlanObject = getType(target) === 'Object'
    let cloneTarget = isPlanObject ? {} : []
    if (map.has(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    for (const key in target) {
      cloneTarget[key] = ['Array', 'Object'].includes(getType(target[key]))
        ? target[key]
        : deepClone(target[key], map)
    }
    return cloneTarget
  } else {
    return target
  }
}

const getType = function (target) {
  return Object.prototype.toString.call(target).slice(8, -1)
}

const getCloneObj = function (target) {
  const type = getType(target)
  switch (type) {
    case 'Object':
      return {}
    case 'Array':
      return []
    default:
      return target
  }
}

const isNeedClone = function (target) {
  return ['Array', 'Object'].includes(getType(target))
}

/**
 * 广度遍历深拷贝(自己实现的最简单的版本)
 * @author waldon
 * @date 2022-05-11
 * @param {*} target - param
 */
const bfsDeepClone = function (target) {
  const cloneTarget = getCloneObj(target)
  const map = new Map()
  if (isNeedClone(target)) {
    const queue = [[target, cloneTarget]]
    while (queue.length) {
      const [tar, clone] = queue.shift()
      for (const item in tar) {
        if (map.has(tar[item])) {
          clone[item] = map.get(tar[item])
          continue
        }
        clone[item] = getCloneObj(tar[item])
        if (isNeedClone(tar[item])) {
          queue.push([tar[item], clone[item]])
        }
        map.set(tar[item], clone[item])
      }
    }
  }
  return cloneTarget
}

console.log(bfsDeepClone(obj))
