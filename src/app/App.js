import "regenerator-runtime/runtime";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { Layout } from "antd";

import HeaderPage from "./modules/header/Header";
import FooterPage from "./modules/footer/Footer";
import Routes from "./Routes";
import NotFound from "./modules/not-found/NotFound";

import "./App.scss";

class App extends Component {
    render() {
        return (
            <Layout>
                <HeaderPage />
                <Switch>
                    {Routes.map(route => {
                        return (
                            <Route
                                exact
                                path={route.path}
                                component={route.component}
                                key={route.path}
                            />
                        );
                    })}
                    <Route path="*" component={NotFound} />
                </Switch>
                <FooterPage />
            </Layout>
        );
    }
}

export default App;
