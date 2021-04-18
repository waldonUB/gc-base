var Factory = {
    create: function create(name) {
        var obj = {}
        obj.name = name
        return obj    
    }
}

var product = Factory.create('coffe')
console.log('product :', product);    