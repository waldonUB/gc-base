// var teacher = "17dian";
// function otherClass(teacher){
//     if(typeof teacher === 'undefined'){
//         console.log(teacher) // ReferenceError teacher is not defined
//         let teacher = "dongyang"
//     }else {
//         console.log(teacher);
//     }
// }
// otherClass()


// function fn(){
//     return print()
//     function print(){
//         console.log('1')
//     }
// }
// let fn2 = function fn(){
//     console.log(fn)
//     return print2() // print2 is not a function
//     var print2 = function(){
//         console.log('2')
//     }
// }
// fn()
// fn2()

// for(let i=1;i<=3;i++){
//     setTimeout(function(){
//         console.log(i)
//     }, i*1000)
// }
// for(var i=1;i<=3;i++){
//     setTimeout(function(){
//         console.log(i)
//     }, i*1000)
// }

var workshop = {
    teacher:"17dian",
    ask(){
        console.log(this.teacher,this.question)
    },
    ask1: function () {
        console.log(this.teacher,this.question)
    }
}
var teacher = "dongyang";
var question = "are you OK?"
workshop.ask()
workshop.ask1()
