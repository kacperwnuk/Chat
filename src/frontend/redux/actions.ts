import type {BasicLoginData} from "../../share/types";
import type AppData from "./AppData";
import type {LoadingObject} from "./AppData";

export interface Actions {
    CREDENTIALS_DATA_REQUEST: BasicLoginData
    CREDENTIALS_DATA_SET: LoadingObject<AppData.CredentialsData>;

    CONTACT_LIST_REQUEST: void
    CONTACT_LIST_SET: AppData.ContactList
}

export interface Action<T extends keyof Actions = any> {
    type: T
    data: Actions[T]
}

export function makeAction<T extends keyof Actions>(name: T, data: Actions[T]): Action<T> {
    return {type: name, data};
}

