const path = require('path');

module.exports = (env, progress) => {
  console.log(env);
  console.log(progress);
  return {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
       {
         test: /\.(png|svg|jpg|jpeg|gif)$/i,
         type: 'asset/resource',
       },
       {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          "style-loader",
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          // 将 Sass 编译成 CSS
          {
            loader: "sass-loader",
            options: {
              additionalData: "$env: " + progress.env.NODE_ENV + ";",
            },
          },
          ],
        }
      ],
    },
  }
};