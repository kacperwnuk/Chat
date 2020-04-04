import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChatIcon from '@material-ui/icons/Chat';
import {makeStyles} from "@material-ui/core/styles";
import useTranslate from "../hooks/useTranslate";
import UserAvatar from "./UserAvatar";
import SessionStatusIcon from "./SessionStatusIcon";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import {useCredentials} from "../redux/reducers/credentials_data";
import UserDisplay from "./UserDisplay";

const useStyles = makeStyles((theme) => ({
    iconLeft: {
        marginRight: theme.spacing(2),
    },
    iconRight: {
        marginLeft: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}), {
    name: "MyAppBar"
});

export default function MyAppBar(props) {
    const classes = useStyles();
    const translate = useTranslate();
    const credentials = useCredentials();


    return <div>

        <Toolbar/>

        <AppBar position="fixed">
            <Toolbar>

                <ChatIcon className={classes.iconLeft}/>

                <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                    {translate("app.name")}
                </Typography>

                <div className={classes.iconRight}>
                    <SessionStatusIcon/>
                </div>

                <div>
                    <UserDisplay user={credentials.user}/>
                </div>

                <div className={classes.iconRight}>
                    <AvatarMenu/>
                </div>

            </Toolbar>
        </AppBar>
    </div>
}

function AvatarMenu() {

    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);

    return <>
        <UserAvatar onClick={handleClick}/>

        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <List component="nav" aria-label="main mailbox folders">
                <ListItem button>
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Inbox"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <DraftsIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Drafts"/>
                </ListItem>
            </List>
        </Popover>
    </>
}