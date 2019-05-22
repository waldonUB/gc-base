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
            'pages': resolve('src/pages'),
            'test': resolve('test/')
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
                'css-loader',
                // { // 如果设定范围就用oneOf
                //     loader: 'css-loader',
                //     options: {
                //         modules: true,
                //         // 自定义生成的类名
                //         localIdentName: '[local]_[hash:4]'
                //     }
                // },
                {
                    loader: 'px2rem-loader',
                    // options here
                    options: {
                        remUnit: 16,
                        remPrecision: 2
                    }
                },
                'sass-loader'
            ]
        },{
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader'
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
