import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";
import React from "react";

export default function (props: {
    children: React.ReactNode
    to: string
}) {
    return <Link component={RouterLink} to={props.to}>
        {props.children}
    </Link>
}