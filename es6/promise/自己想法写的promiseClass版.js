// todo waldon 未完成
class MyPromise {
  constructor() {}

  then() {
    console.log(`then`)
    return this
  }

  catch() {}
}

const myPromise = new MyPromise((resolve, reject) => {})
myPromise.then()
