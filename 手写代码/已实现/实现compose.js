/*
1. compose是从右到做执行（pipe是从左到右）
2. 第一次执行的入参是多个函数，返回值也是函数
3. 用返回的函数再次执行，得到对应的结果
4. 可以用迭代的方式，下一个函数的第一个入参就是上一个函数逇执行结果


也可以用ES6的reduceRight的方式

*/

/**
 * 和网上的实现有点不太一样，但是能满足核心功能
 * @author waldon
 * @date 2022-06-06
 */
const compose = function () {
  const fns = [...arguments]
  return function (a, ...args) {
    let lastRes = a
    while (fns.length) {
      const fn = fns.pop()
      if (typeof fn !== 'function') {
        // 校验
        throw new Error('必须为函数')
      }
      lastRes = fn(lastRes, ...args)
    }
    return lastRes
  }
}

const add = function (a, b) {
  return a + b
}

const multiple = function (a, b) {
  return a * b
}
const fn = compose(add, multiple)
console.log(fn(2, 5))
