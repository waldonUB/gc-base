// ### 第 134 题：求两个日期中间的有效日期

// > 如 2015-2-8 到 2015-3-3，返回【2015-2-8 2015-2-9...】

// 解析：[第 134 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/264)
function getDateArr(startDate, endDate) {
  const oneDay = 1000 * 60 * 60 * 24
  let startTime = new Date(startDate).getTime() + oneDay
  let endTime = new Date(endDate).getTime()
  const res = []
  while (startTime < endTime) {
    res.push(new Date(startTime).toLocaleDateString())
    startTime += oneDay
  }
  return res
}

console.log(getDateArr('2020-08-06', '2020-09-06'))
