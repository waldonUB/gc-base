export const bar = function () {
  return 'test_module_2的bar'
}
/**
 * 测试Promise api
 * @author waldon
 * @date 2021-11-26
 */
export const promiseFn = function () {
  return Promise.resolve('1')
}

/**
 * 测试Map api
 * @author waldon
 * @date 2021-11-26
 */
export const mapFn = function () {
  const map = new Map()
  map.set('1', 2)
  return map
}

/**
 * 测试core-js3中支持的flat
 * @author waldon
 * @date 2021-11-26
 */
export const flatFn = function () {
  return [[1], 2].flat()
}

/**
 * 测试Class
 * @author waldon
 * @date 2021-11-26
 */
export class ClassTest {
  static num = 1
}

/**
 * 测试async await
 * @author waldon
 * @date 2021-11-26
 */
export const asyncFn = async function () {
  const foo = await Promise.resolve('async')
  return foo
}
