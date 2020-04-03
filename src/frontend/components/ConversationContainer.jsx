import React from "react";
import MessageComposer from "./MessageComposer";
import {useCurrentConversationId} from "../redux/reducers/current_conversationt";
import Conversation from "./Conversation";

export default function () {

    const current_conversation_id = useCurrentConversationId();
    const [conversation_id_list, setConversationList] = React.useState([]);

    if (current_conversation_id && !conversation_id_list.includes(current_conversation_id)) {
        setConversationList([...conversation_id_list, current_conversation_id])
    }


    console.log("current_conversation_id", current_conversation_id);
    console.log("conversation_list", conversation_id_list);


    return <div>
        <div>Rozmowy</div>
        {conversation_id_list.map(conversation_id => {
            return <Conversation
                display={conversation_id === current_conversation_id}
                key={conversation_id}
                conversationId={conversation_id}
            />
        })}
    </div>
}