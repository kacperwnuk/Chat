import React from "react";
import PropTypes from 'prop-types';
import {useUserData} from "../redux/reducers/user_data";
import {Paper} from "@material-ui/core";
import UserAvatar from "./UserAvatar";
import MessageComposer from "./MessageComposer";
import MessageList from "./MessageList";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useWindowSize from "../hooks/useWindowSize";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import UserDisplay from "./UserDisplay";


const useStyle = makeStyles(theme => ({
    root: {
        display: "flex",
    },
    header: {},
    composer: {
        position: "fixed",
        boxSizing: "border-box",
        paddingBottom: theme.spacing(1.5),
        bottom: 0,
    },
    user_avatar: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}));

export default function Conversation({
                                         display = true,
                                         conversationId
                                     }) {

    const classes = useStyle();
    const root_ref = React.createRef();
    const composer_ref = React.createRef();
    const window_size = useWindowSize();
    // z uwagi na to, że id konwersacji jest tożsame z id użytkownika ...
    const user_data = useUserData(conversationId);


    // zmiana szerokości elementu tworzenia wiadomości
    React.useEffect(() => {
        composer_ref.current.style.width = `${root_ref.current.offsetWidth}px`;
    }, [root_ref, composer_ref, window_size]);


    return <div style={{display: display ? "block" : "none"}} ref={root_ref}>
        <Toolbar component={Paper} className={classes.header}>
            <UserAvatar userId={user_data.user_id} className={classes.user_avatar}/>
            <Typography variant="h6" className={classes.title}>
                <UserDisplay user={user_data}/>
            </Typography>
        </Toolbar>
        <MessageList conversationId={conversationId}/>
        <div className={classes.composer} ref={composer_ref}>
            <MessageComposer conversationId={conversationId}/>
        </div>
    </div>
}

Conversation.propTypes = {
    display: PropTypes.bool.isRequired,
    conversationId: PropTypes.string.isRequired
};

