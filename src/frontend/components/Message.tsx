import React from "react";
import {useUserData} from "../redux/reducers/user_data";
import UserAvatar from "./UserAvatar";
import {Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import UserDisplay from "./UserDisplay";
import mergeClassNames from "../lib/mergeClassNames";
import {useCredentials} from "../redux/reducers/credentials_data";
import type DatabaseT from "../../share/DatabaseT";
import AppError, {AppErrorType} from "../lib/AppError";

const useStyle = makeStyles(theme => ({
    root: {
        display: "flex",
    },
    root_left: {
        flexDirection: "row"
    },
    root_right: {
        flexDirection: "row-reverse"
    },
    body: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        padding: theme.spacing(1),
        width: "fit-content",
    },
    body_right: {
        alignItems: "flex-end",
        paddingRight: theme.spacing(5),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
    body_left: {
        paddingLeft: theme.spacing(5),
    },
    avatar: {
        position: "absolute",
        top: theme.spacing(1.75),
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    avatar_right: {
        right: theme.spacing(1),
    },
    avatar_left: {
        left: theme.spacing(1),
    }
}), {name: "Message"});


export default function Message(props: {
    message: DatabaseT.Message
}) {
    const classes = useStyle();
    const user_data = useUserData(props.message.from_user_id);
    const credentials = useCredentials();

    if (!credentials) {
        throw new AppError(AppErrorType.FATAL, "no credentials");
    }

    const is_from_logged_user = credentials.user.user_id === props.message.from_user_id;

    if (is_from_logged_user) {

        return <div className={mergeClassNames(classes.root, classes.root_right)}>
            <Paper className={mergeClassNames(classes.body, classes.body_right)}>
                <UserAvatar userId={props.message.from_user_id}
                            className={mergeClassNames(classes.avatar, classes.avatar_right)}/>
                <Typography variant="caption">
                    <UserDisplay user={user_data}/>
                </Typography>
                <Typography variant="body1">
                    {props.message.content}
                </Typography>
            </Paper>
        </div>

    } else {

        return <div className={mergeClassNames(classes.root, classes.root_left)}>
            <Paper className={mergeClassNames(classes.body, classes.body_left)}>
                <UserAvatar userId={props.message.from_user_id}
                            className={mergeClassNames(classes.avatar, classes.avatar_left)}/>
                <Typography variant="caption">
                    <UserDisplay user={user_data}/>
                </Typography>
                <Typography variant="body1">
                    {props.message.content}
                </Typography>
            </Paper>
        </div>

    }
}

