module.exports = class CopyPlugin {
  apply(compiler) {
    let isInitCopy = false
    compiler.hooks.beforeCompile.tapAsync('test-copy', (c, callback) => {
      console.log('执行test-copy, beforeCompile-----------------')
      // setTimeout(() => {
      //   callback()
      // }, 5000)
      callback()
    })
    compiler.hooks.afterEmit.tap('copy-plugin', (compilation) => {
      console.log('执行copy-plugin-----------------')
      if (isInitCopy) {
        return
      }
      isInitCopy = true
      console.log(`资源已输出到目录，开始复制大文件`)
      // console.log('compilation:', compilation)
      // console.log('compiler:', compiler)
    })
  }
}
