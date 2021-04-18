let obj = {
  a: {
    b: null,
    c: '',
    d: undefined,
    e: () => {},
    f: []
  }
}

let objCopy = JSON.parse(JSON.stringify(obj))
console.log(objCopy)
