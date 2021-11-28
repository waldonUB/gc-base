const option = {}

const { foo = '' } = option

const params = {
  foo,
}

console.log(`params`, params)

// todo waldon 解构部分属性
const fooObj = {
  a: 1,
  b: 2,
  c: 3,
}
const { barObj: a } = fooObj
console.log(barObj)
