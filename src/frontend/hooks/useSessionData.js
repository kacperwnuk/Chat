import React from "react";
import {useSelector} from "react-redux";

/**
 *
 * @param {ApplicationState} store
 * @return {DatabaseT.SessionT}
 */
function selector(store) {
    return store.session;
}

/**
 *
 * @return {DatabaseT.SessionT | null}
 */
export default function () {
    let session_data = useSelector(selector);

    return session_data ?? null;
}
