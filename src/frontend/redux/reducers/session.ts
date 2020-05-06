import type AppData from "../AppData";
import Session from "../../lib/Session";
import {useSelector} from "react-redux";
import {select} from "redux-saga/effects";

export function sessionReadySelector(state: AppData.State) {
    return state?.session instanceof Session;
}

export function sessionSelector(state: AppData.State): Session | null {
    return state?.session ?? null;
}

export function useSession() {
    return useSelector(sessionSelector) ?? null;
}

export function useIsSessionReady() {
    return useSelector(sessionReadySelector) ?? null;
}

export function commitSession(state: AppData.State, session: Session | null): AppData.State {
    return {...state, session}
}


