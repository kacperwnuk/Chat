import DatabaseT from "./DatabaseT";
import {MessagePrototypeData, SessionAuthData} from "./types";
import AppData from "../frontend/redux/AppData";


/**
 * Api REST serwera autoryzacji
 */
export interface AuthMessagingSchema {
    "auth": (login_data: BasicLoginData) => AppData.CredentialsData
}

/**
 * Komunikaty wysłane przez klienta
 */
export interface SessionMessagingSchemaByClient {
    "authSession": (session: SessionAuthData) => boolean

    "getMessage": (id: string) => DatabaseT.Message
    "sendMessage": (message: MessagePrototypeData) => DatabaseT.Message

    "getMyContacts": () => string[]
    "getUserData": (user_id: string) => DatabaseT.User
    "makeNewContact": (user_id: string) => void
}

/**
 * Komunikaty wysłane przez serwer
 */
export interface SessionMessagingSchemaByServer {
    "newMessage": (message: DatabaseT.Message) => void
    "newContact": (user_id: string) => void
}

/**
 * Wszystkie komunikaty muszą być zwracać taki obiekt, który odpowiada za informowanie o błędach
 */
export interface SocketMiddlewareReturn<T = any> {
    error?: any,
    data?: T
}

export interface BasicLoginData {
    username: string
    password: string
}