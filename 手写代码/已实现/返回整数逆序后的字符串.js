// > 用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。如：输入整型 1234，返回字符串“4321”。要求必须使用递归函数调用，不能用全局变量，输入函数必须只有一个参数传入，必须返回字符串。

// 公司：bilibili

// 解析：[第 99 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/153)

/**
 * 这个解法更简洁
 * 切割对应的字符串相加
 * @author waldon
 * @date 2022-05-30
 */
// function convert2Str(num: number): string {
//   let str: string = num.toString()
//   return str.length > 1
//     ? convert2Str(Number(str.substring(0, str.length - 1))) + str.substring(str.length - 1)
//     : str
// }

function revert(num) {
  // 伪代码：判断是否数字

  let num1 = num / 10
  let num2 = num % 10
  if (num1 < 1) {
    return Math.floor(num)
  } else {
    return `${num2}${revert(Math.floor(num1))}`
  }
}

console.log(revert(5123))
