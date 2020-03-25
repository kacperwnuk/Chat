import {
    SET_USER_CREDENTIALS
} from "./actions";

/**
 *
 * @type {ApplicationState}
 */
const initialState = {
    userCredentials: {
        isLogged: false,
    }
};

/**
 *
 * @param {ApplicationState} state
 * @param {{type:string, data:any}} action
 * @return {ApplicationState}
 */
export default function rsoApp(state = initialState, action) {

    switch (action.type) {

        case SET_USER_CREDENTIALS:
            return {
                ...state,
                userCredentials: action.data
            };

        default:
            return state;
    }
}