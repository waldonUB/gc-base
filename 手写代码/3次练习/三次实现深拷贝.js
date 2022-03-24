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

const deepClone = function (target, map = new Map()) {
  const objTypes = ['Object', 'Array']
  let cloneTarget
  if (objTypes.includes(getType(target))) {
    cloneTarget = getType(target) === 'Object' ? {} : []
    if (map.has(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    for (const key in target) {
      cloneTarget[key] = objTypes.includes(getType(target[key]))
        ? deepClone(target[key], map)
        : target[key]
    }
  } else {
    cloneTarget = target
  }
  return cloneTarget
}

console.log(deepClone(obj))
