// ### 第 114 题：编程题，找出字符串中连续出现最多的字符和个数（蘑菇街）

// > ```js
// > 'abcaakjbb' => {'a':2,'b':2}
// > 'abbkejsbcccwqaa' => {'c':3}
// > ```

// 解析：[第 114 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/220)

const getStrNum = function (str) {
  let resObj = {}
  let curMap = {}
  const strList = str.split('')
  for (const item of strList) {
    if (curMap[item]) {
      let num = curMap[item]
      curMap[item] = ++num
    } else {
      curMap = {}
      curMap[item] = 1
    }
    const keys = Object.keys(resObj)
    if (!keys.length || resObj[keys[0]] === curMap[item]) {
      resObj[item] = curMap[item]
    } else if (resObj[keys[0]] < curMap[item]) {
      resObj = {}
      resObj[item] = curMap[item]
    }
  }
  return resObj
}
console.log(getStrNum('abcaakjbb'))
console.log(getStrNum('abbkejsbcccwqaa'))
