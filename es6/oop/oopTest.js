/**
 * 借助构造函数继承
 * 缺点：不能继承父类原型内的属性，只能继承父类构造函数内的属性
 * */
function Parent() {
    this.name = 'parent'
}
function Child() {
    // 指向了子类的实例
    Parent.call(this)
}
console.log(new Child())
console.log(new Child() instanceof Parent) // false

/**
 * 借助原型链实现继承
 * 缺点：从原型链上继承的属性都是共享的，
 * 没有达到各个实例属性分开的要求
 * */
function Parent2() {
    this.name = 'wdq'
    this.userInfo = [1, 2]
}
function Child2() {

}
Child2.prototype = new Parent2()
var child1 = new Child2()
var child2 = new Child2()
// 这时候其实是赋值到实例本身的属性中了，并没有覆盖原型链中的属性
child1.name = 'ksl'
console.log(child1.name)
console.log(child2.name)
child1.userInfo.push(3)
console.log(child1.userInfo) // [ 1, 2, 3 ]
console.log(child2.userInfo) // [ 1, 2, 3 ]


/**
 * 组合继承
 * 缺点：父类的构造函数执行了两次
 * */
function Parent3() {
    this.name = 'wdq'
    this.userInfo = [1, 2]
}
function Child3() {
    Parent3.call(this)
    this.age = 16
}
// Child3.prototype = new Parent3()

// 优化方式1，缺点：当Child3.prototype.constructor = Child3时，
// 就会把父类和子类的构造函数都指向子类，这样就无法区分父类的构造函数了
// Child3.prototype = Parent3.prototype

// 优化方式2：达到了父类和子类的原型对象的一个隔离
// 原因分析：Child3.prototype指向的是临时构造函数的实例，
// 临时构造函数.prototype指向的才是父类的原型？
// 相当于一个间接指向
Child3.prototype = Object.create(Parent3.prototype)
// Child3.prototype.constructor = Child3

var child3 = new Child3()
var parent3 = new Parent3()
console.log(child3.constructor)
console.log(child3.__proto__ === parent3.__proto__)
console.log(child3.__proto__)
console.log(parent3.__proto__)