let obj = {
  a: 1
}
let arr = [1]

Object.freeze(obj)
Object.freeze(arr)
obj.a = 2
arr[0] = 2
console.log(`obj`, obj)
console.log(`arr`, arr)
