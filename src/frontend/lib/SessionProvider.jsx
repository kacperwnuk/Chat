import React from "react";
import {useDispatch} from "react-redux";
import Session from "./Session";
import {useBackendData} from "../redux/reducers/backend_data";
import {useCredentials} from "../redux/reducers/credentials_data";
import useIsLogged from "../hooks/useIsLogged";

export const SessionContext = React.createContext(null);

export default function SessionProvider({children}) {
    console.log("SessionProvider");

    const dispatch = useDispatch();
    const is_logged = useIsLogged();
    const backend_data = useBackendData();
    const credential_data = useCredentials();

    const [session, setSession] = React.useState(null);
    const [session_ready, setSessionReady] = React.useState(null);


    if (is_logged && !(session instanceof Session)) {
        let newSession = new Session(backend_data, credential_data.auth_data);
        setSession(newSession);
    }

    if (session instanceof Session)
        session.setReady = setSessionReady;

    return <SessionContext.Provider value={session_ready ? session : null}>
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
