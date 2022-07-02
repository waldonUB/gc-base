class Car {
  constructor(name, carNo, travel) {
    this.name = name
    this.carNo = carNo
    this.travel = travel
  }
}

class FastCar extends Car {
  constructor(name, carNo, travel) {
    super(name, carNo, travel)
    this.singlePrice = 1
  }
}
class PrivateCar extends Car {
  constructor(name, carNo, travel) {
    super(name, carNo, travel)
    this.singlePrice = 2
  }
}
function showCarInfo() {
  console.log(`车牌号为：${this.carNo}`)
}

function showTotalPrice() {
  const totalPrice = this.singlePrice * this.travel
  console.log(`打车金额为：${totalPrice}`)
}

var car = new FastCar('BWM', 'NB666', 5)
showCarInfo.call(car)
showTotalPrice.call(car)
var date = new Date()
console.log(new Date())
console.log(Date.now())
console.log(new Date('2021-06-07').toLocaleDateString() < new Date().toLocaleDateString())
console.log(new Date().getTime() > new Date('2021-06-07').getTime())
