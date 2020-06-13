import React from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router} from "react-router-dom"

import App from "./App";
import AppDataProvider from "./redux/AppDataProvider";
import CssBaseline from '@material-ui/core/CssBaseline';
import SessionProvider from "./lib/SessionProvider";
import NotificationContainer from "./components/NotificationContainer";
import TranslateProvider from "./i18n/TranslateProvider";
import {CookiesProvider} from "react-cookie";

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
                        <App/>
                        <NotificationContainer/>
                    </TranslateProvider>
                </SessionProvider>
            </AppDataProvider>
        </CookiesProvider>
    </Router>,
    app);
