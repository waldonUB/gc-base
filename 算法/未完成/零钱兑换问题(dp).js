function getArr(num, combine) {
  const map = new Map()
  function getChildren(_num, _combine, path = []) {
    if (map.has(_num)) {
      return map.get(_num)
    }
    for (const item of _combine) {
      path.push(item)
      if (_num - item === 0) {
        map.set(_num, path)
        return path
      }
      getChildren(_num - item, _combine, [...path])
    }
  }
  getChildren(num, combine)
}
