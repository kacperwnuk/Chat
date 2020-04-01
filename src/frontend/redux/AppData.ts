import DatabaseT from "../../share/DatabaseT";
import {Dictionary, SessionAuthData} from "../../share/types";
import AppError from "../lib/AppError";

declare namespace AppData {

    interface State {
        credentials_data?: LoadingObject<CredentialsData>
        backend_data: BackendData
        // session_state: SessionState | null
        contact_list?: ContactList
        message_dictionary?: Dictionary<DatabaseT.Message>
        user_dictionary?: Dictionary<DatabaseT.User>
        unread_messages?: Dictionary<DatabaseT.Message>
    }

    interface CredentialsData {
        user: DatabaseT.User | null
        auth_data: SessionAuthData | null
    }

    interface BackendData {
        session_url: string
        auth_url: string
        cdn_url: string
    }

    type ContactList = string[]
}

export type LoadingObject<T> = { error?: AppError, data?: T };

export default AppData;