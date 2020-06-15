import React from "react";
import {useParams} from "react-router";
import Profile from "../components/Profile";

export default function () {
    const params = useParams<{ user_id: string }>();

    return <Profile userId={params.user_id}/>
}