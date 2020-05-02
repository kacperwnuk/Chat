import React from "react";
import getUserDisplayName from "../../share/data-malipulation/getUserDisplayName";
import DatabaseT from "../../share/DatabaseT";

export default function UserDisplay(props: {
    user: DatabaseT.User | null | undefined
}) {
    let display = "---";

    if (props.user) {
        display = getUserDisplayName(props.user);
    }

    return <span>{display}</span>
}