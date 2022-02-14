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
  const deepType = ['Object', 'Array', 'Map', 'Set']
  if (deepType.includes(type)) {
    if (['Object', 'Array'].includes(type)) {
      const newTarget = type === 'Object' ? {} : []
      if (map.has(target)) {
        return map.get(target)
      }
      map.set(target, newTarget)
      for (const item in target) {
        const subType = getType(target[item])
        newTarget[item] = deepType.includes(subType) ? deepClone(target[item], map) : target[item]
      }
      return newTarget
    } else if (['Map', 'Set'].includes(type)) {
      const newTarget = type === 'Map' ? new Map() : new Set()
      for (const item of target) {
        const subType = getType(target[item])
        if (deepType.includes(subType)) {
          if (type === 'Map') {
            newTarget.set(item, deepClone(target[item], map))
          } else {
            newTarget.add(deepClone(target[item]))
          }
        } else {
          if (type === 'Map') {
            newTarget.set(item, target[item])
          } else {
            newTarget.add(target[item])
          }
        }
      }
      return newTarget
    }
  } else {
    return target
  }
}

obj.d = obj
obj.f.set('f1', { f2: { f3: 'f' } })

console.log(deepClone(obj))
