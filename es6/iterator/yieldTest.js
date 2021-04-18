var obj = {
  name: 'wdq',
  age: 12
}

function* yieldTest(obj) {
  for (let item in obj) {
    if (obj.hasOwnProperty(item)) {
      yield { item: obj[item] }
    }
  }
}

var iterator = yieldTest(obj)

for (let item of iterator) {
  console.log(item)
}
