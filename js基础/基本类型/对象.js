// 判断 fn 是否属于对象
const fn = () => {
  return "";
};
const obj = {};
const arr = [];
console.log(fn instanceof Object); // fn是对象
console.log(obj instanceof Object); // obj是对象
console.log(arr instanceof Object); // arr是对象

const symbol = Symbol();
console.log(typeof symbol);
