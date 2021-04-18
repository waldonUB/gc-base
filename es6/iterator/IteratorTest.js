function MyIterator(arr) {
  let index = 0
  return {
    next() {
      if (index < arr.length) {
        return {
          value: arr[index++],
          done: false
        }
      } else {
        return {
          value: undefined,
          done: true
        }
      }
    }
  }
}
