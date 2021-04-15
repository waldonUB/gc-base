const closureFn = (() => {
  let time = 0;
  return () => {
    console.log(`current time`, ++time);
  };
})();
closureFn();
closureFn();
closureFn(); // 结果是3，是拿了同一个变量
