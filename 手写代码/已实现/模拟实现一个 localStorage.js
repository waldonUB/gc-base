// 公司：阿里

// 解析：[第 103 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/166)

/*
- api
  - setItem
  - getItem
  - removeItem
  - clear
- 特性
  - 持久化
    - cookie
    - indexDb
  - 容量限制
  - 挂载在window
*/
// 容量限制可以在setItem的时候去计算。因为保存的是字符串，就可以在setItem的时候去计算当前存储字符串的大小。1024
// 然后用一个累积的字段去存储，避免每次添加或删除的时候都要拿全部的字符串来计算
