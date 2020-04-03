import React from "react";
import PropTypes from 'prop-types';
import Avatar from "@material-ui/core/Avatar";

export default function UserAvatar({userId, ...props}) {
    // if (!userId)
    userId = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp";

    return <Avatar src={userId} {...props}/>
}

UserAvatar.propTypes = {
    userId: PropTypes.string
};