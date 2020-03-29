import {SET_CREDENTIALS_DATA} from "../actions";

/**
 *
 * @param {ResponseT.AuthS.auth} credential_data
 * @return {*}
 */
export function setCredentialsData(credential_data) {
    return {
        type: SET_CREDENTIALS_DATA,
        data: credential_data
    }
}

export function makeLogout() {
    return setCredentialsData({
        user: null,
        auth_data: null
    });
}

