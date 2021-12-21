// wladon：自己实现的版本
const arr = [5, 1, 3, 2, 6, 8, 7]
const insertSort = (arr) => {
  const _arr = [...arr]
  for (let i = 1; i < _arr.length - 1; i++) {
    let j = i - 1
    let temp
    if (_arr[i] < _arr[j]) {
      temp = _arr[i]
      _arr[i] = _arr[j]
      _arr[j] = temp
    }
    for (let k = 0; k <= i; k++) {
      if (_arr[i + 1] < _arr[k]) {
        _arr.splice(k, 0, _arr[i + 1])
        _arr.splice(i + 2, 1)
      }
    }
    console.log(`第${i}趟排序：`, _arr)
  }
  return _arr
}
console.log(`insertSort`, insertSort(arr))
