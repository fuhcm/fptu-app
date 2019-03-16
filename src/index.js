import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Loadable from "react-loadable";
import { HelmetProvider } from "react-helmet-async";
import serverStyleCleanup from "node-style-loader/clientCleanup";
import { PersistGate } from "redux-persist/integration/react";
import App from "./app/App";
import { initializeFirebase, initialServiceWorker } from "./firebase";

import configureStore from "./store";

const { store, persistor } = configureStore();

const AppBundle = (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <HelmetProvider>
                    <App />
                </HelmetProvider>
            </BrowserRouter>
        </PersistGate>
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
