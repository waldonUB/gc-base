const bigN = 1234567981234657984654654n
const bigN2 = BigInt(1234567981234657984654654n)
console.log(bigN)
console.log(bigN2)
console.log(typeof bigN2) // 结果bigint

// 三个注意点：
// 1. 不能用于Math的方法
// 2. 不能和Number混用，用前必须转换
// 3. 转成Number时用丢失精度
