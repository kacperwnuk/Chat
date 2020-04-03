import React from "react";
import PropTypes from "prop-types";
import {useMessagesByConversationId} from "../redux/reducers/messages";
import {useUserData} from "../redux/reducers/user_data";
import UserAvatar from "./UserAvatar";
import {Paper} from "@material-ui/core";

/**
 *
 * @param {DatabaseT.Message} message
 */
export default function Message({message}) {

    const user_data = useUserData(message.from_user_id);

    return <div>
        <Paper>
            <UserAvatar userId={message.from_user_id}/>
            <div>
                {message.content}
            </div>
        </Paper>
    </div>
}


Message.propTypes = {
    message: PropTypes.object.isRequired
};