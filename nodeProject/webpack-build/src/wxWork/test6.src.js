let index = 1;
let index2 = 2;
console.log(`num`, index + index2);
console.log(`devtool: 'inline-source-map',`);
let es7Fn = async () => {
  setTimeout(() => {
    console.log("延迟0.5");
  }, 500);
};
es7Fn();
