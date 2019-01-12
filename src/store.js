import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import reducers from "./app/reducers";

const initialState = {};

export default function configureStore() {
    const middlewares = [thunk];
    const enhancers =
        APP_ENV.NODE_ENV === "production"
            ? [applyMiddleware(...middlewares)]
            : [applyMiddleware(...middlewares, logger)];
    const store = createStore(reducers, initialState, compose(...enhancers));

    return store;
}
