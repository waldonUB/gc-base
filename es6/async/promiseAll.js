function foo() {
    return "123"
}

async function f() {
    let docs = [{}, {}, {}];
    let promises = new Promise(function (resolve, reject) {
        resolve(1)
    })
    let normal = await "666"
    let promiseAll = await Promise.all([promises])

}
f()
