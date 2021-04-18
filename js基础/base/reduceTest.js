// 自己实现一个reduce
Array.prototype.myReduce = function (fn, init) {
    let prev = init
    if (typeof fn !== 'function') {
        throw new Error("it is not a function")
    }
    for (let i = 0; i < this.length; i++) {
        let curr = this[i]
        prev = fn(prev, curr, i, this)
    }
    return prev
}

let sum = [1, 2, 3].myReduce((prev, curr) => {
    prev.push(curr * 3)
    console.log(`prev:` + prev)
    return prev
}, [])
console.log(sum)
