import {SET_AUTH_DATA} from "../actions";

/**
 *
 * @param {ResponseT.AuthS.auth} auth_data
 * @return {*}
 */
export function setAuthData(auth_data) {
    return {
        type: SET_AUTH_DATA,
        data: auth_data
    }
}

export function makeLogout() {
    return setAuthData({
        user: null,
        session: null
    });
}

