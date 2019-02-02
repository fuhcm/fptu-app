const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const openBrowserPlugin = require("open-browser-webpack-plugin");

const APP_ENV = dotenv.config().error ? {} : dotenv.config().parsed;

module.exports = require("../common/webpack.core")({
    environment: "development",
    entry      : {
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
        quiet             : true,
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: "index.html",
            template: "src/index.html",
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new openBrowserPlugin({
            url: "http://localhost:" + APP_ENV.PORT,
        }),
    ],
});
