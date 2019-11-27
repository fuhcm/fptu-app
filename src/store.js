import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import logger from "redux-logger";

import storage from "redux-persist/lib/storage";
import reducers from "./app/reducers";

const initialState = {};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default function configureStore() {
  const middlewares = [thunk];
  const enhancers =
    APP_ENV.NODE_ENV === "production"
      ? [applyMiddleware(...middlewares)]
      : [applyMiddleware(...middlewares, logger)];
  const store = createStore(
    persistedReducer,
    initialState,
    compose(...enhancers)
  );

  let persistor = persistStore(store);

  return { store, persistor };
}
