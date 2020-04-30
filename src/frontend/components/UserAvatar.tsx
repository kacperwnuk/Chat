import React from "react";
import Avatar from "@material-ui/core/Avatar";
import DatabaseT from "../../share/DatabaseT";

type UserAvatarProps = {
    user?: DatabaseT.User | null,
    userId?: string | null
} & React.HTMLAttributes<HTMLDivElement>

export default function UserAvatar(props: UserAvatarProps) {
    let url = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp";

    delete props.user;
    delete props.userId;

    return <Avatar src={url} {...props}/>
}
