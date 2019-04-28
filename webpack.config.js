const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        home: './js/export.js',
        require: './js/require_test.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist'
    },
    // module: {
    //     rules: [{
    //         test: /\.js?$/,
    //         exclude: /(node_modules)/,
    //         loader: 'babel-loader'
    //     }]
    // },
    plugins: [
        new HtmlWebpackPlugin({
            template: './html/index.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        open: true,
        port: 9000
    }
}
