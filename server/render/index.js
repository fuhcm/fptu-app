import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import Loadable from "react-loadable";
import { getBundles } from "react-loadable/webpack";
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

    renderApp = store => (req, res) => {
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
