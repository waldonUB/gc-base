const validStr = function (str) {
  if (!str) {
    return
  }
  const charArr = str.split('')
  let flag = true
  for (let i = 0, j = charArr.length - 1; i < charArr.length / 2; i++, j--) {
    console.log(`i: ${charArr[i]}, j: ${charArr[j]}`)
    if (charArr[i] !== charArr[j]) {
      flag = false
      break
    }
  }
  return flag
}

console.log(validStr('level'))
console.log(validStr('level1'))
