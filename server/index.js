import express from "express";
import Loadable from "react-loadable";

import serverRenderer from "./middleware/renderer";

const PORT = 3000;
const path = require("path");

// Initialize the application and create the routes
const app = express();
const router = express.Router();

// Print logs
app.use(function(req, res, next) {
    // Logs
    console.log(JSON.stringify(req.headers["user-agent"]));
    next();
});

// Root (/) should always serve our server rendered page
router.use("^/$", serverRenderer);

// Other static resources should just be served as they are
router.use(
    express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
);

router.use("*", serverRenderer);

// Tell the app to use the above rules
app.use(router);

// Start the app
Loadable.preloadAll().then(() => {
    app.listen(PORT, error => {
        if (error) {
            return console.log("Something bad happened: ", error);
        }

        console.log("App listening on " + PORT + "...");
    });
});
