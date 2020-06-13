import type AppData from "../AppData";
import areArraysSame from "../../../share/lib/areArraysSame";
import useAppSelector from "../../hooks/useAppSelector";

export function notificationSelector(state: AppData.State, notification_id: string): AppData.Notification | null {
    return state?.notification_dictionary?.[notification_id] ?? null;
}

export function useNotification(notification_id: string) {
    return useAppSelector(state => notificationSelector(state, notification_id));
}

export function useAllNotificationsIds() {
    return useAppSelector(state => Object.keys(state.notification_dictionary ?? {}), areArraysSame);
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