import type AppData from "../AppData";
import type DatabaseT from "../../../share/DatabaseT";
import {MessagePrototypeData} from "../../../share/types";
import {Action, makeAction} from "../actions";
import Session from "../../lib/Session";
import {call, put, select} from "redux-saga/effects";
import {sessionSelector} from "./session";
import {NotificationLevel} from "../../../share/logger";
import {useSelector} from "react-redux";
import {credentialsSelector} from "./credentials_data";

export function messagesByConversationIdSelector(state: AppData.State, conversation_id: string) {
    return state.message_dictionary?.[conversation_id] ?? [];
}

export function useMessagesByConversationId(conversation_id: string) {
    return useSelector((state: AppData.State) => messagesByConversationIdSelector(state, conversation_id));
}

export function commitMessageAdd(state: AppData.State, new_message: DatabaseT.Message): AppData.State {
    let logged_user_id = credentialsSelector(state)?.user?.user_id ?? null;
    let message_dictionary = state.message_dictionary ?? {};

    let conversation_id = new_message.conversation_id;
    if (conversation_id === logged_user_id) {
        conversation_id = new_message.from_user_id;
    }

    let message_list = message_dictionary[conversation_id] ?? [];

    //TODO zmienić dodawanie tak aby było posortowane
    message_list = [...message_list, new_message];

    return {
        ...state,
        message_dictionary: {
            ...message_dictionary,
            [conversation_id]: message_list
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
            () => session.emit("sendMessage", action.data)
        );

        yield put(makeAction("MESSAGE_ADD2DIC", message));
    } catch (e) {

        yield put(makeMessageSendFailAction(e));
    }
}

export function commitHistoricalMessages(state: AppData.State, messages: DatabaseT.Message[]): AppData.State {
    let logged_user_id = credentialsSelector(state)?.user?.user_id ?? null;

    let message_dictionary = state.message_dictionary ?? {};

    if(messages.length != 0){
        let conversation_id = messages[0].conversation_id;

        if (conversation_id === logged_user_id) {
            conversation_id = messages[0].from_user_id;
        }

        let message_list = message_dictionary[conversation_id] ?? [];

        message_list = [...messages.reverse(), ...message_list];

        return {
            ...state,
            message_dictionary: {
                ...message_dictionary,
                [conversation_id]: message_list
            }
        };
    }

    return {
        ...state,
    };

}

export function* fetchHistoricalMessagesSaga(action: Action<"HISTORICAL_DATA_REQUEST">) {
    try {
        const session: Session | null = yield select(sessionSelector);

        if (!session) {
            yield put(makeMessageSendFailAction("session is null"));
            return;
        }

        const messages = yield call(
            () => session.emit("getHistoricalData", action.data.conversation_id, action.data.offset)
        );

        yield put(makeAction("HISTORICAL_DATA_SET", messages));
    } catch (e) {
        console.log(e);
        yield put(makeMessageSendFailAction(e));
    }
}



export function makeSendMessageAction(message_prototype: MessagePrototypeData) {
    return makeAction("MESSAGE_SEND_REQUEST", message_prototype)
}

export function makeGetHistoricalDataAction(conversation_id: string, offset: number){
    return makeAction("HISTORICAL_DATA_REQUEST", {conversation_id, offset});
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