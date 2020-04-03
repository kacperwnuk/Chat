import type AppData from "../AppData";
import type DatabaseT from "../../../share/DatabaseT";
import {MessagePrototypeData} from "../../../share/types";
import {Action, makeAction} from "../actions";
import Session from "../../lib/Session";
import {call, put, select} from "redux-saga/effects";
import {sessionSelector} from "./session";
import {NotificationLevel} from "../../../share/logger";
import {useSelector} from "react-redux";

export function messagesByConversationIdSelector(state: AppData.State, conversation_id: string) {
    return state.message_dictionary?.[conversation_id] ?? [];
}

export function useMessagesByConversationId(conversation_id: string) {
    return useSelector((state: AppData.State) => messagesByConversationIdSelector(state, conversation_id));
}

export function commitMessageAdd(state: AppData.State, new_message: DatabaseT.Message): AppData.State {
    let message_dictionary = state.message_dictionary ?? {};

    let message_list = message_dictionary[new_message.conversation_id] ?? [];

    //TODO zmienić dodawanie tak aby było posortowane
    message_list = [...message_list, new_message];

    return {
        ...state,
        message_dictionary: {
            ...message_dictionary,
            [new_message.conversation_id]: message_list
        }
    };
}

export function* fetchMessagesSaga(action: Action<"MESSAGE_SEND_REQUEST">) {
    try {
        const session: Session | null = yield select(sessionSelector);

        if (!session) {
            yield put(makeMessageSendFailAction("session is null"));
            return;
        }

        const message = yield call(
            () => session.message("sendMessage", action.data)
        );

        yield put(makeAction("MESSAGE_ADD2DIC", message));
    } catch (e) {

        yield put(makeMessageSendFailAction(e));
    }
}

export function makeSendMessageAction(message_prototype: MessagePrototypeData) {
    return makeAction("MESSAGE_SEND_REQUEST", message_prototype)
}

export function makeRequestMessageAction() {

}

export function makeMessageSendFailAction(data: any) {
    return makeAction("NOTIFICATION_ADD", {
        content: "error_msg.message_send_fail",
        level: NotificationLevel.Error,
        data
    })
}