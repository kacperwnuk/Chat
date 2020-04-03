import React from "react";
import PropTypes from "prop-types";
import {useMessagesByConversationId} from "../redux/reducers/messages";
import Message from "./Message";

export default function MessageList({
                                        conversationId: conversation_id,
                                        ...props
                                    }) {

    const messages = useMessagesByConversationId(conversation_id);

    return <div ref={(ref) => console.log("ref", ref)}>
        {messages.map(message => {
            return <Message
                key={message.from_user_id + message.message_id}
                message={message}
            />
        })}
    </div>
}


MessageList.propTypes = {
    conversationId: PropTypes.string.isRequired
};