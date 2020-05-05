import AppData from "../AppData";
import {makeAction} from "../actions";
import {useSelector} from "react-redux";

export function currentConversationIdSelector(store: AppData.State) {
    return store.current_conversation_id ?? null;
}

export function commitCurrentConversationId(state: AppData.State, current_conversation_id: string): AppData.State {
    return {...state, current_conversation_id}
}

export function useCurrentConversationId() {
    return useSelector(currentConversationIdSelector)
}

export function makeCurrentConversationIdChangeAction(next_current_conversation_id: string) {
    return makeAction("CURRENT_CONVERSATION_ID_SET", next_current_conversation_id);
}