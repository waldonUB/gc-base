const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 可以把缓存目录清掉
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
            loader: "vue-loader"
        },{
            test: /\.scss$/,
            use: [
                // MiniCssExtractPlugin.loader,
                'vue-style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                },
                {
                    loader: 'px2rem-loader',
                    // options here
                    options: {
                        remUni: 75,
                        remPrecision: 4
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
        // vue-loader@15时,请确保引入这个插件！
        new VueLoaderPlugin()
        // new MiniCssExtractPlugin({
        //     filename: 'style.css'
        // })
    ],
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'dist')
    }
}
