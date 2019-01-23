import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import Loadable from "react-loadable";
import { getBundles } from "react-loadable/webpack";
import { trigger } from "redial";
import axios from "axios";
import striptags from "striptags";
import Engine from "../engine";
import App from "../../src/app/App";

const stats =
    ENVIRONMENT === "staging"
        ? //eslint-disable-next-line
          require("../../dist/staging/react-loadable.json")
        : //eslint-disable-next-line
          require("../../dist/production/react-loadable.json");

class Renderer {
    constructor(app, store) {
        app.get("*", this.renderApp(store));
    }

    renderApp = store => async (req, res) => {
        trigger();
        let context = {};
        let helmetContext = {};
        let modules = [];

        const html = renderToString(
            <Loadable.Capture report={moduleName => modules.push(moduleName)}>
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        <HelmetProvider context={helmetContext}>
                            <App />
                        </HelmetProvider>
                    </StaticRouter>
                </Provider>
            </Loadable.Capture>
        );

        const preState = store.getState();
        let bundles = getBundles(stats, modules);

        if (req.originalUrl.includes("/fpt/") || req.originalUrl.includes("/medium/") || req.originalUrl.includes("/toidicodedao/")) {
            let feedName = req.originalUrl.split("/")[1];
            let articleID = req.originalUrl.split("/")[2];

            if (feedName === "toidicodedao") { feedName = "codedao"; articleID = req.originalUrl.split("/")[3];  }

            const { data } = await axios.get(
                "https://api.fptu.tech/crawl/" + feedName + "/" + articleID
            );

            const shortDesc = striptags(data.description).substring(0, 250) || "FPTU dot Tech" + "...";

            helmetContext.helmet.title = {
                toComponent: function() {
                    return null;
                },
                toString: function() {
                    return `<title data-rh="true">${data.title || "FPTU dot Tech"}</title>`;
                },
            };

            helmetContext.helmet.meta = {
                toComponent: function() {
                    return null;
                },
                toString: function() {
                    return `<meta property="og:type" content="article" /><meta property="og:description" content="${shortDesc}" /><meta property="og:image" content="${
                        data.thumbnail || "https://cdn-images-1.medium.com/max/1024/1*hMHI6laZkdZMdZNnSQg5AA.jpeg"
                    }" />`;
                },
            };
        }

        res.send(
            Engine({
                html,
                preState,
                helmet: helmetContext.helmet,
                bundles,
            })
        );
    };
}

export default Renderer;
