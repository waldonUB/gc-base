let arr = [
  {
    index: 2
  },
  {
    index: 5
  },
  {
    index: 1
  },
  {
    index: 4
  }
]

arr = arr.sort((prev, curr) => {
  return prev.index - curr.index
})
console.log(arr)
