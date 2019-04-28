const fastCar = 'fastCar'
const privateCar = 'privateCar'
const carNo = ''
const carName = ''
var beginTime = null
var endTime = null
function choseCar(carType) {
    beginReduce(carType)
    endReduce(carType)
}

function beginReduce(carType) {
    beginTime = new Date()
    console.log(`类型为：${carType}，车牌号为${carNo}，名称为：${carName}`)
}

function endReduce(carType) {
    endTime = new Date()
    if (carType === 'fastCar') {
        const price = (endTime - beginTime)
        console.log(`fastCar price : ${price}`)
    }else if (carType === 'privateCar') {
        const price = (endTime - beginTime) * 2
        console.log(`privateCar price : ${price}`)
    }else {
        // throw new exception()
    }

}

choseCar('fastCar')
