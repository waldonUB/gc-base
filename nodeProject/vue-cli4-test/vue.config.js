module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001/', //目标地址
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: { '^/api': '/' }, //这里重写路径
      },
    },
  },
  lintOnSave: false, //关闭eslint检查
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /ignoreSet2.js/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
  },
}
