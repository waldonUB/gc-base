## 注意点
#### webpack默认不支持ip访问
要在webpack-dev-server后面加 --host 0.0.0.0（这个表示所有ip都可以访问），host后面的ip属于可配置项，可以改成其他ip，比如服务器的ip，就可以直接打开了。
###### 可以把打包好的直接扔后端的webapp下面，后端如果要改项目名，前端就可以改assetsPublicPath，然后再把dist文件夹改成对应的项目名

#### 官方中文文档
https://webpack.docschina.org/configuration/dev-server/#devserver

### 基本配置
默认会找到当前目录下的webpack.config.js?

```
const path = require('path')

module.exports = {
    entry: {
        app: './src/main.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    module: {
        // 这里之前是loaders的？
        rules: [{
            test: /\.html$/,
            loader: 'html-loader'
        },{
            test: /\.vue$/,
            loader: "vue-loader"
        },{
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader'
        }]
    },
    plugins: [],
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'dist')
    }
}

```
#### npm命令
1. 安装到开发环境

```
npm install ** --save-d
npm install ** --save-dev
npm install ** -D
```
2. 安装到生产环境，不要后缀即可
###### webpack.config.js结构


###### html的HtmlWebpackPlugin的配置
https://github.com/jantimon/html-webpack-plugin#options

## 代码分离
https://webpack.docschina.org/guides/code-splitting/
##### 三种方式
1. 入口起点：使用 entry 配置手动地分离代码。<br>
    这是迄今为止最简单、最直观的分离代码的方式。不过，这种方式手动配置较多，并有一些**隐患：**
    -  如果入口 chunk 之间包含一些重复的模块，那些重复模块都会被引入到各个 bundle 中。
    - 这种方法不够灵活，并且不能动态地将核心应用程序逻辑中的代码拆分出来
2. 防止重复：使用 SplitChunksPlugin 去重和分离 chunk。<br>
    **注意：**==CommonsChunkPlugin== 已经从 webpack v4（代号 legato）中移除。想要了解最新版本是如何处理 chunk，请查看 ==SplitChunksPlugin==<br>
    SplitChunksPlugin 插件可以将公共的依赖模块提取到已有的 entry chunk 中，或者提取到一个新生成的 chunk
3. 动态导入：通过模块中的内联函数调用来分离代码<br>
    通过import()返回的promise

#### 遇到的坑点
- babel-loader为7.X版本的时候,出了babel-core，还要要多装一个@babel/core
- webpack4的时候，要把vue-loader的版本升到14.X
- vue-loader版本为15.X的时候，要添加一个vueloaderPlugin
- vue为什么要使用完整版，而且要配置别名？<br>
 如果你需要在客户端编译模板 (比如传入一个字符串给 template 选项，或挂载到一个元素上并以其 DOM 内部的 HTML 作为模板)，就将需要加上编译器，即完整版
https://cn.vuejs.org/v2/guide/installation.html#%E8%BF%90%E8%A1%8C%E6%97%B6-%E7%BC%96%E8%AF%91%E5%99%A8-vs-%E5%8F%AA%E5%8C%85%E5%90%AB%E8%BF%90%E8%A1%8C%E6%97%B6 <br>
You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
(found in <Root>)
- 删掉style-loader和sass-loader还是能继续编译，而且px2rem不生效？
 vue-loader的版本不对，修正之后就行了
- 复制静态资源的时候，要加copy-webpack-plugin的插件
- 无法用IP登陆页面的时候，pack.json需要加--host 0.0.0.0
## eslint配置
#### vue官方的eslint插件：
https://github.com/vuejs/eslint-plugin-vue
#### eslint的所有配置符号
- 0 和 off 是关闭
- 1 和 warn 是警告
- 2 和 error 是错误  
https://blog.csdn.net/helpzp2008/article/details/51507428  
http://eslint.cn/docs/rules/

#### 在vscode中的配置
1. 安装eslint插件，在setting.json中添加配置
```
"eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "html",
        {
            "language": "vue",
            "autoFix": true
        }
    ],
```

2. 在项目中初始化eslint配置，并安装对应的插件和依赖
#### 在webstorm中的配置
问题：  
webstorm自带eslint插件，不过在6.0版本会出现问题  
方案：  
- 升级webstorm到2019.2的版本
- 降级eslint到4.15

#### vue中安装的npm包

```
npm install eslint eslint-plugin-vue eslint-config-standard eslint-friendly-formatter eslint-loader eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard eslint-plugin-vue babel-eslint -D
```


## 临时使用其他镜像

```
npm --registry https://registry.npm.taobao.org install express
```
## 自己的脚手架
### 安装基本的依赖
#### webpack

```
npm install webpack webpack-cli webpack-dev-server -D
```
### loader

```
npm install file-loader html-loader node-sass px2rem-loader sass-loader url-loader vue-loader vue-template-compiler -D
```
### plugins
```
// 
npm install clean-webpack-plugin copy-webpack-plugin html-webpack-plugin -D

```
### 安装vue全家桶

```
npm install vue vue-router vuex
```
