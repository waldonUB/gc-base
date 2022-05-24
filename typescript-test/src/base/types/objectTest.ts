// 这个写法还没有验证过是不是标准的
let employee: {
  id: number,
  name: string
}
employee = {
  id: 1,
  name: 'waldon'
}

// 标准写法
type Employee = {
  id: number,
  name: string
}

let employee2: Employee = {
  id: 2,
  name: 'waldon2'
}
