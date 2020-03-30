import {takeLeading} from "redux-saga/effects";
import {CREDENTIALS_DATA_REQUEST} from "./actions";
import {fetchCredentialsDataSaga} from "./reducers/credentials_data";

export default function* mySaga() {
    yield takeLeading(CREDENTIALS_DATA_REQUEST, fetchCredentialsDataSaga);
}