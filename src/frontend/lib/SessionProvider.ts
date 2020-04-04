import React from "react";
import {useDispatch} from "react-redux";
import {useBackendData} from "../redux/reducers/backend_data";
import {useCredentials} from "../redux/reducers/credentials_data";
import {makeAction} from "../redux/actions";
import Session from "./Session";
import wait from "../../share/wait";

export default function SessionProvider(props: React.PropsWithChildren<{}>) {


    const dispatch = useDispatch();
    const backend_data = useBackendData();
    const credential_data = useCredentials();

    const [session, setSession] = React.useState<Session | null>(null);
    const [session_ready, setSessionReady] = React.useState<boolean>(false);

    React.useEffect(() => {
        let canceled = false;
        wait(10).then(() => {
            if (credential_data && !canceled) {
                let newSession = new Session(backend_data, credential_data.auth_data);
                setSession(newSession);
            } else {
                setSession(null)
            }
        });

        return () => {
            canceled = true
        };
    }, [credential_data]);

    if (session instanceof Session) {
        session.setReady = setSessionReady;
        session.dispatch = dispatch;
    }

    React.useEffect(() => {
        dispatch(makeAction("SESSION_SET", session_ready ? session : null));
    }, [session_ready]);

    return React.createElement(React.Fragment, null, props.children);
}

