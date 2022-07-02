function f(price) {
  price = price.toString()
  if (price.indexOf('.') !== -1) {
    let intPart = price.split('.')[0]
    let decimal = price.split('.')[1]
    price = intPart
      .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      .concat('.')
      .concat(decimal)
  } else {
    price = price.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  }
  return price
}

console.log(f('2555555.6'))
