/**
实现洗牌算法函数shuffle，给定一个数组[0,1,2,3,4,5,6]，每次随机抽选数组的n个值，连续抽选不重复已经抽选的值，直到数组抽完，在进行下一轮循环。

示例1：
var random = shuffle([0,1,2,3,4,5,6]);
random(1); // [1]
random(1); // [0]
random(1); // [2]
random(1); // [3]
random(1); // [5]
random(1); // [4]
random(1); // [6]
random(1); // [3]

示例2：
var random = shuffle([0,1,2,3,4,5,6]);
random(1); // [1]
random(2); // [0,6]
random(1); // [2]
random(4); // [3,4,5,2]

**/

function shuffle(arr) {
  return function (count) {
    // to do
  }
}

const arr = [0, 1, 2, 3, 4, 5, 6]
var random = shuffle([0, 1, 2, 3, 4, 5, 6])
random(1) // [1]
random(2) // [0,6]
random(1) // [2]
random(4) // [3,4,5,2]

// const res = []
//     while (count) {
//       if (!_arr.length) {
//         _arr = [...arr]
//       }
//       const index = Math.floor(Math.random() * _arr.length) // todo 拿到_arr.length中随机的索引
//       const num = _arr.splice(index, 1)
//       res.push(num[0])
//       count--
//     }
//     console.log(res)
//     return res
