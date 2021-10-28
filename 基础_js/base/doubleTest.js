function getNum() {
  let sum = 0
  let all = 0
  while (true) {
    console.log(`进行了` + all++ + `次`)
    let num = Math.random().toString().slice(-2, -1)
    if (num % 2 === 0) {
      console.log(`当前是偶数：` + num)
      sum++
      console.log(`sum值为：` + sum)
      let money = all - getMoney()
      console.log(`本次赚了：` + money)
    } else {
      sum = 0
    }
    let flag = false
    if (sum === 9) {
      flag = true
    }
    if (flag) {
      return
    }
  }
}

function getMoney() {
  let sum = 0
  for (let i = 0; i < 10; i++) {
    sum += 2 ** i
  }
  return sum
}

getNum()
