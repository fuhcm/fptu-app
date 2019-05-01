import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
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

                <Link to="/medium">
                    <img
                        alt="Gopher Icon"
                        src="/assets/images/gopher.svg"
                        style={{
                            maxWidth: "70px",
                            position: "fixed",
                            bottom  : "10px",
                            right   : "10px",
                        }}
                    />
                </Link>
            </React.Fragment>
        );
    }
}

export default Main;
