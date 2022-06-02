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

function add() {
  const args = [...arguments]
  const fn = function () {
    let fn_args = [...arguments]
    return add.apply(null, [...args, ...fn_args])
  }
  fn.toString = function () {
    let res = 0
    for (const item of args) {
      res += item
    }
    return res
  }
  return fn
}
console.log(add(1)(2, 5))

/*
1. 因为会缓存参数，所以是把上一个function的参数缓存起来
2. fn会作为一个闭包，执行add，把汇总的参数再次合并起来再返回

*/
