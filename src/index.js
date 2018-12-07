import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Loadable from "react-loadable";
import App from "./app/App";

import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./store";

const store = configureStore();

const AppBundle = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

window.onload = () => {
    Loadable.preloadReady().then(() => {
        ReactDOM.hydrate(AppBundle, document.getElementById("root"));
    });
};

registerServiceWorker();
