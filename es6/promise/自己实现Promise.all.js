/**
 * 主要核心思想是把所有的promise放进一个数组内遍历
 * 然后把结果push进all.then的数组中
 * 等到所有结果执行完成的时候，数组长度就一致
 * 再按照原本promise入参的数据放置
 * 再resolve出来
 * @author waldon
 * @date 2021-09-27
 */
Promise.myAll = function (arr = []) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(arr)) {
      reject('传入的应为数组')
      throw new Error('传入的应为数组')
    }
    const resList = []
    arr.forEach((item, index) => {
      item.then((res) => {
        resList.push({
          index,
          res
        })
        if (resList.length && resList.length === arr.length) {
          const resolveList = resList
            .reduce((pre, cur) => {
              if (!pre.length) {
                return [cur]
              }
              const curIndex = pre.findIndex((item) => item.index < cur.index)
              if (curIndex >= 0) {
                pre[curIndex] = cur
              } else {
                pre.unshift(cur)
              }
              return pre
            }, [])
            .map((item) => item.res)
          console.log(`resList`, resList)
          console.log(`resolveList`, resolveList)
          resolve(resolveList)
        }
      })
    })
  })
}
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(`promise1`)
    resolve(`promise1`)
  }, 800)
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(`promise2`)
    resolve(`promise2`)
  }, 500)
})
Promise.myAll([promise1, promise2]).then((res) => {
  console.log(`res`, res)
})
