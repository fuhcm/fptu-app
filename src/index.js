import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Loadable from "react-loadable";
import { HelmetProvider } from "react-helmet-async";
import serverStyleCleanup from "node-style-loader/clientCleanup";
import App from "./app/App";
import { initializeFirebase, initialServiceWorker } from "./firebase";

import configureStore from "./store";

const store = configureStore();

const AppBundle = (
    <Provider store={store}>
        <BrowserRouter>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </BrowserRouter>
    </Provider>
);

Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(AppBundle, document.getElementById("root"));
});

// Hot reload
if (module.hot) {
    module.hot.accept();
}

serverStyleCleanup();
initializeFirebase();
initialServiceWorker();
