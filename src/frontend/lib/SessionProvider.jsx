import React from "react";
import {useDispatch} from "react-redux";
import useBackendData from "../hooks/useBackendData";
import useSessionData from "../hooks/useAuthData";
import Session from "./Session";

export const SessionContext = React.createContext(null);

export default function ({children}) {

    const dispatch = useDispatch();
    const backend_data = useBackendData();
    const auth_data = useSessionData();

    /**@type{[Session|null, function(value:Session|null)]}*/
    const [session, setSession] = React.useState(null);

    React.useEffect(() => {
        async function newSession() {

            if (session instanceof Session) {
                session.destructor();
            }

            if (backend_data === null || auth_data == null) {
                setSession(null);
            } else {
                setSession(new Session(backend_data, auth_data, dispatch));
            }
        }

        newSession();

    }, [backend_data, auth_data]);


    if (session instanceof Session) {
        session._dispatch = dispatch;
    }

    return <SessionContext.Provider value={session}>
        {children}
    </SessionContext.Provider>
}