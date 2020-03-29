import DatabaseT from "../../share/database";
import {AuthData} from "../../share/types";

declare namespace AppData {

    interface State {
        user: DatabaseT.User | null
        auth_data: AuthData | null
        backend_data: BackendData
        session_state: SessionState | null
        contact_list: LoadingObject<ContactList>
    }

    interface BackendData {
        session_url: string
        auth_url: string
        cdn_url: string
    }

    type ContactList = string[]
}

type LoadingObject<T> = {
    state: "loading" | "loaded" | "error"
    error?: object
    data?: T
} | undefined;

export default AppData;