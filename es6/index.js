class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    eat() {
        console.log(`${this.name} 开始吃饭啦`)
    }
}

class User extends Person {
    constructor (name, age, idCard) {
        super(name, age)
        this.idCard = idCard
    }
    showMe() {
        console.log(`${this.name}的idCard为${this.idCard}`)
    }
}
class JQuery {
    constructor(selector) {
        let slice = Array.prototype.slice
        let dom = slice.call(document.querySelectorAll(selector))
        let len = dom ? dom.length : 0
        for (let i = 0; i < len; i++) {
            this[i] = dom[i]
        }
        this.length = len
        this.selector = selector || ''
    }
}

window.$ = function (selector) {
    return new JQuery(selector)
}
