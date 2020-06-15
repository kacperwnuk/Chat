import React from "react";
import {useContactList} from "../redux/reducers/contact_list";
import ContactRow from "./ContactRow";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import UserAvatar from "./UserAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import UserDisplay from "./UserDisplay";
import AppLink from "./AppLink";
import {useCredentials} from "../redux/reducers/credentials_data";
import {useLocation} from "react-router";

export default function (props: {}) {
    const contact_list = useContactList();
    const credentials = useCredentials();
    const location = useLocation();

    if (credentials === null) {
        throw new Error();
    }

    return <>
        {contact_list === null ? "Ładowanie ..." : contact_list.map(id => {
            return <ContactRow
                key={id} userId={id}
                selected={location.pathname === `/conversation/${id}`}/>
        })}

        <Divider/>

        <AppLink to={`/profile/${credentials.user.user_id}`}>
            <ListItem selected={`/profile/${credentials.user.user_id}` === location.pathname}>
                <ListItemAvatar>
                    <UserAvatar user={credentials.user}/>
                </ListItemAvatar>
                <ListItemText
                    primaryTypographyProps={{
                        color: "textPrimary"
                    }}
                    primary="Mój profil"
                    secondary={<UserDisplay user={credentials.user}/>}
                />
            </ListItem>
        </AppLink>
    </>
}