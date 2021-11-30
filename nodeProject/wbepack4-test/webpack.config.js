const path = require('path')
const fs = require('fs')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// 分析包内容
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// , new BundleAnalyzerPlugin()

const srcDir = path.resolve(__dirname, 'src/router/home/splitChunk_test')
const readDir = fs.readdirSync(srcDir)
let entry = {}
readDir.forEach((item, index) => {
  let entryName = '/' + item.split('.')[0]
  entry[entryName] = path.resolve(srcDir, item)
})

module.exports = {
  mode: 'production',
  // mode: 'development',
  entry,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    index: 'index.html',
    contentBase: path.join(__dirname, 'dist'), // todo waldon 再复习一下
    hot: true,
    port: 9000,
  },
  module: {},
  plugins: [new CleanWebpackPlugin(), new BundleAnalyzerPlugin()],
  devtool: 'cheap-module-source-map',
  optimization: {
    // minimize: true,
    // minimizer: [
    //   new TerserPlugin({
    //     test: /\.js(\?.*)?$/i,
    //     parallel: true,
    //   }),
    // ],
    sideEffects: true, // 放在package.json "sideEffects": false。sideEffects为true的时候意思是全部有副作用，不可treeShaking
    // usedExports: true,
    // splitChunks: {
    //   chunks: 'initial',
    //   minSize: 0,
    //   cacheGroups: {
    //     vueBase: {
    //       name: 'vueBase',
    //       test: /[\\/]node_modules[\\/]/,
    //       chunks: 'initial',
    //       priority: 2,
    //     },
    //   },
    // },
  },
}
