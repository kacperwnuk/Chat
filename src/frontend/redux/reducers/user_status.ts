import type DatabaseT from "../../../share/DatabaseT";
import type AppData from "../AppData";
import {Action, makeAction} from "../actions";
import {call, put, select} from "redux-saga/effects";
import Session from "../../lib/Session";
import {sessionSelector, useIsSessionReady} from "./session";
import {useDispatch, useSelector} from "react-redux";
import { UserStatus } from "../../../share/types";

export function userStatusSelector(state: AppData.State, user_id: string): UserStatus | null {
    return state?.user_status_dictionary?.[user_id] ?? null;
}

export function useUserStatus(user_id: string) {
    const is_session_ready = useIsSessionReady();
    const dispatch = useDispatch();
    const user_status = useSelector((state: AppData.State) => userStatusSelector(state, user_id));

    if (is_session_ready && user_status === null) {
        dispatch(makeAction("USER_STATUS_REQUEST", user_id));
    }

    return user_status;
}

export function commitUserStatus(state: AppData.State, user_status: UserStatus): AppData.State {
    let user_status_dictionary = state.user_status_dictionary ?? {};

    user_status_dictionary = {
        ...user_status_dictionary,
        [user_status.user_id]: user_status
    };

    return {...state, user_status_dictionary}
}

export function* fetchUserStatusSaga(action: Action<"USER_STATUS_REQUEST">) {
    const session: Session | null = yield select(sessionSelector);

    if (!session) {
        return;
    }

    const user_status = yield call(
        () => session.emit("getUserStatus", action.data)
    );

    yield put(
        makeAction("USER_STATUS_SET", user_status)
    );
}