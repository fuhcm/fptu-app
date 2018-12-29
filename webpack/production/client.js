const webpack = require("webpack");
const path = require("path");
const { ReactLoadablePlugin } = require("react-loadable/webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const { commonPath } = require("../common");

module.exports = require("../common/core")({
    entry: {
        browser: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, "../../", "dist/client"),
        chunkFilename: "[name].[chunkhash].js",
        filename: `[name].[chunkhash].js`,
        publicPath: "/client/",
    },
    target: "web",
    mode: "production",
    plugins: [
        new ReactLoadablePlugin({
            filename: commonPath + "/dist/react-loadable.json",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash].css",
        }),
        new ManifestPlugin(),
    ],
});
