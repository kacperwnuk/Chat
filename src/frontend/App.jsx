import React from "react";
import LoginScreen from "./components/LoginScreen";
import useIsLogged from "./hooks/useIsLogged";
import MainLayout from "./components/MainLayout";

export default function App() {

    let isLogged = useIsLogged();

    if (!isLogged) {
        return <LoginScreen/>
    }

    return <MainLayout/>
}