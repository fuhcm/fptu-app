const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { APP_ENV } = require("../common/webpack.common");

module.exports = require("../common/webpack.core")("development", {
    entry: {
        browser: "./src/index.js",
    },
    output: {
        path         : path.resolve(__dirname, "../../", "public"),
        chunkFilename: "[name].js",
        filename     : `[name].js`,
        publicPath   : "/",
    },
    devtool  : "source-map",
    devServer: {
        contentBase       : path.join(__dirname, "../../public"),
        port              : APP_ENV.PORT,
        historyApiFallback: true,
        hot               : true,
        compress          : false,
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: "index.html",
            template: "src/index.html",
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
});
