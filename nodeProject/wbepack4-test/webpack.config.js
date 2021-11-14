const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, 'src/router/home/main.js')
  },
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
        test: /\.js(\?.*)?$/i
      })
    ]
  }
}
