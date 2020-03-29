import Avatar from "@material-ui/core/Avatar";
import React from "react";

export default function ({userID, ...props}) {
    if (!userID)
        userID = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp";

    return <Avatar src={userID} {...props}/>
}
