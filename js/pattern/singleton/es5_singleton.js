var getInstance = (function() {
    let person = {}
    return function(name, age) {
        if (Object.keys(person).length === 0) {
            person.name = name
            person.age = age
        }
        return person
    }
}())

var person1 = getInstance('wdq', 19)
var person2 = getInstance('ksl', 18)
console.log(`pserson1: ${person1.name}`)
console.log(`pserson2: ${person2.name}`)
console.log(person1 === person2) // true