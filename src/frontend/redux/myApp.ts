import type AppData from "./AppData";
import type {Action, Actions} from "./actions";
import {commitCredentials} from "./reducers/credentials_data";
import {commitSession} from "./reducers/session";
import {commitContactList} from "./reducers/contact_list";
import {commitUserData} from "./reducers/user_data";
import {commitCurrentConversationId} from "./reducers/current_conversationt";
import {commitHistoricalMessages, commitMessageAdd} from "./reducers/messages";
import {commitNotificationAdd, commitNotificationRemove} from "./reducers/notifications";
import front_env from "../lib/front_env";

const backend_data_default = {
    cdn_url: front_env.RSO_CDN,
    session_url: front_env.RSO_SESSION,
    auth_url: front_env.RSO_AUTH
};

const initial_state: AppData.State = {
    backend_data: backend_data_default
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
        case "CURRENT_CONVERSATION_ID_SET":
            return commitCurrentConversationId(state, action.data);
        case "MESSAGE_ADD2DIC":
            return commitMessageAdd(state, action.data);
        case "HISTORICAL_DATA_SET":
            return commitHistoricalMessages(state, action.data);
        case "NOTIFICATION_ADD":
            return commitNotificationAdd(state, action.data);
        case "NOTIFICATION_REMOVE":
            return commitNotificationRemove(state, action.data);

        default:
            return state;
    }
}