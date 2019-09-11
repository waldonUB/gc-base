function myDeepClone(obj) {
    if (obj === null || obj === undefined) {
        throw new Error("clone object is empty")
    }
    debugger
    if (obj instanceof Object === true && Object.keys(obj).length > 0) {
        let object = {}
        Object.keys(obj).forEach(item => {
            if (obj.hasOwnProperty(item)) {
                let type = typeof obj[item]
                switch (type) {
                    case "object":
                    case "array":
                        object[item] = myDeepClone(obj[item])
                        break;
                    default:
                        object[item] = obj[item]
                }
            }
        })
        return object
    } else if (obj instanceof Array === true && obj.length > 0) {
        let arr = []
        obj.forEach(item => {
            if (obj.hasOwnProperty(item)) {
                let type = typeof obj[item]
                switch (type) {
                    case "object":
                    case "array":
                        arr.push(myDeepClone(obj[item]))
                        break;
                    default:
                        arr.push(obj[item])
                }
            }
        })
    }
}

let user = {
    name: 'wdq',
    age: 12,
    info: {
        sex: '男'
    }
}
let arr = [1, 2, {sex: '男'}]
let user1 = myDeepClone(user)
let arr1 = myDeepClone(arr)
user1.info.sex = '女'
arr1[2].sex = '女'
