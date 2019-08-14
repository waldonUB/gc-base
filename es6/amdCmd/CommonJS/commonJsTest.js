let mod = require('./lib.js')
mod.incCount()
mod.count = 8 // 传出来的变量是值的拷贝
mod.obj.a = 8 // 传出来的变量是值的拷贝，而且是浅拷贝
mod.showCount()
