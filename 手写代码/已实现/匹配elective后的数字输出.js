// > url有三种情况
// >
// > ```js
// > https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33
// > https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800&local_province_id=33
// > https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800,700&local_province_id=33
// > ```
// >
// > 匹配elective后的数字输出（写出你认为的最优解法）:
// >
// > ```js
// > [] || ['800'] || ['800','700']
// > ```

// 解析：[第 105 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/177)

// 正则待完善
function getStr(url) {
  const reg = /\&elective=.\&$/gi
  console.log(url.test(reg))
}

function getStr2(url) {
  const arr = url.split('&')
  for (const item of arr) {
    if (item.includes('elective')) {
      const value = item.split('=')[1]
      if (!value) {
        return []
      }
      return value.split(',')
    }
  }
}

console.log(
  getStr2('https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33'),
)
console.log(
  getStr2(
    'https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800&local_province_id=33',
  ),
)
console.log(
  getStr2(
    'https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800,700&local_province_id=33',
  ),
)
