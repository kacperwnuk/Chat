import type DatabaseT from "./DatabaseT";
import type {HumanGender, MessagePrototypeData, SessionAuthData} from "./types";
import type AppData from "../frontend/redux/AppData";


/**
 * Api REST serwera autoryzacji
 */
export interface AuthMessagingSchema {
    "auth": (login_data: BasicLoginData) => AppData.CredentialsData
    "registration": (registration_data: RegistrationData) => AppData.CredentialsData | null
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
    "getHistoricalData": (conversation_id: string, offset: number) => DatabaseT.Message[]
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

export interface HistoricalMessagesData {
    conversation_id: string
    offset: number
}

export interface RegistrationData {
    username: string
    password: string
    email: string
    gender: HumanGender
    name_family: string
    name_given: string
    name_middle: string
    name_prefix: string
    name_suffix: string
    address: string
}