// > ```js
// > const value = '112'
// > const fn = (value) => {
// > ...
// > }
// > fn(value) // 输出 [1， 11， 112]
// > ```

// <img src="https://ws1.sinaimg.cn/large/006tNc79gy1g45a04ntttj30k20wen01.jpg" height="800"/>

// 解析：[第 92 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/143)

/**
 * dfs
 * @author waldon
 * @date 2022-04-08
 * @param {*} value - param
 * @param {*} arr - param
 */
function getArr(value, arr) {
  function getChildren(_arr, path = []) {
    for (const item of _arr) {
      if (item.id === value) {
        path.push(item.id)
        return path
      } else if (item.children) {
        path.push(item.id)
        return getChildren(item.children, [...path])
      }
    }
  }
  return getChildren(arr)
}
const data = [
  {
    id: '1',
    name: 'test1',
    children: [
      {
        id: '11',
        name: 'test11',
        children: [
          {
            id: '111',
            name: 'test111',
          },
          {
            id: '112',
            name: 'test112',
          },
        ],
      },
      {
        id: '12',
        name: 'test12',
        children: [
          {
            id: '121',
            name: 'test121',
          },
          {
            id: '122',
            name: 'test122',
          },
        ],
      },
    ],
  },
]
console.log(getArr('112', data))
