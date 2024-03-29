const path = require('path')
const fs = require('fs')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InjectBodyPlugin = require('inject-body-webpack-plugin').default
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') // webpack5更推荐这个
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 速度分析
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
// 分析包内容
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// , new BundleAnalyzerPlugin()
const { merge } = require('webpack-merge')
// 引用
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
// 缓存
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
// 缓存
const AutoDllPlugin = require('autodll-webpack-plugin')

// 自定义Plugin
const MyCopyPlugin = require('./src/plugins/CopyPlugin')

const srcDir = path.resolve(__dirname, 'src/router/home/splitChunk_test')
const readDir = fs.readdirSync(srcDir)
let entry = {}
readDir.forEach((item, index) => {
  let entryName = '/' + item.split('.')[0]
  entry[entryName] = path.resolve(srcDir, item)
})
const commonConfig = {
  entry: {
    main: path.resolve(__dirname, 'src/router/home/splitChunk_test/module_home.js'),
  },
}

const productionConfig = {
  mode: 'production',
  output: {
    filename: '[name].[chunkHash:8].js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: 'http://st.aaadns.com/ver2/js/',
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: ['thread-loader', 'babel-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.js$/i,
        use: ['./src/loaders/translateText_loader.js'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(),
    new InjectBodyPlugin({
      content: `<script>
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?d3accca0e4161799ebc55fa9a7b8d8da";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
      </script>`,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkHash:8].css',
    }),
    // new CssMinimizerPlugin(),
    new OptimizeCssAssetsPlugin(),
  ],
  devtool: 'none',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
      }),
    ],
    // sideEffects: true, // 放在package.json "sideEffects": false。sideEffects为true的时候意思是全部有副作用，不可treeShaking
    // usedExports: true,
    splitChunks: {
      chunks: 'initial',
      minSize: 0,
      cacheGroups: {
        vueBase: {
          name: 'vueBase',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          priority: 2,
        },
      },
    },
  },
}

const publicPath = ''
// const publicPath = '/dist/'
const _moduleList = []

for (let _i = 1; _i <= 4; _i++) {
  _moduleList.push(path.resolve(__dirname, `src/router/home/splitChunk_test/module_c${_i}.js`))
}

const developmentConfig = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath,
  },
  devServer: {
    index: `index.html`,
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/i,
        use: ['thread-loader', 'babel-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.js$/i,
        use: ['./src/loaders/translateText_loader.js'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'], //不删除dll目录
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('', 'index.html'),
    }),
    // new DllReferencePlugin({
    //   // 描述动态链接库的文件内容
    //   manifest: require('./dist/dll/vueAll.manifest.json'),
    // }),
    // new AutoDllPlugin({
    //   inject: true, // 自动插入到 index.html
    //   debug: true,
    //   filename: '[name].js',
    //   entry: {
    //     auto_vendor: ['vue', 'vuex'],
    //     auto_common: _moduleList,
    //   },
    // }),
    // new HardSourceWebpackPlugin(),
    new MyCopyPlugin(),
  ],
  devtool: 'cheap-module-source-map',
}

module.exports = (env, args) => {
  console.log('env', env)
  console.log('args', args)
  switch (args.mode) {
    case 'development':
      return smp.wrap(merge(commonConfig, developmentConfig))
    // return merge(commonConfig, developmentConfig)
    case 'production':
      return smp.wrap(merge(commonConfig, productionConfig))
  }
}
