// let startTime = new Date()
// let endTime = new Date('2019.11.27 00:00:00')
//
// console.log(endTime.getTime() > startTime.getTime())
// console.log(startTime.toDateString())
// console.log(endTime.toDateString())

function isExpire() {
  const currentTime = new Date()
  const endTime = new Date('2019.11.26 00:00:00')
  return currentTime > endTime
}

console.log(isExpire())
