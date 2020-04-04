import React from "react";
import PropTypes from "prop-types";
import {useMessagesByConversationId} from "../redux/reducers/messages";
import {useUserData} from "../redux/reducers/user_data";
import UserAvatar from "./UserAvatar";
import {Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import getUserDisplayName from "../../share/data-malipulation/getUserDisplayName";

/**
 *
 * @param {DatabaseT.Message} message
 */
export default function Message({message}) {

    const user_data = useUserData(message.from_user_id);

    return <div>
        <Paper>
            <UserAvatar userId={message.from_user_id}/>
            <Typography variant="caption">
                {getUserDisplayName(user_data)}
            </Typography>
            <Typography variant="body1">
                {message.content}
            </Typography>
        </Paper>
    </div>
}


Message.propTypes = {
    message: PropTypes.object.isRequired
};