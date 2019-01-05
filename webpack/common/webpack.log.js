module.exports.getLog = (env, target) => {
    if (env === "development") {
        return {
            messages: ["Your application is running in development mode!"],
            notes   : ["Keep calm and code hard!"],
        };
    } else if (env === "staging") {
        if (target === "web") {
            return {
                messages: ["The staging build for client was successful!"],
                notes   : ["Staging version enable source map for debugging."],
            };
        } else {
            return {
                messages: ["The staging build for server was successful!"],
            };
        }
    } else if (env === "production") {
        if (target === "web") {
            return {
                messages: ["The production build for client was successful!"],
            };
        } else {
            return {
                messages: ["The production build for server was successful!"],
            };
        }
    }
};
