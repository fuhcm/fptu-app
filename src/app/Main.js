import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import Loading from "./modules/loading/Loading";
import App from "./App";

const LandingPage = Loadable({
    loader: () =>
        import(/* webpackChunkName: "landingPage" */ "../app/modules/landing-page/LandingPage"),
    loading: () => <Loading />,
    modules: ["../app/modules/landing-page/LandingPage"],
    webpack: () => [
        require.resolveWeak("../app/modules/landing-page/LandingPage"),
    ],
});

class Main extends Component {
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route path="/" exact component={LandingPage} />
                    <Route path="/*" component={App} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default Main;
