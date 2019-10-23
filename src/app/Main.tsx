import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { loadReCaptcha } from "react-recaptcha-google";
import App from "./App";
import LandingPage from "./modules/landing-page/LandingPage";

function Main() {
    useEffect(() => {
        loadReCaptcha();
    });

    return (
        <React.Fragment>
            <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/*" component={App} />
            </Switch>
        </React.Fragment>
    );
}

export default Main;
