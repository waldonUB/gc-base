// 概念
// 作用域链
// 当在函数作用域操作一个变量时，它会先在自身作用域中寻找，如果有就直接使用（就近原则）。如果没有则向上一级作用域中寻找，直到找到全局作用域；如果全局作用域中依然没有找到，则会报错ReferenceError。
// 外部函数定义的变量可以被内部函数所使用，反之则不行

//只要是函数就可以创造作用域
//函数中又可以再创建函数
//函数内部的作用域可以访问函数外部的作用域
//如果有多个函数嵌套，那么就会构成一个链式访问结构，这就是作用域链

//f1--->全局
function f1() {
  //f2--->f1--->全局
  function f2() {
    //f3---->f2--->f1--->全局
    function f3() {}
    //f4--->f2--->f1---->全局
    function f4() {}
  }
  //f5--->f1---->全局
  function f5() {}
}
