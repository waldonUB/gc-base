const path = require('path')
const fs = require('fs')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const srcDir = path.resolve(__dirname, 'src/wxWork')
const readDir = fs.readdirSync(srcDir)
let entry = {}
readDir.forEach((item, index) => {
  let entryName = index + '/' + item.split('.')[0]
  entry[entryName] = path.resolve(srcDir, item)
})

module.exports = {
  mode: 'development',
  entry,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    index: 'index.html',
    contentBase: path.join(__dirname, 'dist'), // todo waldon 再复习一下
    hot: true,
    port: 9000
  },
  module: {},
  plugins: [new CleanWebpackPlugin()],
  devtool: 'cheap-module-source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true
      })
    ]
  }
}
