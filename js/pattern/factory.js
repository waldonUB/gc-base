function createFactory(name, age) {
    var obj = {}
    obj.name = name
    obj.age = age
    return obj
}

var user1 = createFactory('wdq', 19)


function CreateFactory1(name, age) {
    this.name = name;
    this.age = age;
}

var user2 = new CreateFactory1('wdq', 19)
