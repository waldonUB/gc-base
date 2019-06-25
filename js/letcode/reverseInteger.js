var reverse = function(x) {
    let a = 10
    console.log(a%10)
    if (x > Math.pow(2, 31) - 1 || x < Math.pow(-2, 31)) {
        return 0
    }
    let xp = Math.abs(x).toString()
    let xprever = xp.split('').reverse().join('')
    if (x < 0) {
        xprever = "-" + xprever
    }
    return Number(xprever)
};
reverse(1534236469)
