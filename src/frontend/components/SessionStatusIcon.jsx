import React from "react";
import SignalCellular4BarIcon from '@material-ui/icons/SignalCellular4Bar';
import SignalCellular0BarIcon from '@material-ui/icons/SignalCellular0Bar';
import {useSession} from "../redux/reducers/session";

export default function SessionStatusIcon() {

    const session = useSession();

    if (session === null)
        return <SignalCellular0BarIcon/>;
    return <SignalCellular4BarIcon/>;
}