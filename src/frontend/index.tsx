import React from "react";
import ReactDOM from "react-dom";
import {Switch, Route, HashRouter as Router } from "react-router-dom"

import App from "./App";
import AppDataProvider from "./redux/AppDataProvider";
import CssBaseline from '@material-ui/core/CssBaseline';
import SessionProvider from "./lib/SessionProvider";
import NotificationContainer from "./components/NotificationContainer";
import TranslateProvider from "./i18n/TranslateProvider";
import {CookiesProvider} from "react-cookie";
import RegisterScreen from "./components/RegisterScreen";
import LoginScreen from "./components/LoginScreen";

const app = document.createElement("div");
app.id = "app";
document.body.append(app);

ReactDOM.render(
    <Router>
        <CookiesProvider>
            <AppDataProvider>
                <SessionProvider>
                    <TranslateProvider>
                        <CssBaseline/>
                        <Switch>
                            <Route path="/" exact  component={LoginScreen} />
                            <Route path="/register" exact component={RegisterScreen} />
                        </Switch>
                        <NotificationContainer/>
                    </TranslateProvider>
                </SessionProvider>
            </AppDataProvider>
        </CookiesProvider>
    </Router>,
    app);
