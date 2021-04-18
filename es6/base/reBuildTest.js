let params = {
  a: '',
  b: 'bb',
  c: 'ww'
}
let params2 = {
  a: 'qqq',
  b: 'rrrr',
  c: ''
}
Object.assign(params, params2)

console.log(Object.assign(params, params2))
