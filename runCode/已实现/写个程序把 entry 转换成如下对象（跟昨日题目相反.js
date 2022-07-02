// > ```js
// > var entry = {
// > 'a.b.c.dd': 'abcdd',
// > 'a.d.xx': 'adxx',
// > 'a.e': 'ae'
// > }
// >
// > // 要求转换成如下对象
// > var output = {
// > a: {
// > b: {
// >   c: {
// >     dd: 'abcdd'
// >   }
// > },
// > d: {
// >   xx: 'adxx'
// > },
// > e: 'ae'
// > }
// > }
// > ```

/*
- 存一个key数组
- 存key最后一个值为value
- index上一个去找对应hash中的key
- index最后一个存值


*/
// 解析：[第 112 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/212)
// ### 思路
// - 以"."将key分割成数组
// - 声明变量temp，利用js对象指向同一个引用地址的特性，把上一次的结果带进下一次循环中
// - length - 1为得到value的终止条件

var entry = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae',
}
/**
 * 转换
 * @author waldon
 * @date 2022-04-11
 * @param {*} entry - param
 */
function translateEntry(entry) {
  const res = {}
  for (const key of Object.keys(entry)) {
    const keyArr = key.split('.')
    const value = entry[key]
    let temp = res
    for (let i = 0, len = keyArr.length; i < len; i++) {
      const subKey = keyArr[i]
      if (i === keyArr.length - 1) {
        temp[subKey] = value
      } else {
        temp[subKey] = temp[subKey] || {}
        temp = temp[subKey]
      }
    }
  }
  return res
}

console.log(translateEntry(entry))
