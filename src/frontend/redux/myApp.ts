import {commitCredentials} from "./reducers/credentials_data";
import type AppData from "./AppData";
import type {Action, Actions} from "./actions";

const initial_state: AppData.State = {
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
export default function myApp(state: AppData.State = initial_state, action: Action) {

    let type: keyof Actions = action.type;
    switch (type) {

        case "CREDENTIALS_DATA_SET":
            return commitCredentials(state, action.data);

        default:
            return state;
    }
}