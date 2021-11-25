const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// file-loader的官方解析是在import和require的时候解析为url，并且将文件发送到output的文件夹

// url-loader和file-loader其实差不多，url-loader其实也是基于file-loader的，多了一个limit的选项，可以限制在多少大小钱可以打包成base64的格式。
// 大于这个格式还是需要file-loader来解析的

// 不过file-loader和url-loader在webpack5中已经废弃，新的替代方案是asset modules

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, 'src/router/main.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    environment: {
      arrowFunction: false, // 支持es6的箭头
    },
  },
  devServer: {
    index: 'index.html',
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            // 基于file-loader复制的图片进行压缩
            // 后续看一下应用场景，看看能不能基于目录压缩和排除不被压缩的图片
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      // {
      //   test: /\.(png|jpg)$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10240 // 10k
      //   }
      // },
      // { // webpack5替代方案
      //   test: /\.(png|jpg)$/,
      //   type: 'asset',
      //   parser: {
      //     dataUrlCondition: {
      //       maxSize: 4 * 1024 // 4kb
      //     }
      //   }
      // },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new webpack.HotModuleReplacementPlugin(), // 开启hot的选项后就自动插入
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/index.html'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
  ],
  // devtool: 'cheap-module-source-map',
}
