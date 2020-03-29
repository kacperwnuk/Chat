import DatabaseT from "../../share/database";
import {AuthData} from "../../share/types";

declare namespace AppData {

    interface State {
        user: DatabaseT.UserT | null
        auth_data: AuthData | null
        backend_data: BackendData
        session_state: SessionState | null
    }

    interface BackendData {
        session_url: string
        auth_url: string
        cdn_url: string
    }
}

interface LoadingObject<T> {
    state: "loading" | "loaded" | "error"
    error?: object
    data?: T
}

export default AppData;