const feibonacci = function (n) {
  if (n === 0 || n === 1) {
    return n
  }
  return feibonacci(n - 1) + feibonacci(n - 2)
}

const feibonacci_dp = function (n) {
  const arr = [0, 1]
  if (n >= 2) {
    for (let i = 2; i <= n; i++) {
      arr[i] = arr[i - 1] + arr[i - 2]
    }
  }
  return arr[n]
}

// 0 1 1 2 3 5 8

// console.log('fei', feibonacci(0))
// console.log('fei', feibonacci(1))
// console.log('fei', feibonacci(2))
// console.log('fei', feibonacci(3))
// console.log('fei', feibonacci(4))
// console.log('fei', feibonacci(5))

console.log('fei', feibonacci_dp(0))
console.log('fei', feibonacci_dp(1))
console.log('fei', feibonacci_dp(2))
console.log('fei', feibonacci_dp(3))
console.log('fei', feibonacci_dp(4))
console.log('fei', feibonacci_dp(5))
