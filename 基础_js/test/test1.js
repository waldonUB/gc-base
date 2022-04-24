const obj = {
  a: 1,
  b: function () {
    setTimeout(() => {
      console.log(this.a)
    })
  },
}
obj.b()
//
