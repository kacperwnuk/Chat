import type AppData from "../AppData";
import type Session from "../../lib/Session";
import {Action, makeAction} from "../actions";
import {call, put, select} from "redux-saga/effects";
import {backendDataSelector} from "./backend_data";

function contactListSelector(store: AppData.State): AppData.ContactList | null {
    return store.contact_list ?? null
}

function fetchContactList(session: Session) {
    return session.message("getMyContacts")
}

export function* fetchContactListSaga(action: Action<"CONTACT_LIST_REQUEST">) {
    try {
        // const backend_data = yield select(se);
        //
        // const credential_data: AppData.CredentialsData = yield call(
        //     credentialsAuthentication,
        //     backend_data.auth_url,
        //     action.data.username,
        //     action.data.password
        // );
        //
        // yield put(
        //     makeAction("CREDENTIALS_DATA_SET", {data: credential_data})
        // );
    } catch (error) {
        // yield put(
        //     makeAction("CREDENTIALS_DATA_SET", {error})
        // );
    }
}