// var entry = {
//   a: {
//    b: {
//      c: {
//        dd: 'abcdd'
//      }
//    },
//    d: {
//      xx: 'adxx'
//    },
//    e: 'ae'
//   }
//   }
// > // 要求转换成如下对象
// > var output = {
// > 'a.b.c.dd': 'abcdd',
// > 'a.d.xx': 'adxx',
// > 'a.e': 'ae'
// > }
// > ```

// 解析：[第 111 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/206)
var entry = {
  a: {
    b: {
      c: {
        dd: 'abcdd',
      },
    },
    d: {
      xx: 'adxx',
    },
    e: 'ae',
  },
}

function translateEntry(entry) {
  const res = {}
  function getChildren(key, obj) {
    for (const item in obj) {
      if (typeof obj[item] === 'object') {
        getChildren(`${key}.${item}`, obj[item])
      } else {
        const _key = `${key}.${item}`.substring(1)
        res[_key] = obj[item]
      }
    }
  }
  getChildren('', entry)
  return res
}
console.log(translateEntry(entry))
