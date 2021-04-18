const path = require('path')
const fs = require('fs-extra')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const srcDir = path.resolve(__dirname, 'src/wxWork')
const readDir = fs.readdirSync(srcDir)
let entry = {}
readDir.forEach((item, index) => {
  let entryName = index + '/' + item.split('.')[0]
  entry[entryName] = path.resolve(srcDir, item)
})

const testDir = fs.readdirSync('U:\\dev-svn\\waldon\\res\\tsportal\\test')
console.log(`testDir`, testDir)

module.exports = {
  mode: 'development',
  entry,
  output: {
    filename: '[name].src.js',
    path: 'U:\\dev-svn\\waldon\\res\\tsportal\\test'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [srcDir],
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime']
        }
      }
    ]
  },
  plugins: [new CleanWebpackPlugin()],
  watchOptions: {
    ignored: /^((?!wxWork).)*$/
  },
  devtool: 'cheap-module-source-map'
}
