import Loadable from "react-loadable";
import * as express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import thunkMiddleware from "redux-thunk";
import { applyMiddleware, compose, createStore } from "redux";
import Renderer from "./render";
import state from "../src/app/reducers";

class ServerSideRendering {
  static PORT = 3000; // Default port for server

  constructor() {
    this.port = process.env.PORT || ServerSideRendering.PORT;
    this.app = express();
    this.serverStore = {};
    this.storeConfig();
    this.createConfigMiddleWare();
    this.createRouter();
    this.startService();
  }

  storeConfig = () => {
    const middlewares = [thunkMiddleware];
    const enhancers = [applyMiddleware(...middlewares)];
    const composedEnhancer = compose(...enhancers);
    this.serverStore = createStore(state, {}, composedEnhancer);
  };

  createConfigMiddleWare = () => {
    this.app.use(compression());
    this.app.use(bodyParser.json());

    this.app.use(
      morgan("combined", {
        skip: function(req, res) {
          return res.statusCode === 200 || res.statusCode === 304;
        },
      })
    );

    this.app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );

      next();
    });

    this.app.use(
      express.static("dist", {
        maxAge: 86400,
      })
    );

    // For service worker
    this.app.use("/sw.js", express.static("dist/sw.js", { maxAge: 86400 }));

    this.app.use(
      "/assets",
      express.static("dist/assets", {
        maxAge: 86400,
      })
    );
  };

  createRouter = () => {
    new Renderer(this.app, this.serverStore);
  };

  startService = () => {
    Loadable.preloadAll().then(() => {
      this.app.listen(this.port, () => {
        //eslint-disable-next-line
        console.log(`App listening on port ${this.port}!`);
      });
    });
  };
}

new ServerSideRendering();
