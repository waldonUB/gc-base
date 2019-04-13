module.exports = {
    entry: {
        home: './js/export.js',
        require: './js/require.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist'
    }
}