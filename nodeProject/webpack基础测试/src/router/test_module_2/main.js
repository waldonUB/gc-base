export const bar = function () {
  return 'test_module_2的bar'
}
export const promiseFn = function () {
  return Promise.resolve('1')
}

export const mapFn = function () {
  const map = new Map()
  map.set('1', 2)
  return map
}

export const flatFn = function () {
  return [[1], 2].flat()
}

export class ClassTest {
  static num = 1
}

export const asyncFn = async function () {
  const foo = await Promise.resolve('async')
  return foo
}
