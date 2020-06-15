import {Action, makeAction} from "../actions";
import Session from "../../lib/Session";
import {call, put, select} from "redux-saga/effects";
import {sessionSelector} from "./session";
import {makeMessageSendFailAction} from "./messages";
import AppData from "../AppData";
import useAppSelector from "../../hooks/useAppSelector";
import {NotificationLevel} from "../../../share/logger";
import {backendDataSelector} from "./backend_data";
import fetchAuthServer from "../../lib/fetchAuthServer";

function registrationStateSelector(state: AppData.State) {
    return state.registration_state ?? null;
}

export function useRegistrationState() {
    return useAppSelector(registrationStateSelector);
}

export function commitRegistrationState(state: AppData.State, data: AppData.RegistrationState): AppData.State {
    return {
        ...state,
        registration_state: data
    }
}

export function* fetchRegistrationSaga(action: Action<"REGISTRATION_REQUEST">) {
    try {

        const backend_data: AppData.BackendData = yield select(backendDataSelector);

        const credential_data: AppData.CredentialsData = yield call(
            //@ts-ignore
            fetchAuthServer,
            "registration",
            backend_data,
            action.data
        );

        if (credential_data === null) {
            
            // na szybko ...
            throw new Error();

        } else {
            yield put(
                makeAction("CREDENTIALS_DATA_SET", {data: credential_data})
            );
        }

    } catch (e) {
        console.log(e);

        yield put(makeAction("REGISTRATION_STATE_SET", "error"));

        yield put(makeAction("NOTIFICATION_ADD", {
            content: "error_msg.registration_fail",
            level: NotificationLevel.Error,
        }));
    }
}