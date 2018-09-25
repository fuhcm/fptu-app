import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import Header from '../app/modules/header/Header';
import Footer from '../app/modules/footer/Footer';
import Routes from '../app/Routes';

import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="wrapper">
                    <Header />
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
                        <Redirect to="/home" />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;
