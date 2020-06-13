import React from "react";
import TextField from "@material-ui/core/TextField";
import {useDispatch} from "react-redux";
import {makeSendMessageAction} from "../redux/reducers/messages";
import {useSession} from "../redux/reducers/session";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';

const useStyle = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        paddingTop: 10,
    },
    text_input: {
        flex: 1
    },
    send_button: {
        marginLeft: theme.spacing(1)
    }
}));

export default function MessageComposer(props: {
    conversationId: string
}) {
    const classes = useStyle();

    const dispatch = useDispatch();
    const session = useSession();
    const [message, setMessage] = React.useState("");

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMessage(event.target.value);
    }

    function handleKeyPress(event: React.KeyboardEvent) {
        if (!event.shiftKey && event.which === 13) {
            event.preventDefault();
            event.stopPropagation();
            handleSend();
        }
    }

    function handleSend() {
        if (message.length === 0) return;

        dispatch(
            makeSendMessageAction({
                conversation_id: props.conversationId,
                content: message
            })
        );

        setMessage("")
    }

    return <div className={classes.root}>
        <div className={classes.text_input}>
            <TextField
                onKeyPress={handleKeyPress}
                fullWidth
                disabled={session === null}
                multiline
                value={message}
                onChange={handleChange}
                variant="outlined"
            />
        </div>
        <div>
            <IconButton
                className={classes.send_button}
                color="primary"
                onClick={handleSend}>
                <SendIcon/>
            </IconButton>
        </div>
    </div>
}


