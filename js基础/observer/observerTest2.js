var observer = function (name) { // 这里可以控制观察者，应该提供添加和删除观察者的方法
    this.name = name
};
(function () { // 这个立即执行函数是干嘛的？
    var subscribes = {}; // 这里是每个主题对应所有观察者的方法，结构为{[],[]}
    /**
     * @param topic 主题
     * @param args 订阅的方法的参数
     * */
    observer.prototype.publish = function (topic, args) {
        if (!subscribes[topic]) {
            return false
        }
        setTimeout(function () { // 如果有人退订了，就直接不给他通知了？
            subscribes[topic].forEach(item => {
                item.func(args)
            })
        }, 0)
    }
    /**
     * @param topic 主题
     * @param subscriber 订阅者：包含 1.订阅者标识 2.订阅的方法
     * */
    observer.prototype.subscribe = function (topic, subscriber) {
        if (!subscribes[topic]) {
            subscribes[topic] = []
        }
        subscribes[topic].push({
            name: subscriber.name,
            func: subscriber.func
        })
    }
    observer.prototype.unsubscribe = function (topic) {
        var name = this.name
        if (!subscribes[topic]) {
            return false
        }
        subscribes[topic] = subscribes[topic].filter(item => item.name !== name)
    }
}())

var subscriber1 = new observer('wdq')
var subscriber2 = new observer('ksl')
subscriber1.subscribe('eat', {
    name: subscriber1.name, // 这个更准确的话应该用来放这个事件的标识
    func: function (cookbook) {
        console.log(subscriber1.name + `您好，` + `今天的菜单是：` + cookbook)
    }
})
subscriber2.subscribe('eat', {
    name: subscriber2.name,
    func: function (cookbook) {
        console.log(subscriber2.name + `您好，` + `今天的菜单是：` + cookbook)
    }
})
observer.prototype.publish('eat', '苦瓜炒肉')
console.log(subscriber1.name + `已退订`)
subscriber1.unsubscribe('eat')
observer.prototype.publish('eat', '番茄炒蛋')