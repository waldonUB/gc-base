const aObj = require('./a')
const bObj = {
  ...aObj,
  c: 789,
}
console.log(bObj)
