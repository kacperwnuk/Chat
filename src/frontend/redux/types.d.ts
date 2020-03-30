import DatabaseT from "../../share/database";
import {AuthData} from "../../share/types";

declare namespace AppData {

    interface State {
        credentials_data: LoadingObject<CredentialsData>
        backend_data: BackendData
        session_state: SessionState | null
        contact_list: LoadingObject<ContactList>
        message_dictionary: Dictionary<DatabaseT.Message>
        user_dictionary: Dictionary<DatabaseT.User>
        unread_messages: Dictionary<DatabaseT.Message>
    }

    interface CredentialsData {
        user: DatabaseT.User | null
        auth_data: AuthData | null
    }


    interface BackendData {
        session_url: string
        auth_url: string
        cdn_url: string
    }

    type ContactList = string[]
}

type Dictionary<T> = { [key: string]: T }

type LoadingObject<T> = {
    error?: AppError
    data?: T
} | undefined;

export default AppData;