import React from "react";
import UserAvatar from "./UserAvatar";
import {useUserData} from "../redux/reducers/user_data";
import UserDisplay from "./UserDisplay";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useUserStatus} from "../redux/reducers/user_status";
import AppLink from "./AppLink";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

const useStyle = makeStyles(theme => ({

}), {name: "ContactRow"});


export default function ContactRow(props: {
    userId: string
    selected: boolean
}) {
    const classes = useStyle();
    const user_data = useUserData(props.userId);
    const user_status = useUserStatus(props.userId)


    return <AppLink to={`/conversation/${props.userId}`}>
        <ListItem selected={props.selected}>
            <ListItemAvatar>
                <UserAvatar user={user_data}/>
            </ListItemAvatar>
            <ListItemText
                primaryTypographyProps={{
                    color: "textPrimary"
                }}
                primary={<UserDisplay user={user_data}/>}
                secondary={user_status?.status}
            />
        </ListItem>
    </AppLink>
}

