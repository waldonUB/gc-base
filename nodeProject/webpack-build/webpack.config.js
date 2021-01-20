const path = require("path");
const fs = require("fs-extra");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const srcDir = path.resolve(__dirname, "src/wxWork");
const readDir = fs.readdirSync(srcDir);
let entry = {};
readDir.forEach((item) => {
  let entryName = item.split(".")[0];
  entry[entryName] = path.resolve(srcDir, item);
});
module.exports = {
  entry,
  output: {
    filename: "[name].min.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
