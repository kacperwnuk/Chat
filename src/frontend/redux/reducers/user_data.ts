import {Action, makeAction} from "../actions";
import AppData from "../AppData";
import {call, put, select} from "redux-saga/effects";
import Session from "../../lib/Session";
import {sessionSelector, useIsSessionReady} from "./session";
import DatabaseT from "../../../share/DatabaseT";
import {useDispatch, useSelector} from "react-redux";

export function userDataSelector(state: AppData.State, user_id: string): DatabaseT.User | null {
    return state?.user_data_dictionary?.[user_id] ?? null;
}

export function useUserData(user_id: string) {
    const is_session_ready = useIsSessionReady();
    const dispatch = useDispatch();
    const user_data = useSelector((state: AppData.State) => userDataSelector(state, user_id));

    if (is_session_ready && user_data === null) {
        dispatch(makeAction("USER_DATA_REQUEST", user_id));
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
    try {
        const session: Session | null = yield select(sessionSelector);

        if (!session) {
            return;
        }

        const user_data = yield call(
            () => session.message("getUserData", action.data)
        );

        yield put(
            makeAction("USER_DATA_SET", user_data)
        );
    } catch (error) {
    }
}