let a = 6

console.log('执行这个js')

const fn = () => {
  console.log(`只是fn`)
}
const changeA = () => {
  a++
}
export { a, fn, changeA }
