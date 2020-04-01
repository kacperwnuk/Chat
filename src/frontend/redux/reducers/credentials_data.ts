import {useSelector} from "react-redux";
import HttpStatus from "http-status-codes";
import {Action, Actions, makeAction} from "../actions";
import AppError, {AppErrorType} from "../../lib/AppError";
import {backendDataSelector} from "./backend_data";
import {select, call, put} from "redux-saga/effects";
import type AppData from "../AppData";
import type {LoadingObject} from "../AppData";
import type AuthMessagingSchema from "../../../share/AuthMessagingSchema";


function credentialsSelector(store: AppData.State): AppData.CredentialsData | null {
    return store.credentials_data?.data ?? null;
}

function credentialsErrorSelector(store: AppData.State): AppError | null {
    return store.credentials_data?.error ?? null;
}


export function commitCredentials(state: AppData.State, data: LoadingObject<AppData.CredentialsData>): AppData.State {
    return {
        ...state,
        credentials_data: data
    }
}

export function useCredentials() {
    return useSelector(credentialsSelector);
}

export function useCredentialsError() {
    return useSelector(credentialsErrorSelector);
}

async function credentialsAuthentication(
    auth_url: string,
    username: string,
    password: string
): Promise<AuthMessagingSchema.auth> {

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
        throw new AppError(AppErrorType.CONNECTION);
    }

    if (response.status === HttpStatus.OK)
        return response.json();

    switch (response.status) {
        case HttpStatus.UNAUTHORIZED:
            throw new AppError(AppErrorType.ACCESS_DENIED);

        case HttpStatus.BAD_REQUEST:
        default:
            throw new AppError(AppErrorType.FATAL);
    }
}

export function* fetchCredentialsDataSaga(action: Action<"CREDENTIALS_DATA_REQUEST">) {
    try {
        const backend_data = yield select(backendDataSelector);

        const credential_data: AppData.CredentialsData = yield call(
            credentialsAuthentication,
            backend_data.auth_url,
            action.data.username,
            action.data.password
        );

        yield put(
            makeAction("CREDENTIALS_DATA_SET", {data: credential_data})
        );
    } catch (error) {
        yield put(
            makeAction("CREDENTIALS_DATA_SET", {error})
        );
    }
}

export function makeCredentialsDataRequestAction(username: string, password: string) {
    return makeAction("CREDENTIALS_DATA_REQUEST", {
        username, password
    })
}
