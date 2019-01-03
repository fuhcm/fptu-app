const webpack = require("webpack");

const {
    nodeStyleLoader,
    babelLoader,
    fileLoader,
    styleLoader,
    resolve,
    optimization,
    APP_ENV,
} = require("./webpack.common");

module.exports = (env, options) => ({
    entry : options.entry,
    output: options.output,
    module: {
        rules: [
            babelLoader,
            options.target === "node" ? {} : fileLoader(env === "development"),
            options.target === "node"
                ? nodeStyleLoader
                : styleLoader(env === "development"),
        ],
    },
    devServer   : options.devServer || {},
    resolve,
    target      : options.target || "web",
    externals   : options.externals || [],
    mode        : options.mode || "development",
    devtool     : options.devtool || "",
    optimization: options.target === "node" ? {} : optimization,
    plugins     : (options.plugins || []).concat([
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(
                    APP_ENV.NODE_ENV !== "development"
                        ? "production"
                        : "development"
                ),
                BROWSER: JSON.stringify(
                    options.target === "node" ? false : true
                ),
            },
            APP_ENV: JSON.stringify(APP_ENV),
        }),
    ]),
});
