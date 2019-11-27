const path = require("path");
const { ReactLoadablePlugin } = require("react-loadable/webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { commonPath } = require("../common/webpack.common");

module.exports = () => {
  return require("../common/webpack.core")({
    environment: "production",
    entry      : {
      browser: "./src/index.js",
    },
    output: {
      path         : path.resolve(__dirname, "../../", "dist/client"),
      chunkFilename: "[name].[chunkhash].js",
      filename     : `[name].[chunkhash].js`,
      publicPath   : "/client/",
    },
    target : "web",
    mode   : "production",
    devtool: null,
    plugins: [
      new ReactLoadablePlugin({
        filename: commonPath + "/dist/react-loadable.json",
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[chunkhash].css",
      }),
      new htmlWebpackPlugin({
        filename: "../index.html",
        template: "src/index.html",
      }),
    ],
  });
};
