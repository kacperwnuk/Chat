import type DatabaseT from "./DatabaseT";
import type {BasicLoginData, MessagePrototypeData, SessionAuthData} from "./types";
import type AppData from "../frontend/redux/AppData";

export interface AuthMessagingSchema {
    "auth": (login_data: BasicLoginData) => AppData.CredentialsData
}

export interface SessionMessagingSchemaByClient {
    "authSession": (session: SessionAuthData) => boolean

    "getMessage": (id: string) => DatabaseT.Message
    "sendMessage": (message: MessagePrototypeData) => DatabaseT.Message

    "getMyContacts": () => string[]
    "getUserData": (user_id: string) => DatabaseT.User
    "makeNewContact": (user_id: string) => void
}

export interface SessionMessagingSchemaByServer {
    "newMessage": (message: DatabaseT.Message) => void
    "newContact": (user_id: string) => void
}

export interface SocketMiddlewareReturn<T = any> {
    error?: any,
    data?: T
}