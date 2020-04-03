import React from "react";
import PropTypes from 'prop-types';
import {useUserData} from "../redux/reducers/user_data";
import {Paper} from "@material-ui/core";
import getUserDisplayName from "../../share/data-malipulation/getUserDisplayName";
import UserAvatar from "./UserAvatar";
import MessageComposer from "./MessageComposer";
import MessageList from "./MessageList";

export default function Conversation({
                                         display = true,
                                         conversationId
                                     }) {


    // z uwagi na to, że id konwersacji jest tożsame z id użytkownika ...
    const user_data = useUserData(conversationId);


    return <div style={{display: display ? "block" : "none"}}>
        <Paper>
            <UserAvatar userId={user_data.user_id}/>
            {getUserDisplayName(user_data)}
        </Paper>
        <MessageList conversationId={conversationId}/>
        <MessageComposer conversationId={conversationId}/>
    </div>
}

Conversation.propTypes = {
    display: PropTypes.bool.isRequired,
    conversationId: PropTypes.string.isRequired
};

