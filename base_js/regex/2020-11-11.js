// 改一下之前渲染的正则，提前到拿到数据就渲染，这里之前放在下一个时间片中是因为想让用户看到了主要信息之后才开始替换系统中部分带链接的标签，
// 但是有极小部分文章有奇奇怪怪的标签会导致渲染失败，所以改到这里就替换 waldon 2020年12月9日
// let regExpMap = {
//     '<pre>': '<pre style="white-space: normal;">', // 提前处理一下一些有默认样式的标签 turbo
//     '<noscript>(.*?)<\/noscript>': '',
//     '<span (class="tsCommTitle">[^<]*)<\/span>': '<div $1 </div>', // 替换内部链接样式。h5富文本标签有限制，只能再小程序改
//     'data-': '',
// }
// let regExpStr = Object.keys(regExpMap).map(item => item).join('|')
// console.log(regExpStr)

let str = ''
for (let i = 0; i < 100000; i++) {
  str += i
}
let start = new Date().getTime()
str = str
  .replace(/1/g, 'a')
  .replace(/2/g, 'b')
  .replace(/3/g, 'c')
  .replace(/4/g, 'd')
  .replace(/5/g, 'e')
// let regMap = {
//     1: 'a',
//     2: 'b',
//     3: 'c',
//     4: 'd',
//     5: 'e',
// }
// let regExpStr = Object.keys(regMap).map(item => item).join('|')
// let reg = new RegExp(regExpStr, 'g')
// str = str.replace(reg, item => regMap[item])
// str = str.replace(/1|2|3|4|5/g, 'a')

let end = new Date().getTime()
console.log(`时间：`, end - start)
