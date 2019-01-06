const path = require("path");
const { ReactLoadablePlugin } = require("react-loadable/webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const { commonPath } = require("../common/webpack.common");

module.exports = env => {
    const distPath =
        env.name === "staging" ? "dist/staging" : "dist/production";

    return require("../common/webpack.core")({
        environment: env.name === "staging" ? "staging" : "production",
        entry      : {
            browser: "./src/index.js",
        },
        output: {
            path         : path.resolve(__dirname, "../../", distPath + "/client"),
            chunkFilename: "[name].[chunkhash].js",
            filename     : `[name].[chunkhash].js`,
            publicPath   : "/client/",
        },
        target : "web",
        mode   : env.name === "staging" ? "development" : "production",
        devtool: env.name === "staging" ? "source-map" : "",
        plugins: [
            new ReactLoadablePlugin({
                filename: commonPath + "/" + distPath + "/react-loadable.json",
            }),
            new MiniCssExtractPlugin({
                filename: "[name].[chunkhash].css",
            }),
            new ManifestPlugin(),
        ],
    });
};
