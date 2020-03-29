import React from "react";
import {useSelector} from "react-redux";

/**
 *
 * @param {AppData.State} store
 * @return {DatabaseT.User}
 */
function selector(store) {
    return store.user;
}

/**
 *
 * @return {DatabaseT.User | null}
 */
export default function () {
    let user_data = useSelector(selector);

    return user_data ?? null;
}
