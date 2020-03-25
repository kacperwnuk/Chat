import React from "react";
import useUserCredentials from "./hooks/useUserCredentials";
import LoginScreen from "./components/LoginScreen";

export default function App() {

    let [uc] = useUserCredentials();

    if (!uc.isLogged) {
        return <LoginScreen/>
    }

    return <div>To jest nasza aplikacja</div>
}