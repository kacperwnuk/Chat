import React from "react";
import PropTypes from 'prop-types';
import Avatar from "@material-ui/core/Avatar";

export default function UserAvatar({user, userId, ...props}) {
    // if (!userId)
    let url = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp";

    return <Avatar src={url} {...props}/>
}

UserAvatar.propTypes = {
    user: PropTypes.object,
    userId: PropTypes.string
};