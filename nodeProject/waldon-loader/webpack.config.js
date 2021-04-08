const fs = require("fs-extra");
const path = require("path");
const { entry, excludePathList, outputPath } = require("./chunk-setting");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const srcDir = path.resolve(__dirname, "res/js");
console.log(`编译输出目录`, outputPath)

// 排除编译大文件，用node的fs复制到对应的目录
class CopyPlugin {
  apply(compiler) {
    console.log(`插件开始`, compiler.options.output.path)
    // compiler.hooks.done.tap('clean-webpack-plugin', stats => {
    //   console.log(`清除文件完成`)
    //   excludePathList.forEach(item => {
    //     let pathIndex = item.indexOf('tsportal') + 16 // 15是根目录到js的位置
    //     let copyToPath = path.resolve(outputPath, item.substr(pathIndex))
    //     fs.copy(item, copyToPath, err => {
    //       if (err) {
    //         console.error(err)
    //       }
    //     })
    //   })
    // });
    compiler.hooks.done.tap('copy-plugin', stats => {
      console.log(`测试自身插件`)
      excludePathList.forEach(item => {
        let pathIndex = item.indexOf('tsportal') + 16 // 15是根目录到js的位置
        let copyToPath = path.resolve(outputPath, item.substr(pathIndex))
        fs.copy(item, copyToPath, err => {
          if (err) {
            console.error(err)
          }
        })
      })
    });
  }
}
module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve(__dirname, "loader/wordLoader.js"),
            options: {
              /* ... */
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin(),
  ],
  watchOptions: {
    ignored: ["dist/**", "node_modules/**"],
  },
  devtool: "cheap-module-source-map",
};
