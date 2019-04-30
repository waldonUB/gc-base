class Product {
    constructor(name) {
        this.name = name
    }
}
class Factory {
    static create(productName) {
        return new Product(productName)
    }
}
var productName = Factory.create('coffe');
console.log('productName :', productName);