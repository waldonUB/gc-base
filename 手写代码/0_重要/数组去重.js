// 基本类型的数组去重
const arr1 = [1, 5, 1, 2, 3, 8, 9, 8, 4]

console.log(`简单去重：${[...new Set(arr1)]}`)

// 哈希表去重

const calArrByHash = function (arr) {
  const map = new Map()
  const res = []
  for (let i = 0, len = arr.length; i < len; i++) {
    if (map.has(arr[i])) {
      continue
    }
    map.set(arr[i], i)
    res.push(arr[i])
  }
  return res
}

console.log(`哈希去重：${calArrByHash(arr1)}`)

// 对象类型的去重

const arr2 = [
  {
    id: 1,
    name: '',
  },
  {
    id: 3,
    name: '',
  },
  {
    id: 1,
    name: '',
  },
  {
    id: 5,
    name: '',
  },
  {
    id: 8,
    name: '',
  },
  {
    id: 3,
    name: '',
  },
  {
    id: 7,
    name: '',
  },
]

const calArr2 = arr2.reduce((pre, cur) => {
  const findOne = pre.find((item) => item.id === cur.id)
  if (!findOne) {
    pre.push(cur)
  }
  return pre
}, [])

console.log(`对象去重：${JSON.stringify(calArr2)}`)
