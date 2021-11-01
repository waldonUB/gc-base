// 写一个函数，满足以下的情况
// var fn=function(a,b,c){
//     return a+b+c;
// }

var obj = {
  a: 1
}

var foo = function (...args) {
  let m = 0
  console.log(`arguments`, arguments)
  for (let item of args) {
    m += item
  }
  return m
}

console.log(foo.call(obj, 1, 2, 3, 4))
