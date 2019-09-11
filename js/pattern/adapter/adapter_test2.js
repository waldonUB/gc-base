// 插座
var mySocket = {
    charge: function () {
        var num = 220
        console.log(`我是${num}V的电源`)
        return num
    }
}
// 转换插头
var adapter = {
    /**
     * @param mySocket 插座
     * */
    charge5V: function (mySocket) {
        var num = mySocket.charge()
        if (num > 5) {
            num = 5
        }
        console.log(`我现在是${num}V的电源`)
        return num
    }
}
adapter.charge5V(mySocket)
