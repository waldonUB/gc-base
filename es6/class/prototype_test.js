class Person {
    // name = 'wdq'
    constructor(age = 100) {
        this.age = age
    }

}

var u1 = new Person()
var u2 = new Person(13)
console.log(u1)
console.log(u2)
