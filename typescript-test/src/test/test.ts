function getConvertStr(str: string) {
  let res: string = ''
  for (const item of str) {
    const _chart: string =
      item === item.toLocaleLowerCase() ? item.toLocaleUpperCase() : item.toLocaleLowerCase()
    res += _chart
  }
  return res
}
console.log(`getConvertStr('AbcD')`, getConvertStr('AbcD'))
