const webpack = require("webpack");
const path = require("path");
const dotenv = require("dotenv");
const {
    nodeStyleLoader,
    babelLoader,
    typeLoader,
    fileLoader,
    styleLoader,
    resolve,
    optimization,
} = require("./webpack.common");

module.exports = options => {
    // Select correct env file
    const envParse =
        options.environment === "production"
            ? dotenv.config({
                  path: path.resolve(process.cwd(), ".env.production"),
              })
            : dotenv.config();

    const APP_ENV = envParse.error ? {} : envParse.parsed;

    return {
        entry : options.entry,
        output: options.output,
        module: {
            rules: [
                babelLoader,
                typeLoader,
                options.target === "node"
                    ? {}
                    : fileLoader(options.environment === "development"),
                options.target === "node"
                    ? nodeStyleLoader
                    : styleLoader(options.environment === "development"),
            ],
            exprContextCritical: false,
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
                APP_ENV    : JSON.stringify(APP_ENV),
                ENVIRONMENT: JSON.stringify(options.environment),
            }),
        ]),
    };
};
