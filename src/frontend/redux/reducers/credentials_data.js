import {useSelector} from "react-redux";
import HttpStatus from "http-status-codes";
import {
    makeAction,
    CREDENTIALS_DATA_SET, CREDENTIALS_DATA_REQUEST
} from "../actions";
import AppError from "../../lib/AppError";
import {backendDataSelector} from "./backend_data";
import {select, call, put} from "redux-saga/effects";


/**
 *
 * @param {AppData.State} store
 * @return {AppData.CredentialsData|null}
 */
function credentialsSelector(store) {
    return store.credentials_data?.data ?? null;
}

/**
 *
 * @param {AppData.State} store
 * @return {AppError|null}
 */
function credentialsErrorSelector(store) {
    return store.credentials_data?.error ?? null;
}


/**
 * @param {AppData.State} state
 * @param {LoadingObject<AppData.CredentialsData>} data
 * @return {AppData.State}
 */
export function commitCredentials(state, data) {
    return {
        ...state,
        credentials_data: data
    }
}

/**
 *
 * @return {AppData.CredentialsData}
 */
export function useCredentials() {
    let user_data = useSelector(credentialsSelector);

    return user_data ?? null;
}

/**
 *
 * @return {AppError|null}
 */
export function useCredentialsError() {
    let session_data = useSelector(credentialsErrorSelector);

    return session_data ?? null;
}

/**
 *
 * @param {string} auth_url
 * @param {string} username
 * @param {string} password
 * @return {Promise<ResponseT.AuthS.auth>}
 */
async function credentialsAuthentication(auth_url, username, password) {

    let response = await fetch(`http://${auth_url}/auth`, {
        method: "POST",
        headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json"
        }),
        cache: "no-cache",
        body: JSON.stringify({
            username,
            password
        }),
    });

    try {
        response = await response;
    } catch (e) {
        throw new AppError(AppError.Type.CONNECTION);
    }

    if (response.status === HttpStatus.OK)
        return response.json();

    switch (response.status) {
        case HttpStatus.UNAUTHORIZED:
            throw new AppError(AppError.Type.ACCESS_DENIED);

        case HttpStatus.BAD_REQUEST:
        default:
            throw new AppError(AppError.Type.FATAL);
    }
}

/**
 *
 */
export function* fetchCredentialsDataSaga(action) {
    try {
        const backend_data = yield select(backendDataSelector);

        const credential_data = yield call(
            credentialsAuthentication,
            backend_data.auth_url,
            action.data.username,
            action.data.password
        );

        yield put(
            makeAction(CREDENTIALS_DATA_SET, {data: credential_data})
        );
    } catch (error) {
        yield put(
            makeAction(CREDENTIALS_DATA_SET, {error})
        );
    }
}

export function makeCredentialsDataRequestAction(username, password) {
    return makeAction(CREDENTIALS_DATA_REQUEST, {
        username, password
    })
}
