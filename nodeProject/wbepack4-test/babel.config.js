module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        modules: false,
        corejs: {
          version: 3, // 使用core-js@3
          proposals: true,
        },
        debug: false,
        targets: {
          chrome: '58',
          ie: '11',
        },
      },
    ],
  ],
}
