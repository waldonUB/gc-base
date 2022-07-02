var s = []
var arr = s
for (var i = 0; i < 3; i++) {
  var pusher = {
      value: 'item' + i
    },
    tmp
  if (i !== 2) {
    tmp = []
    pusher.children = tmp
  }
  arr.push(pusher)
  arr = tmp
}
console.log(JSON.stringify(s[0]))

// s = [
//   {
//     value: 'item0',
//     children: [
//       {
//         value: 'item1',
//         children: [
//           {
//             value: 'item2'
//           }
//         ]
//       }
//     ]
//   }
// ]
