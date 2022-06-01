// > 用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。如：输入整型 1234，返回字符串“4321”。要求必须使用递归函数调用，不能用全局变量，输入函数必须只有一个参数传入，必须返回字符串。

// 公司：bilibili

// 解析：[第 99 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/153)

function convert2Str(num: number): string {
  let str: string = num.toString()
  return str.length > 1
    ? convert2Str(Number(str.substring(0, str.length - 1))) + str.substring(str.length - 1)
    : str
}
