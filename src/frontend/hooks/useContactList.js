import {useSelector} from "react-redux";
import useSession from "./useSession";
import * as React from "react";
import useSessionState from "./useSessionState";
import {SessionState} from "../lib/Session";

/**
 *
 * @param {AppData.State} store
 * @return {AppData.ContactList | null}
 */
function selector(store) {
    return store.contact_list;
}

/**
 * @return {AppData.ContactList | null}
 */
export default function () {
    const contact_list = useSelector(selector) ?? null;
    const session_state = useSessionState();
    const session = useSession();

    React.useEffect(() => {
        if (session_state !== SessionState.Connected) return;

        if (contact_list === null || contact_list === undefined) {

            session.getMyContacts().then(contact_list => {
                console.log(contact_list);
            });

        } else {

        }

    }, [contact_list, session_state]);

    return contact_list;
}