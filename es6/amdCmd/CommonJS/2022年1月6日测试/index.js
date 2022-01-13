const { foo } = require('./lib1.js')
foo()
// 直接执行的循环依赖会有问题，后执行的拿不到先执行的函数的变量
