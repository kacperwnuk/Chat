import DatabaseT from "./database";

interface ClientMsg {
    "authSession": (session: DatabaseT.SessionT) => boolean

    "getMessage": (id: string) => DatabaseT.MessageT
    "sendMessage": (message: DatabaseT.MessageT) => DatabaseT.MessageT

    "getContactsId": () => string[]
    "getContact": (contact_id: string) => DatabaseT.MessageT
    "createContact": (contact_id: string) => void
}


interface ServerMsg {
    "newMessage": (message: DatabaseT.MessageT) => void
}