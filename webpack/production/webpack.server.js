const path = require("path");

module.exports = require("../common/webpack.core")("production", {
    entry : { server: "./server/index.js" },
    output: {
        path    : path.resolve(__dirname, "../../", "dist/server"),
        filename: `[name].js`,
    },
    mode  : "production",
    target: "node",
});
