import React from "react";
import TextField from "@material-ui/core/TextField";
import {useDispatch} from "react-redux";
import {makeSendMessageAction} from "../redux/reducers/messages";
import {useSession} from "../redux/reducers/session";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';
import MoodIcon from '@material-ui/icons/Mood';
import Picker from "emoji-picker-react";

const useStyle = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap"
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
    const [emojiPikerShown, setEmojiPikerShown] = React.useState(true);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log("wiadomosc, textInputChange", event.target.value, message);
        setMessage(event.target.value);
    }

    function handleKeyPress(event: React.KeyboardEvent) {
        console.log("wiadomosc, ketPressed:  ", message, "daas1d");
        printMess();
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

    function emojiShowClicked(){
        setEmojiPikerShown(!emojiPikerShown);
    }

    function printMess(){
        console.log(message);
    }

    function onEmojiClick(event: any, emojiObject: any){
        console.log('wiadomosc, onClick: ', message);
        printMess();
        //setMessage(message.concat(emojiObject.emoji));
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

        <div hidden={emojiPikerShown}>
            <Picker onEmojiClick={onEmojiClick}/>

        </div>
        <IconButton
            color="primary"
            onClick={emojiShowClicked}>
            <MoodIcon/>
        </IconButton>
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


