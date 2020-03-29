import React from "react";
import SignalCellular4BarIcon from '@material-ui/icons/SignalCellular4Bar';
import SignalCellular0BarIcon from '@material-ui/icons/SignalCellular0Bar';
import useSessionState from "../hooks/useSessionState";
import {SessionState} from "../lib/Session";

export default function SessionStatusIcon() {

    const session_state = useSessionState();

    console.log("SessionStatusIcon", session_state);

    if (session_state === SessionState.Connected)
        return <SignalCellular4BarIcon/>;
    else return <SignalCellular0BarIcon/>;
}