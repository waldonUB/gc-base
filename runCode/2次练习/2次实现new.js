const myNew = function (Fn, ...args) {
  let obj = Object.create(Fn.prototype)
  let res = Fn.apply(obj, args)
  const isObject = typeof res === 'object' && res !== null
  const isFn = typeof res === 'function'
  if (isObject || isFn) {
    return res
  }
  return obj
}
