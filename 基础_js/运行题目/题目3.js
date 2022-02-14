function a() {
  let arr = [1, 2, 3]
  return arr
}

let b = a()
b.push(4, 5)
let c = a()
console.log(b, c)
