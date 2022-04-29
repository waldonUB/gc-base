function nextLight() {
  const rules = [
    {
      name: 'red',
      time: 2000,
    },
    {
      name: 'yellow',
      time: 1000,
    },
    {
      name: 'green',
      time: 3000,
    },
  ]
  let index = 0
  function next() {
    if (index >= rules.length) {
      index = 0
    }
    const current = rules[index]
    console.log(current.name)
    setTimeout(() => {
      index++
      next()
    }, current.time)
  }
  next()
}
nextLight()
