const foo = function (...args) {
  let sum = 0
  if (args.length >= 2) {
    for (const _item of args) {
      if (!Number.isNaN(_item)) {
        sum += Number(_item)
      }
    }
    return sum
  }
  return function (x) {
    return x + args[0]
  }
}
console.log(foo(5)(5))
console.log(foo(5, 5, 6))
