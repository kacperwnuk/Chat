import {
    takeLeading as takeLeadingSaga,
    takeEvery as takeEverySaga
} from "redux-saga/effects";
import type {Action, Actions} from "./actions";
import {fetchCredentialsDataSaga} from "./reducers/credentials_data";
import {fetchContactListSaga} from "./reducers/contact_list";
import {fetchUserDataSaga} from "./reducers/user_data";
import {fetchHistoricalMessagesSaga, fetchMessagesSaga} from "./reducers/messages";
import {fetchRegistrationSaga} from "./reducers/registration";

// otypowanie
const takeLeading = <Key extends keyof Actions>(name: Key, f: (action: Action<Key>) => any) => takeLeadingSaga(name, f);
const takeEvery = <Key extends keyof Actions>(name: Key, f: (action: Action<Key>) => any) => takeEverySaga(name, f);

export default function* mySaga() {
    yield takeLeading("CREDENTIALS_DATA_REQUEST", fetchCredentialsDataSaga);
    yield takeLeading("CONTACT_LIST_REQUEST", fetchContactListSaga);
    yield takeLeading("HISTORICAL_DATA_REQUEST", fetchHistoricalMessagesSaga);
    yield takeLeading("REGISTRATION_REQUEST", fetchRegistrationSaga);
    yield takeEvery("USER_DATA_REQUEST", fetchUserDataSaga);
    yield takeEvery("MESSAGE_SEND_REQUEST", fetchMessagesSaga);
}