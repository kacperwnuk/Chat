import DatabaseT from "../../share/database";

declare namespace AppData {

    interface State {
        user: DatabaseT.UserT | null
        session: DatabaseT.SessionT | null
        backendData: BackendData
    }

    interface BackendData {
        sessionUrl: string
        authUrl: string
        cdnUrl: string
    }
}

export default AppData;