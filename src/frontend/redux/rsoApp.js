import {
    SET_AUTH_DATA
} from "./actions";

/**
 *
 * @type {AppData.State}
 */
const initialState = {
    user: null,
    session: null,
    backendData: {
        cdnUrl: "localhost:8080",
        authUrl: "localhost:8082",
        sessionUrl: "localhost:8081"
    }
};

/**
 *
 * @param {AppData.State} state
 * @param {{type:string, data:any}} action
 * @return {AppData.State}
 */
export default function rsoApp(state = initialState, action) {

    switch (action.type) {

        case SET_AUTH_DATA:
            return {
                ...state,
                user: action.data.user,
                session: action.data.session
            };

        default:
            return state;
    }
}