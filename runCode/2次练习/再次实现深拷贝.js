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

const deepClone = function (target) {
  let cloneTarget
  const hasChildObjArr = ['Array', 'Object']
  if (hasChildObjArr.includes(getType(target))) {
    cloneTarget = Array.isArray(target) ? [] : {}
    for (const item in target) {
      cloneTarget[item] = hasChildObjArr.includes(getType(target[item]))
        ? deepClone(target[item])
        : target[item]
    }
  } else {
    cloneTarget = target
  }
  return cloneTarget
}

const cloneObj = deepClone(obj)
cloneObj.a.a1.a2.a3 = 'b'

console.log('cloneObj', cloneObj)
console.log('obj', obj)
