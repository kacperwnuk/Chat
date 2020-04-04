import type AppData from "./AppData";
import type {Action, Actions} from "./actions";
import {commitCredentials} from "./reducers/credentials_data";
import {commitSession} from "./reducers/session";
import {commitContactList} from "./reducers/contact_list";
import {commitUserData} from "./reducers/user_data";
import {commitCurrentConversationId} from "./reducers/current_conversationt";
import {commitMessageAdd} from "./reducers/messages";
import {commitNotificationAdd, commitNotificationRemove} from "./reducers/notifications";

const initial_state: AppData.State = {
    // credentials_data: {
    //     data: {
    //         "user": {
    //             "user_id": "2e655285-63c3-4ca5-b27d-0c74e7a40b87",
    //             "username": "a.jedrzejowski",
    //             "email": "email1@example.com",
    //             "gender": "male",
    //             "law_type": "pl",
    //             "name_family": "Jędrzejowski",
    //             "name_given": "Adam",
    //             "name_middle": null,
    //             "name_prefix": null,
    //             "name_suffix": null,
    //             "address": "ul. Wyzwolenia 68",
    //             "address_data": {},
    //             "deleted": false
    //         },
    //         "auth_data": {
    //             "session_id": "538ec861-f3dc-40a7-a9f5-cd2d3e868629",
    //             "secret_key": "126158c3-a0ac-4378-acbf-d441d20fa211"
    //         }
    //     }
    // },
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
        case "MESSAGE_ADD2DIC":
            return commitMessageAdd(state, action.data);
        case "NOTIFICATION_ADD":
            return commitNotificationAdd(state, action.data);
        case "NOTIFICATION_REMOVE":
            return commitNotificationRemove(state, action.data);

        default:
            return state;
    }
}