import {
    takeLeading as takeLeadingSaga
} from "redux-saga/effects";
import {fetchCredentialsDataSaga} from "./reducers/credentials_data";
import type {Action, Actions} from "./actions";

let takeLeading = <Key extends keyof Actions>(name: Key, f: (action: Action<Key>) => any) => takeLeadingSaga(name, f);

export default function* mySaga() {
    yield takeLeading("CREDENTIALS_DATA_REQUEST", fetchCredentialsDataSaga);
}