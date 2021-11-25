// import testImg from '../assets/测试图片.png'
// import testJpg from '../assets/测试图片.jpg'
// export async function getRouterName() {
//   console.log(`getRouterName执行`)
//   const a = await Promise.resolve(1)
//   const imgNode = document.createElement('img')
//   imgNode.src = testJpg
//   document.body.appendChild(imgNode)
//   return a
// }
// getRouterName()
// import 'core-js/stable'
// import 'regenerator-runtime/runtime'
import { foo } from './test_module_1/main'
import { promiseFn, flatFn, mapFn, ClassTest, asyncFn } from './test_module_2/main'
;(function () {
  console.log(foo())
  // console.log(promiseFn())
  console.log(mapFn())
  console.log(`class 输出`, ClassTest.num)
  console.log(`异步`, asyncFn())
  console.log(flatFn())
  console.log(`是否包含`, [1].includes(1))
})()
