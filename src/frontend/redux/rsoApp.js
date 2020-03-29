import {
    SET_CREDENTIALS_DATA, SET_SESSION_STATE
} from "./actions";

/**
 *
 * @type {AppData.State}
 */
const initial_state = {
    user: null,
    auth_data: null,
    session_state: null,
    backend_data: {
        cdn_url: "localhost:8080",
        auth_url: "localhost:8082",
        session_url: "localhost:8081"
    }
};

/**
 *
 * @param {AppData.State} state
 * @param {{type:string, data:any}} action
 * @return {AppData.State}
 */
export default function rsoApp(state = initial_state, action) {

    switch (action.type) {

        case SET_CREDENTIALS_DATA:
            return {
                ...state,
                user: action.data.user,
                auth_data: action.data.auth_data
            };

        case SET_SESSION_STATE:
            return {
                ...state,
                session_state: action.data
            };

        default:
            return state;
    }
}