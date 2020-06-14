import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import MainLayout from "./components/MainLayout";
import useIsLogged from "./hooks/useIsLogged";

export default function App() {
    const is_logged = useIsLogged();

    return <Switch>

        <Route path="/login">
            {is_logged ? <Redirect to="/"/> : <LoginScreen/>}
        </Route>

        <Route path="/register">
            {is_logged ? <Redirect to="/"/> : <RegisterScreen/>}
        </Route>

        <Route path="/">
            {is_logged ? <MainLayout/> : <Redirect to="/login"/>}
        </Route>

    </Switch>
}