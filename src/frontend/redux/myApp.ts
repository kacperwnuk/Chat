import type AppData from "./AppData";
import type {Action, Actions} from "./actions";
import {commitCredentials} from "./reducers/credentials_data";
import {commitSession} from "./reducers/session";
import {commitContactList} from "./reducers/contact_list";
import {commitUserData} from "./reducers/user_data";
import {commitCurrentConversationId} from "./reducers/current_conversationt";
import {commitHistoricalMessages, commitMessageAdd} from "./reducers/messages";
import {commitNotificationAdd, commitNotificationRemove} from "./reducers/notifications";

const backend_data_default =
    process.env.NODE_ENV === "production" ?
        {   // Produkcja
            cdn_url: "localhost:8080",
            session_url: "localhost:4000",
            auth_url: "localhost:8082",
        } :
        {   // Deweloperka
            cdn_url: "localhost:8080",
            session_url: "localhost:8081",
            auth_url: "localhost:8082",
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