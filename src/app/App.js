import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

import HeaderPage from "../app/modules/header/Header";
import FooterPage from "../app/modules/footer/Footer";
import Routes from "../app/Routes";
import NotFound from "./modules/not-found/NotFound";

import "./App.scss";

import { Layout } from "antd";

class App extends Component {
    render() {
        return (
            <Router>
                <Layout>
                    <HeaderPage />
                    <Switch>
                        {Routes.map((route, i) => {
                            return (
                                <Route
                                    exact
                                    path={route.path}
                                    component={route.component}
                                    key={i}
                                />
                            );
                        })}
                        <Route path="*" component={NotFound} />
                    </Switch>
                    <FooterPage />
                </Layout>
            </Router>
        );
    }
}

export default App;
