class Container {
  constructor(list) {
    this.list = list
  }
  getIterator() {
    return new Iterator(this)
  }
}
class Iterator {
  constructor(container) {
    this.list = container.list
    this.index = 0
  }
  hasNext() {
    return this.index < this.list.length
  }
  next() {
    if (this.hasNext()) {
      return this.list[this.index++]
    }
    return null
  }
}

let container = new Container([1, 2, 3])
console.log([1, 2, 3, 4][Symbol.iterator]().next())
let iterator = container.getIterator()
while (iterator.hasNext()) {
  console.log(iterator.next())
}
