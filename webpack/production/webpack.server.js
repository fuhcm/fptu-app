const path = require("path");

module.exports = () => {
    return require("../common/webpack.core")({
        environment: "production",
        entry      : { server: "./server/index.js" },
        output     : {
            path    : path.resolve(__dirname, "../../", "dist/server"),
            filename: `[name].js`,
        },
        mode  : "production",
        target: "node",
    });
};
