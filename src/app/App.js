import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import HeaderPage from '../app/modules/header/Header';
import FooterPage from '../app/modules/footer/Footer';
import Routes from '../app/Routes';

import './App.css';

import { Layout } from 'antd';

class App extends Component {
    render() {
        return (
            <Router>
                <Layout className="layout">
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
                        <Redirect to="/send" />
                    </Switch>
                    <FooterPage />
                </Layout>
            </Router>
        );
    }
}

export default App;
