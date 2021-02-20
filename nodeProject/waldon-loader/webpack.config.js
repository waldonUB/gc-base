const path = require("path");
module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve(__dirname, "loader/wordLoader.js"),
            options: {
              /* ... */
            },
          },
        ],
      },
    ],
  },
};
