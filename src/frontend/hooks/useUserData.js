import React from "react";
import {useSelector} from "react-redux";

/**
 *
 * @param {ApplicationState} store
 * @return {DatabaseT.UserT}
 */
function selector(store) {
    return store.user;
}

/**
 *
 * @return {DatabaseT.UserT | null}
 */
export default function () {
    let user_data = useSelector(selector);

    return user_data ?? null;
}
