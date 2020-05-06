import React from 'react';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import useTranslate from "../hooks/useTranslate";

export default function () {
    const translate = useTranslate();

    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {translate("copyright.prefix")}
            <Link color="inherit" href="https://material-ui.com/">
                {translate("copyright.name")}
            </Link>{' '}
            {new Date().getFullYear()}
            {translate("copyright.suffix")}
        </Typography>
    );
}