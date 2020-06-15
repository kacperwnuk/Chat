import React, {useState} from "react";
import Conversation from "../components/Conversation";
import {useParams} from "react-router";

export default function ConversationPage() {
    const params = useParams<{ user_id: string }>();

    return <Conversation conversationId={params.user_id}/>

}
