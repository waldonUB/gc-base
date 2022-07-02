// 答案：https://mp.weixin.qq.com/s/6xEaoDZt2MN5s6RI3Bb6lg
/*
1. 先初始化一个数组，用来存taskList对应任务的下标
2. 超过最大运行任务数就直接return
3. 在promise回调中再进行递归


*/
function promiseTask(taskList, maxNum) {
  return new Promise((resolve, reject) => {
    let runCount = 0
    const resArr = new Array(3).fill(Symbol())
    const newTaskList = taskList.map((item, index) => {
      return [item, index]
    })

    function handler() {
      if (runCount >= maxNum) {
        return
      }
      runCount++
      if (!newTaskList.length) {
        return
      }
      const [task, index] = newTaskList.shift()
      task().then((res) => {
        runCount--
        resArr[index] = res
        if (!resArr.some((item) => typeof item === 'symbol')) {
          resolve(resArr)
        } else {
          handler()
        }
      })
      handler()
    }
    handler()
  })
}

const promiseFn1 = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 3000)
  })
}

const promiseFn2 = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2)
    }, 3000)
  })
}

const promiseFn3 = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(3)
    }, 1000)
  })
}
console.time()
promiseTask([promiseFn1, promiseFn2, promiseFn3], 2).then((res) => {
  console.log(JSON.stringify(res))
  console.timeEnd()
})

// console.time()
// Promise.all([promiseFn1(), promiseFn2(), promiseFn3()]).then((res) => {
//   console.log(JSON.stringify(res))
//   console.timeEnd()
// })
