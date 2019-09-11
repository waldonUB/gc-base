import Vue from "vue"

let a = 0

export let ob = Vue.observable({
    test: a
});

(function () {
    // setInterval(function () {
    //     // ob.test = Math.random() * 10
    //     a = Math.random() * 10
    //     console.log(a)
    // }, 1000)
}())
