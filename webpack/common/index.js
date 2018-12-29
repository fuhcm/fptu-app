const dotenv = require("dotenv");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const APP_ENV = dotenv.config().error ? {} : dotenv.config().parsed;
const isDev = APP_ENV.NODE_ENV === "development";
const commonPath = path.resolve(__dirname, "../../");

module.exports.babelLoader = {
    test   : /\.(js|jsx)$/,
    exclude: /node_modules/,
    use    : {
        loader : "babel-loader",
        options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
                "@babel/proposal-class-properties",
                "@babel/plugin-transform-runtime",
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-transform-async-to-generator",
                "@babel/plugin-syntax-dynamic-import",
                "@babel/plugin-transform-react-jsx",
            ],
        },
    },
};

module.exports.fileLoader = {
    test: /\.(png|jpg|gif|ttf|eot|woff|woff2|tcc|svg|otf)$/i,
    use : [
        {
            loader : "url-loader",
            options: {
                limit     : 4000,
                fallback  : "file-loader",
                quality   : 85,
                publicPath: isDev ? "/" : "/client/",
            },
        },
        {
            loader : "image-webpack-loader",
            options: {
                mozjpeg: {
                    progressive: true,
                    quality    : 65,
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                    enabled: false,
                },
                pngquant: {
                    quality: "65-90",
                    speed  : 4,
                },
                gifsicle: {
                    interlaced: false,
                },
                // the webp option will enable WEBP
                webp: {
                    quality: 75,
                },
            },
        },
    ],
};

module.exports.styleLoader = () => {
    return {
        test: /\.(s*)css$/,
        use : [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            {
                loader: "sass-loader",
            },
        ],
    };
};

module.exports.nodeStyleLoader = () => {
    return {
        test: /\.(s*)css$/,
        use : [
            "node-style-loader",
            "css-loader",
            {
                loader: "sass-loader",
            },
        ],
    };
};

module.exports.resolve = {
    extensions: [".js", ".jsx", ".json", ".css", ".scss"],
    alias     : {
        // No alias now
    },
};

module.exports.optimization = {
    splitChunks: {
        chunks     : "async",
        minSize    : 30000,
        maxSize    : 0,
        cacheGroups: {
            styles: {
                name   : "styles",
                test   : /\.css$/,
                chunks : "all",
                enforce: true,
            },
            commons: {
                test  : /[\\/]node_modules[\\/]/,
                name  : "vendors",
                chunks: "all",
            },
        },
    },
    minimizer: [
        new UglifyJsPlugin({
            cache    : true,
            parallel : true,
            sourceMap: false,
        }),
        new OptimizeCSSAssetsPlugin({}),
    ],
};

module.exports.commonPath = commonPath;
module.exports.isDev = isDev;
module.exports.APP_ENV = APP_ENV;
