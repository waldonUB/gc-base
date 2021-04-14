// 入参的写法优化
const sumNum = ({ num1, num2, str: num3 }) => {
  console.log(`num1`, num1);
  console.log(`num2`, num2);
  console.log(`num3`, num3);
  return num1 + num2 + num3;
};
const params = {
  num1: 1,
  num2: 2,
  str: 3,
};
console.log(`sumNum(params):`, sumNum(params));
