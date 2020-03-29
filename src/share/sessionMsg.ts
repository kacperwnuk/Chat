import DatabaseT from "./database";

interface ClientMsg {
    "authSession": (session: DatabaseT.Session) => boolean

    "getMessage": (id: string) => DatabaseT.Message
    "sendMessage": (message: DatabaseT.Message) => DatabaseT.Message

    "getMyContacts": () => string[]
    "getUserData": (user_id: string) => DatabaseT.Message
    "makeNewContact": (user_id: string) => void
}


interface ServerMsg {
    "newMessage": (message: DatabaseT.Message) => void
    "newContact": (user_id: string) => void
}