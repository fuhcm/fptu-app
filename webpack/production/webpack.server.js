const path = require("path");

module.exports = env => {
    const distPath =
        env.name === "staging" ? "dist/staging" : "dist/production";

    return require("../common/webpack.core")({
        environment: env.name === "staging" ? "staging" : "production",
        entry      : { server: "./server/index.js" },
        output     : {
            path    : path.resolve(__dirname, "../../", distPath + "/server"),
            filename: `[name].js`,
        },
        mode  : "production",
        target: "node",
    });
};
