module.exports = {
  root: true,
  // parser: 'babel-eslint',
  parser: "vue-eslint-parser",
  parserOptions: {
    //设置"script"（默认）或"module"如果你的代码是在ECMAScript中的模块。
    ecmaVersion: 2017,
    sourceType: "module",
  },
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  // extends: 'standard',
  extends: ["eslint:recommended", "prettier"],
  // required to lint *.vue files
  // plugins: ['html'],
  rules: {
    // allow paren-less arrow functions
    // quotes: [2, "single"],
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "no-unused-vars": [
      2,
      {
        // 允许声明未使用变量
        vars: "local",
        // 参数不检查
        args: "none",
      },
    ],
    // 关闭语句强制分号结尾
    semi: [0],
    //空行最多不能超过100行
    "no-multiple-empty-lines": [0, { max: 100 }],
    //关闭禁止混用tab和空格
    "no-mixed-spaces-and-tabs": [0],
    // "no-console": 2, //禁止使用console
    "no-debugger": 2, //禁止使用console
    "comma-dangle": [
      0,
      {
        arrays: "only-multiline",
        objects: "only-multiline",
        imports: "only-multiline",
        exports: "only-multiline",
        functions: "only-multiline",
      },
    ],
    "function-paren-newline": [0, "multiline"],
    "array-bracket-spacing": [0, "never"],
  },
}
