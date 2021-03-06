import React from "react";
import {useAllNotificationsIds, useNotification} from "../redux/reducers/notifications";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import useTranslate from "../hooks/useTranslate";
import {useDispatch} from "react-redux";
import {makeAction} from "../redux/actions";

export default function NotificationContainer() {
    const all_notification_ids = useAllNotificationsIds();

    return <>
        {all_notification_ids.map(notification_id => {
            return <Notification key={notification_id} notificationId={notification_id}/>
        })}
    </>
}

function Notification(props: { notificationId: string }) {
    const notification = useNotification(props.notificationId);
    const translate = useTranslate();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(true);

    function handleClick() {
        setOpen(false);
        dispatch(makeAction("NOTIFICATION_REMOVE", props.notificationId))
    }

    if (!notification) {
        return null;
    }

    return <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClick}>
        <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleClick}
            severity={notification.level}>
            {translate(notification.content)}
        </MuiAlert>
    </Snackbar>
}