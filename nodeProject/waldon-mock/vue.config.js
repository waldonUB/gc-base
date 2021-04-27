module.exports = {
	devServer: {
		overlay: {},
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
