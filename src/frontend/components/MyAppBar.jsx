import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChatIcon from '@material-ui/icons/Chat';
import {makeStyles} from "@material-ui/core/styles";
import useTranslate from "../hooks/useTranslate";
import UserAvatar from "./UserAvatar";

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function (props) {
    const classes = useStyles();
    const translate = useTranslate();

    return <div>

        <AppBar position="relative">
            <Toolbar>
                <ChatIcon className={classes.icon}/>
                <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                    {translate("app.name")}
                </Typography>
                <UserAvatar/>
            </Toolbar>
        </AppBar>
    </div>
}