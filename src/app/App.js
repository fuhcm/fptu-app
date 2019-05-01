import React, { Component } from "react";
import "./App.scss";
import { Route, Switch, Link } from "react-router-dom";

import { Layout } from "antd";

import HeaderPage from "./modules/header/Header";
import FooterPage from "./modules/footer/Footer";
import Routes from "./Routes";
import NotFound from "./modules/not-found/NotFound";

class App extends Component {
    render() {
        return (
            <Layout>
                <div
                    style={{
                        padding        : "2rem",
                        backgroundColor: "#000",
                        textAlign      : "center",
                    }}
                >
                    <Link to="/">
                        <img
                            src="/assets/images/fpt-logo.png"
                            alt="FPTu.TECH"
                            style={{ width: "300px" }}
                        />
                    </Link>
                </div>
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
