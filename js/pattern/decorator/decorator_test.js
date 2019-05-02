class Person {
    eat() {
        console.log(`I can eat`)
    }
}

class Decorator {
    constructor(person) {
        this.person = person
        this.person.eat()
        this.sleep(person)
    }
    sleep(person) {
        console.log(`I can sleep：${person}`)
    }
}

var person = new Person()
var dec = new Decorator(person)
