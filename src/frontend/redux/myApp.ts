import type AppData from "./AppData";
import type {Action, Actions} from "./actions";
import {commitCredentials} from "./reducers/credentials_data";
import {commitSession} from "./reducers/session";
import {commitContactList} from "./reducers/contact_list";
import {commitUserData} from "./reducers/user_data";
import {commitCurrentConversationId} from "./reducers/current_conversationt";

const initial_state: AppData.State = {
    backend_data: {
        cdn_url: "localhost:8080",
        auth_url: "localhost:8082",
        session_url: "localhost:8081"
    }
};

// type Commits = {
//     [key in keyof Actions]: (state: AppData.State, data: Actions[key]) => AppData.State
// }
//
// let commits: Partial<Commits> = {
//     "CREDENTIALS_DATA_SET": commitCredentials,
//     "SESSION_SET": commitSession,
//     "CONTACT_LIST_SET": commitContactList,
//     "USER_DATA_SET": commitUserData,
//     "CURRENT_CONVERSATION_ID_SET": commitCurrentConversationId
// };

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
        case "CURRENT_CONVERSATION_ID_SET":
            return commitCurrentConversationId(state, action.data);

        default:
            return state;
    }
}