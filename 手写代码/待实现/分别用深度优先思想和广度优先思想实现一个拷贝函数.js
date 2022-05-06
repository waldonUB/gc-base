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

// todo waldon 层序遍历

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

/**
 * 广度优先拷贝
 * @author waldon
 * @date 2022-04-29
 * @param {*} target - param
 * @param {*} map - param
 */
function bfsDeepClone(target, map = new Map()) {
  if (['Array', 'Object'].includes(getType(target))) {
    const subArr = []
    const isPlanObject = getType(target) === 'Object'
    let cloneTarget = isPlanObject ? {} : []
    if (map.has(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    for (const key in target) {
      if (['Array', 'Object'].includes(getType(target[key]))) {
        subArr.push(target[key])
      } else {
        cloneTarget[key] = target[key]
      }
    }
    return cloneTarget
  } else {
    return target
  }
}
/**
 * // todo waldon 已经理解了思想，待自己实现
 * 广度遍历实现深拷贝
 * @author waldon
 * @date 2022-04-29
 * @param {*} origin - param
 */
function deepCopyBFS(origin) {
  let queue = []
  let map = new Map() // 记录出现过的对象，用于处理环

  let target = getEmpty(origin)
  if (target !== origin) {
    queue.push([origin, target])
    map.set(origin, target)
  }

  while (queue.length) {
    let [ori, tar] = queue.shift()
    for (let key in ori) {
      // 处理环状
      if (map.get(ori[key])) {
        tar[key] = map.get(ori[key])
        continue
      }

      tar[key] = getEmpty(ori[key])
      if (tar[key] !== ori[key]) {
        queue.push([ori[key], tar[key]])
        map.set(ori[key], tar[key])
      }
    }
  }

  return target
}
