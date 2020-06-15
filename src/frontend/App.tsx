import React from "react";
import {Redirect, Route, Switch, useLocation, useRouteMatch} from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import MainLayout from "./components/MainLayout";
import useIsLogged from "./hooks/useIsLogged";
import ConversationPage from "./page/ConversationPage";
import ProfilePage from "./page/ProfilePage";

export default function App() {
    const is_logged = useIsLogged();

    return <Switch>

        <Route path="/login">
            {is_logged ? <Redirect to="/"/> : <LoginScreen/>}
        </Route>

        <Route path="/register">
            {is_logged ? <Redirect to="/"/> : <RegisterScreen/>}
        </Route>

        {is_logged ? <>

            <MainLayout>

                <Route path="/conversation/:user_id">
                    <ConversationPage/>
                </Route>

                <Route path="/profile/:user_id">
                    <ProfilePage/>
                </Route>

                <Route path="/">
                </Route>

            </MainLayout>

        </> : <Redirect to="/login"/>}

    </Switch>
}