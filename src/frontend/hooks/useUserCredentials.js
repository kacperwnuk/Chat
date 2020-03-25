import React from "react";
import {useSelector} from "react-redux";

/**
 *
 * @param {ApplicationState} store
 * @return {UserCredentials}
 */
function selector(store) {
    return store.userCredentials;
}

/**
 *
 * @return {[UserCredentials, function(uc:UserCredentials):void]}
 */
export default function useUserCredentials() {
    let userCredentials = useSelector(selector);

    return [userCredentials,];
}
