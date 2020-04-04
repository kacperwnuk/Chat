import {useSelector} from "react-redux";
import {Action, makeAction} from "../actions";
import type AppError from "../../lib/AppError";
import {backendDataSelector} from "./backend_data";
import {select, call, put} from "redux-saga/effects";
import type AppData from "../AppData";
import type {LoadingObject} from "../AppData";
import fetchAuth from "../../lib/fetchAuth";


export function credentialsSelector(store: AppData.State): AppData.CredentialsData | null {
    return store.credentials_data?.data ?? null;
}

export function credentialsErrorSelector(store: AppData.State): AppError | null {
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

export function* fetchCredentialsDataSaga(action: Action<"CREDENTIALS_DATA_REQUEST">) {
    try {
        const backend_data: AppData.BackendData = yield select(backendDataSelector);

        const credential_data: AppData.CredentialsData = yield call(
            fetchAuth,
            "auth",
            backend_data,
            action.data
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
