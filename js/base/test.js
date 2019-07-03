// console.log(undefined instanceof Object)
// console.log(null instanceof Object)
// console.log(5 instanceof Object)
// console.log("" instanceof Object)
// console.log(true instanceof Object)
// console.log(Symbol instanceof Object)
function f() {
    let initList = [...Array(12)].map((item, index) => {
        return {
            month: index,
            value: 0
        }
    })
    console.log(initList)
}
f()
