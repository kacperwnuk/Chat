import React from "react";
import PropTypes from 'prop-types';
import Avatar from "@material-ui/core/Avatar";

export default function UserAvatar({userID, ...props}) {
    // if (!userID)
    userID = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp";

    return <Avatar src={userID} {...props}/>
}

UserAvatar.propTypes = {
    userID: PropTypes.string
};