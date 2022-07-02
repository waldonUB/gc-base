function convertStr(str) {
  let resStr = ''
  for (let i = 0, len = str.length; i < len; i++) {
    let _char = str[i]
    if (_char.toLocaleUpperCase() === _char) {
      if (i === 0) {
        resStr += _char.toLocaleLowerCase()
      } else {
        resStr += `_${_char.toLocaleLowerCase()}`
      }
    } else {
      resStr += _char
    }
  }
  return resStr
}
console.log(convertStr('AbC'))
