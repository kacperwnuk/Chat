import type DatabaseT from "../../../share/DatabaseT";
import type AppData from "../AppData";
import {Action, makeAction} from "../actions";
import {call, put, select} from "redux-saga/effects";
import Session from "../../lib/Session";
import {sessionSelector, useIsSessionReady} from "./session";
import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";

export function userDataSelector(state: AppData.State, user_id: string): DatabaseT.User | null {
    return state?.user_data_dictionary?.[user_id] ?? null;
}

export function useUserData(user_id: string) {
    const is_session_ready = useIsSessionReady();
    const dispatch = useAppDispatch();
    const user_data = useAppSelector(state => userDataSelector(state, user_id));

    if (is_session_ready && user_data === null) {
        dispatch("USER_DATA_REQUEST", user_id);
    }

    return user_data;
}

export function commitUserData(state: AppData.State, user_data: DatabaseT.User): AppData.State {
    let user_data_dictionary = state.user_data_dictionary ?? {};

    user_data_dictionary = {
        ...user_data_dictionary,
        [user_data.user_id]: user_data
    };

    return {...state, user_data_dictionary}
}

export function* fetchUserDataSaga(action: Action<"USER_DATA_REQUEST">) {
    const session: Session | null = yield select(sessionSelector);

    if (!session) {
        return;
    }

    const user_data = yield call(
        () => session.emit("getUserData", action.data)
    );

    yield put(
        makeAction("USER_DATA_SET", user_data)
    );
}