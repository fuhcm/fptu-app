const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const commonPath = path.resolve(__dirname, "../../");

module.exports.babelLoader = {
    test   : /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader : "babel-loader",
};

module.exports.fileLoader = isDev => {
    return {
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
};

module.exports.styleLoader = isDev => {
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

module.exports.nodeStyleLoader = {
    test: /\.(s*)css$/,
    use : [
        "node-style-loader",
        "css-loader",
        {
            loader: "sass-loader",
        },
    ],
};

module.exports.resolve = {
    extensions: [".js", ".jsx", ".json", ".css", ".scss"],
    alias     : {
        browser: commonPath + "/src/app/utils/browser/",
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
        new TerserPlugin({
            cache   : true,
            parallel: true,
        }),
        new OptimizeCSSAssetsPlugin({}),
    ],
};

module.exports.commonPath = commonPath;
