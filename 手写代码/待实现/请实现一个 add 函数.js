// ### 第 84 题：请实现一个 add 函数，满足以下功能。
// > ```js
// > add(1); 			// 1
// > add(1)(2);  	// 3
// > add(1)(2)(3)；// 6
// > add(1)(2, 3); // 6
// > add(1, 2)(3); // 6
// > add(1, 2, 3); // 6
// > ```
// 解析：[第 84 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/134)

// todo waldon 这里重写toString函数做啥？
// console.log默认输出toString的

function add(a) {
  function sum(b) {
    a = a + b
    return sum
  }
  sum.toString = function () {
    return a
  }
  return sum
}
console.log(Number(add(1)(2)(3)))
