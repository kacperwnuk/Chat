import type AppData from "../AppData";
import type Session from "../../lib/Session";
import {Action, makeAction} from "../actions";
import {call, put, select} from "redux-saga/effects";
import {sessionSelector, useIsSessionReady, useSession} from "./session";
import {useDispatch, useSelector} from "react-redux";

function contactListSelector(store: AppData.State): AppData.ContactList | null {
    return store.contact_list ?? null
}

export function useContactList() {
    const is_session_ready = useIsSessionReady();
    const dispatch = useDispatch();
    const contact_list = useSelector(contactListSelector);

    if (is_session_ready && contact_list === null) {
        dispatch(makeAction("CONTACT_LIST_REQUEST", undefined));
    }

    return contact_list;
}

export function* fetchContactListSaga(action: Action<"CONTACT_LIST_REQUEST">) {
    try {
        const session: Session | null = yield select(sessionSelector);

        if (!session) {
            return;
        }

        const contact_list = yield call(
            () => session.emit("getMyContacts")
        );

        console.log("saga contact");

        yield put(
            makeAction("CONTACT_LIST_SET", contact_list)
        );
    } catch (error) {
    }
}

export function commitContactList(state: AppData.State, contact_list: AppData.ContactList): AppData.State {
    return {...state, contact_list}
}
