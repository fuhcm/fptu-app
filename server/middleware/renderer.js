import React from "react";
import ReactDOMServer from "react-dom/server";
import Loadable from "react-loadable";
import { Provider as ReduxProvider } from "react-redux";
import { StaticRouter } from "react-router";

// import our main App component
import App from "../../src/app/App";

// import the manifest generated with the create-react-app build
import manifest from "../../build/asset-manifest.json";

// function to extract js assets from the manifest
const extractAssets = (assets, chunks) =>
    Object.keys(assets)
        .filter(asset => chunks.indexOf(asset.replace(".js", "")) > -1)
        .map(k => assets[k]);

const path = require("path");
const fs = require("fs");

export default (req, res, next) => {
    // get the html file created with the create-react-app build
    const filePath = path.resolve(__dirname, "..", "..", "build", "index.html");

    fs.readFile(filePath, "utf8", (err, htmlData) => {
        if (err) {
            console.error("err", err);
            return res.status(404).end();
        }

        const modules = [];
        const routerContext = {};

        // render the app as a string
        const html = ReactDOMServer.renderToString(
            <Loadable.Capture report={m => modules.push(m)}>
                <StaticRouter location={req.baseUrl} context={routerContext}>
                    <App />
                </StaticRouter>
            </Loadable.Capture>
        );

        // map required assets to script tags
        const extraChunks = extractAssets(manifest, modules).map(
            c => `<script type="text/javascript" src="${c}"></script>`
        );

        // now inject the rendered app into our html and send it to the client
        return res.send(
            htmlData
                // write the React app
                .replace(
                    '<div id="root"></div>',
                    `<div id="root">${html}</div>`
                )
                // append the extra js assets
                .replace("</body>", extraChunks.join("") + "</body>")
        );
    });
};
