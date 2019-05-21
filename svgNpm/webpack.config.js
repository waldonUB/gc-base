const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 可以把缓存目录清掉
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**
 * 用来配置别名
 * */
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    entry: {
        app: './src/main.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js', // 用 webpack 1 时需用 'vue/dist/vue.common.js'
            '@': resolve('src'),
            'pages': resolve('src/pages')
        }
    },
    module: {
        rules: [{
            test: /\.html$/,
            loader: 'html-loader'
        },{
            test: /\.vue$/,
            loader: "vue-loader",
        },{
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        // 开启 CSS Modules
                        modules: false,
                        // 自定义生成的类名
                        localIdentName: '[local]_[hash:4]'
                    }
                },
                'sass-loader'
            ]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'SVG',
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'dist')
    }
}
