const encodeStr = encodeURI('我是666的')
console.log(`我是编码后的：` + encodeStr)
console.log(`我是解码后的：` + decodeURI(encodeStr))