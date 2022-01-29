let a = 6

const fn = () => {
  console.log(`只是fn`)
}
const changeA = () => {
  a++
}
export { a, fn, changeA }
