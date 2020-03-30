import React from "react";
import {useDispatch} from "react-redux";
import Session, {SessionState} from "./Session";
import {useBackendData} from "../redux/reducers/backend_data";
import {useCredentials} from "../redux/reducers/credentials_data";

export const SessionContext = React.createContext(null);

export default function SessionProvider({children}) {

    const dispatch = useDispatch();
    const backend_data = useBackendData();
    const credential_data = useCredentials();

    const [session, setSession] = React.useState(null);
    const [session_state, setSessionState] = React.useState(null);


    if (backend_data === null || credential_data == null) {
        setSession(null);
    } else {
        let newSession = new Session(backend_data, credential_data.auth_data, dispatch);
        setSession(newSession);
    }

    if (session instanceof Session)
        session._setState = setSessionState;

    return <SessionContext.Provider value={session_state === SessionState.Connected ? session : null}>
        {children}
    </SessionContext.Provider>
}

/**
 *
 * @return {Session | null}
 */
export function useSession() {
    let session = React.useContext(SessionContext);

    return session ?? null;
}
