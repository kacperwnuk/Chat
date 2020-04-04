import React from "react";
import PropTypes from "prop-types";
import getUserDisplayName from "../../share/data-malipulation/getUserDisplayName";

export default function UserDisplay({user}) {
    let display = "---";

    if (user) {
        display = getUserDisplayName(user);
    }

    return <span>{display}</span>
}

PropTypes.propTypes = {
    user: PropTypes.object
};