module.exports = function (source) {
  // source 为 compiler 传递给 Loader 的一个文件的原内容
  console.log(`source`, source.replace(/凡科/g, "fk"));
  return source;
};
