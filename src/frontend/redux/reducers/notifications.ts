import type AppData from "../AppData";
import {useSelector} from "react-redux";
import areArraysSame from "../../../share/lib/areArraysSame";

export function notificationSelector(state: AppData.State, notification_id: string): AppData.Notification | null {
    return state?.notification_dictionary?.[notification_id] ?? null;
}

export function useNotification(notification_id: string) {
    return useSelector((state: AppData.State) => notificationSelector(state, notification_id));
}

export function useAllNotificationsIds() {
    return useSelector((state: AppData.State) => Object.keys(state.notification_dictionary ?? {}), areArraysSame);
}

export function commitNotificationAdd(state: AppData.State, notification: AppData.Notification): AppData.State {
    let notification_dictionary = state.notification_dictionary ?? {};
    let next_notification_id = state.next_notification_id ?? 0;

    notification_dictionary = {
        ...notification_dictionary,
        [next_notification_id.toString()]: notification
    };

    return {
        ...state,
        notification_dictionary,
        next_notification_id: ++next_notification_id
    }
}

export function commitNotificationRemove(state: AppData.State, notification_id: string): AppData.State {
    let notification_dictionary = state.notification_dictionary ?? {};

    notification_dictionary = {...notification_dictionary};
    delete notification_dictionary[notification_id];

    return {
        ...state,
        notification_dictionary
    }
}