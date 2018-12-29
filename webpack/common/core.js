const webpack = require("webpack");

const {
    nodeStyleLoader,
    babelLoader,
    fileLoader,
    styleLoader,
    resolve,
    optimization,
    APP_ENV,
} = require("../common");

module.exports = options => ({
    entry : options.entry,
    output: options.output,
    module: {
        rules: [
            babelLoader,
            fileLoader,
            options.target === "node" ? nodeStyleLoader() : styleLoader(),
        ],
    },
    devServer   : options.devServer || {},
    resolve,
    target      : options.target || "web",
    externals   : options.externals || [],
    mode        : options.mode || "development",
    devtool     : options.devtool || "nosources-source-map",
    optimization: options.target === "node" ? {} : optimization,
    performance : {
        hints: "warning",
    },
    plugins: (options.plugins || []).concat([
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
