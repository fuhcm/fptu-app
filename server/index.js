import Loadable from "react-loadable";
import * as express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import Renderer from "./render";

class BaseApp {
    static PORT = 3000;

    constructor() {
        this.port = APP_ENV.PORT || BaseApp.PORT;
        this.app = express();
        this.createConfigMiddleWare();
        this.createRouter();
        this.startService();
    }

    createConfigMiddleWare = () => {
        this.app.use(compression());
        this.app.use(bodyParser.json());

        this.app.use(morgan("combined"));

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

        this.app.use(
            "/assets",
            express.static("dist/assets", {
                maxAge: 86400,
            })
        );
    };

    createRouter = () => {
        new Renderer(this.app);
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

new BaseApp();
