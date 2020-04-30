import React from "react";
import UserAvatar from "./UserAvatar";
import {useUserData} from "../redux/reducers/user_data";
import {useDispatch} from "react-redux";
import {makeCurrentConversationIdChangeAction} from "../redux/reducers/current_conversationt";
import UserDisplay from "./UserDisplay";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";


const useStyle = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "row",
        padding: theme.spacing(0.5),
        alignItems: "center"
    },
    title: {},
    subtitle: {},
    avatar: {
        marginRight: theme.spacing(1)
    },
}), {name: "ContactRow"});


export default function ContactRow(props: {
    userId: string
}) {
    const classes = useStyle();
    const dispatch = useDispatch();
    const user_data = useUserData(props.userId);

    function handleClick() {
        dispatch(makeCurrentConversationIdChangeAction(props.userId))
    }

    return <div onClick={handleClick} className={classes.root}>
        <UserAvatar user={user_data} className={classes.avatar}/>
        <div>
            <Typography variant="body1" className={classes.title}>
                <UserDisplay user={user_data}/>
            </Typography>
            <Typography variant="caption" className={classes.subtitle}>
                Pod tytuł
            </Typography>
        </div>
    </div>
}

