import type DatabaseT from "./DatabaseT";
import type {MessagePrototypeData, SessionAuthData} from "./types";

export interface SessionMessagingSchemaByClient {
    "authSession": (session: SessionAuthData) => boolean

    "getMessage": (id: string) => DatabaseT.Message
    "sendMessage": (message: MessagePrototypeData) => DatabaseT.Message

    "getMyContacts": () => string[]
    "getUserData": (user_id: string) => DatabaseT.Message
    "makeNewContact": (user_id: string) => void
}

export interface SessionMessagingSchemaByServer {
    "newMessage": (message: DatabaseT.Message) => void
    "newContact": (user_id: string) => void
}