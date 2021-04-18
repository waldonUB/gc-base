class HouseOwner{
    houseInfo() {
        console.log(`房子89平`)
    }
    ownerInfo() {
        console.log(`房主18岁`)
    }
}
class ProxyObejct{
    constructor() {
        this.houseOwner = new HouseOwner()
    }
    showHouseInfo() {
        console.log(`这一步是中介前置的操作`)
        this.houseOwner.houseInfo()
        console.log(`这一步是中介后置的操作`)
    }
}

(function f() {
    var proxyObject = new ProxyObejct()
    proxyObject.showHouseInfo()
}())
