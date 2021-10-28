async function testS () {
  const a = await Promise.resolve(1)
  console.log(a)
}
console.log(2)
testS()
console.log(`3`, 3);
