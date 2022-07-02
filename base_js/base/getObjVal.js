const getObjVal = (rootObj, path, defaultVal) => {
  if (typeof rootObj !== 'object' || rootObj === null || !path) {
    console.warn('根对象或路径为空')
    return defaultVal
  }
  try {
    const keys = path.split('.')
    const length = keys.length
    let object = { ...rootObj }
    let index = 0
    while (typeof object === 'object' && object !== null && index < length) {
      object = object[keys[index++]]
    }
    return index && index === length && typeof object !== 'undefined' ? object : defaultVal
  } catch (e) {
    console.warn('获取对象值异常：', e)
    return defaultVal
  }
}
const obj = {
  a: {
    b: {
      c: 0
    }
  }
}
// console.log(`getObjVal：`, getObjVal(obj, 'a.b.d', 5))
// console.log(`getObjVal：`, getObjVal(obj, 'a.c.b', 5))
// console.log(`getObjVal：`, getObjVal(obj, 'a.c', 5))
// console.log(`getObjVal：`, getObjVal(obj, 'a', 5)) // 正确
// console.log(`getObjVal：`, getObjVal(obj, 'b', 5))
// console.log(`getObjVal：`, getObjVal(obj, '', 5))
// console.log(`getObjVal：`, getObjVal(null, 'c', 5))
console.log(`getObjVal：`, getObjVal(undefined, 'c'))
