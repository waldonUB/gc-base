/**
 * 去重
 * */
function test2() {
  let arr = [1, 2, 5, 5, 6, 8, 6, 9, 2]
  let set = new Set(arr)
  return Array.from(set)
}
