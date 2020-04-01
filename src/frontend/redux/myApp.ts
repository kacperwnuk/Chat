import type AppData from "./AppData";
import type {Action, Actions} from "./actions";
import {commitCredentials} from "./reducers/credentials_data";
import {commitSession} from "./reducers/session";
import {commitContactList} from "./reducers/contact_list";
import {commitUserData} from "./reducers/user_data";

const initial_state: AppData.State = {
    backend_data: {
        cdn_url: "localhost:8080",
        auth_url: "localhost:8082",
        session_url: "localhost:8081"
    }
};

export default function myApp(state: AppData.State = initial_state, action: Action): AppData.State {

    let type: keyof Actions = action.type;
    switch (type) {

        case "CREDENTIALS_DATA_SET":
            return commitCredentials(state, action.data);
        case "SESSION_SET":
            return commitSession(state, action.data);
        case "CONTACT_LIST_SET":
            return commitContactList(state, action.data);
        case "USER_DATA_SET":
            return commitUserData(state, action.data);

        default:
            return state;
    }
}