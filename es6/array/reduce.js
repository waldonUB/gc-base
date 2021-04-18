/**
 * 找最大值
 * */
function test() {
  let arr = [
    [4, 5, 1, 3],
    [13, 27, 50, 26],
    [32, 35, 37, 39]
  ]
  let max = arr.reduce((prev, curr) => {
    let max = curr.reduce((subPrev, subCurr) => {
      return subCurr > subPrev ? subCurr : subPrev
    }, 0)
    return max > prev ? max : prev
  }, 0)
  console.log(max)
}
test()

/**
 * 去重
 * */
function test1() {
  let arr = [1, 2, 5, 5, 6, 8, 6, 9, 2]
  return arr.reduce((prev, curr) => {
    if (!prev.includes(curr)) {
      prev.push(curr)
    }
    return prev
  }, [])
}
