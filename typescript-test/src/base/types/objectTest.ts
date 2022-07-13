// 这个写法还没有验证过是不是标准的
let employee: {
  id: number
  name: string
}
employee = {
  id: 1,
  name: 'waldon',
}

// 标准写法
type Employee = {
  id: number
  name?: string // ？表示属性可能不存在
}

let employee2: Employee = {
  id: 2,
  name: 'waldon2',
}

// object可以视为第一层的
const showName = function (o: object) {
  console.log(o)
}

const showName2 = function (o: Employee) {
  console.log(o.name)
}

showName(employee2)
showName2(employee2)
