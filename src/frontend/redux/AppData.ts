import type DatabaseT from "../../share/DatabaseT";
import type {Dictionary, SessionAuthData} from "../../share/types";
import type AppError from "../lib/AppError";
import type Session from "../lib/Session";

declare namespace AppData {

    interface State {
        credentials_data?: LoadingObject<CredentialsData>
        backend_data: BackendData
        session?: Session | null
        contact_list?: ContactList
        message_dictionary?: Dictionary<DatabaseT.Message>
        user_data_dictionary?: Dictionary<DatabaseT.User>
        unread_messages?: Dictionary<DatabaseT.Message>
    }

    interface CredentialsData {
        user: DatabaseT.User
        auth_data: SessionAuthData
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