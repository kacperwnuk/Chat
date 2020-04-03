import React from "react";
import PropTypes from 'prop-types';
import UserAvatar from "./UserAvatar";
import {useUserData} from "../redux/reducers/user_data";
import {useDispatch} from "react-redux";
import {makeCurrentConversationIdChangeAction} from "../redux/reducers/current_conversationt";
import getUserDisplayName from "../../share/data-malipulation/getUserDisplayName";

export default function ContactRow({userId}) {
    const dispatch = useDispatch();
    const user_data = useUserData(userId);

    if (user_data === null)
        return <>Ładownaie</>;

    let display_name = getUserDisplayName(user_data);

    function handleClick() {
        dispatch(makeCurrentConversationIdChangeAction(userId))
    }

    return <div onClick={handleClick}>
        <UserAvatar userId={user_data.user_id}/>
        <div>{display_name}</div>
        <div>{userId}</div>
    </div>
}

ContactRow.propTypes = {
    userId: PropTypes.string.isRequired
};