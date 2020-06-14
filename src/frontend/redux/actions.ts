import type {MessagePrototypeData, UserStatus} from "../../share/types";
import type AppData from "./AppData";
import type {LoadingObject} from "./AppData";
import type Session from "../lib/Session";
import type DatabaseT from "../../share/DatabaseT";
import type {BasicLoginData, HistoricalMessagesData, RegistrationData} from "../../share/MessagingSchema";

export interface Actions {
    REGISTRATION_REQUEST: RegistrationData
    REGISTRATION_STATE_SET: AppData.RegistrationState

    CREDENTIALS_DATA_REQUEST: BasicLoginData
    CREDENTIALS_DATA_SET: LoadingObject<AppData.CredentialsData>

    SESSION_SET: Session | null

    CONTACT_LIST_REQUEST: void
    CONTACT_LIST_SET: AppData.ContactList

    USER_STATUS_REQUEST: string
    USER_STATUS_SET: UserStatus

    USER_DATA_REQUEST: string
    USER_DATA_SET: DatabaseT.User

    CURRENT_CONVERSATION_ID_SET: string

    MESSAGE_SEND_REQUEST: MessagePrototypeData
    MESSAGE_LIST_REQUEST: {}
    MESSAGE_ADD2DIC: DatabaseT.Message

    HISTORICAL_DATA_REQUEST: HistoricalMessagesData
    HISTORICAL_DATA_SET: DatabaseT.Message[]

    NOTIFICATION_ADD: Partial<AppData.Notification>
    NOTIFICATION_REMOVE: string
}

export interface Action<T extends keyof Actions = any> {
    type: T
    data: Actions[T]
}

export function makeAction<T extends keyof Actions>(name: T, data: Actions[T]): Action<T> {
    return {type: name, data};
}

