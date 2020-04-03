import React from "react";
import MessageComposer from "./MessageComposer";
import {useCurrentConversationId} from "../redux/reducers/current_conversationt";

export default function () {

    const current_conversation_id = useCurrentConversationId();
    const [conversation_list, setConversationList] = React.useState([]);

    function addConversation(conversation_id) {

    }

    console.log("current_conversation_id", current_conversation_id);


    return <div>
        <div>Rozmowy</div>
        <MessageComposer/>
    </div>
}