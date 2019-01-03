import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { collectInitial } from "node-style-loader/collect";
import Loadable from "react-loadable";
import { getBundles } from "react-loadable/webpack";
import Engine from "../engine";
import App from "../../src/app/App";

//eslint-disable-next-line
const stats = require("../../dist/react-loadable.json");

class Renderer {
    constructor(app) {
        app.get("*", this.renderApp());
    }

    renderApp = () => (req, res) => {
        let context = {};
        let helmetContext = {};
        let modules = [];

        const html = renderToString(
            <Loadable.Capture report={moduleName => modules.push(moduleName)}>
                <StaticRouter location={req.url} context={context}>
                    <HelmetProvider context={helmetContext}>
                        <App />
                    </HelmetProvider>
                </StaticRouter>
            </Loadable.Capture>
        );

        const initialStyleTag = collectInitial();
        const preState = {};
        let bundles = getBundles(stats, modules);

        res.send(
            Engine({
                html,
                preState,
                initialStyleTag,
                helmet: helmetContext.helmet,
                bundles,
            })
        );
    };
}

export default Renderer;
