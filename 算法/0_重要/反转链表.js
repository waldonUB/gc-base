// 自己的实现而已，不是这种做法
const list = [1, 2, 3, 4, 5]

const getHead = (list) => {
  const j = list.length
  let middle = 0
  let k = 0
  if (j % 2 !== 0) {
    middle = Math.floor(j / 2) + 1
  } else {
    middle = j / 2 - 1
    k = 1
  }
  console.log(`middle`, middle)
  for (let i = 0; i < middle + k; i++) {
    let t = list[middle - i]
    list[middle - i] = list[i + middle + k]
    list[i + middle + k] = t
  }
  console.log(list)
}
getHead(list)

// 二分查找？
