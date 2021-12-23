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
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
    // minimize: true,
    // minimizer: [
    //   new TerserPlugin({
    //     test: /\.js(\?.*)?$/i,
    //     parallel: true,
    //   }),
    // ],
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

const publicPath = '/dist/'
const developmentConfig = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath,
  },
  devServer: {
    index: `index.html`,
    contentBase: path.join(__dirname, 'dist/dist'),
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
        use: [
          {
            loader: 'thread-loader',
            // loaders with equal options will share worker pools
            options: {
              // the number of spawned workers, defaults to (number of cpus - 1) or
              // fallback to 1 when require('os').cpus() is undefined
              workers: 2,

              // number of jobs a worker processes in parallel
              // defaults to 20
              workerParallelJobs: 50,

              // additional node.js arguments
              workerNodeArgs: ['--max-old-space-size=1024'],

              // Allow to respawn a dead worker pool
              // respawning slows down the entire compilation
              // and should be set to false for development
              poolRespawn: false,

              // timeout for killing the worker processes when idle
              // defaults to 500 (ms)
              // can be set to Infinity for watching builds to keep workers alive
              poolTimeout: 2000,

              // number of jobs the poll distributes to the workers
              // defaults to 200
              // decrease of less efficient but more fair distribution
              poolParallelJobs: 50,

              // name of the pool
              // can be used to create different pools with elsewise identical options
              name: 'my-pool',
            },
          },
          'babel-loader',
        ],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin()],
  devtool: 'cheap-module-source-map',
}

module.exports = (env, args) => {
  console.log('env', env)
  console.log('args', args)
  switch (args.mode) {
    case 'development':
      return smp.wrap(merge(commonConfig, developmentConfig))
    case 'production':
      return smp.wrap(merge(commonConfig, productionConfig))
  }
}
