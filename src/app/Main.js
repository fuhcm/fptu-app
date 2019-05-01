import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { loadReCaptcha } from "react-recaptcha-google";
import App from "./App";
import LandingPage from "./modules/landing-page/LandingPage";

class Main extends Component {
    componentDidMount() {
        // Load captcha
        loadReCaptcha();
    }

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
