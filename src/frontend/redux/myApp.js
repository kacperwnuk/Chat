import {
    CREDENTIALS_DATA_SET, SESSION_STATE_SET
} from "./actions";
import {commitCredentials} from "./reducers/credentials_data";

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
    },
    contact_list: null
};

/**
 *
 * @param {AppData.State} state
 * @param {{type:string, data:any}} action
 * @return {AppData.State}
 */
export default function myApp(state = initial_state, action) {

    switch (action.type) {

        case CREDENTIALS_DATA_SET:
            return commitCredentials(state, action.data);

        case SESSION_STATE_SET:
            return {
                ...state,
                session_state: action.data
            };

        default:
            return state;
    }
}