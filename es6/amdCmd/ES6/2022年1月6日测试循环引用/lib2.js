import { foo } from './lib1.js'
export const bar = function () {
  console.log('执行bar')
  foo()
}
