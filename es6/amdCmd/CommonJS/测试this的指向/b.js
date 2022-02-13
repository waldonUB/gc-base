const { a, b } = require('./a')

const showVal = () => {
  console.log('a:', a)
  console.log('b:', b)
}

module.exports = {
  showVal,
}
