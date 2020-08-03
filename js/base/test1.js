let a = '[123, 456]'
let aJson = JSON.parse(a)
console.log(aJson[1])
let aJsonText = aJson.map(item => item).join('-')
console.log(`aJsonText`, aJsonText)
