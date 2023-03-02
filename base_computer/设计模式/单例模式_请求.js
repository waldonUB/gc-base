/**
 * 初始化函数
 * @author xxx
 * @date 20xx-xx-xx
 */
const getInitData = (() => {
  let instance = null
  return async () => {
    if (!instance) {
      instance = await getInitData_api()
    }
    return instance
  }
})()
/**
 * 模拟请求数据
 * @author xxx
 * @date 20xx-xx-xx
 */
const getInitData_api = () => {
  return new Promise((resolve, reject) => {
    resolve({ a: 123 })
  })
}
let res1
let res2
let res3
getInitData().then((res) => {
  res1 = res
  getInitData().then((res) => {
    res2 = res
  })
})
getInitData().then((res) => {
  res3 = res
})

setTimeout(() => {
  console.log(res1) // { a: 123 }
  console.log(res2) // { a: 123 }
  console.log(res1 === res3) // false
  console.log(res2 === res3) // true
}, 0)
