import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import {makeSendMessageAction} from "../redux/reducers/messages";
import {useSession} from "../redux/reducers/session";

export default function MessageComposer({
                                            conversationId: conversation_id
                                        }) {

    const dispatch = useDispatch();
    const session = useSession();
    const [message, setMessage] = React.useState("");

    function handleChange(event) {
        setMessage(event.target.value);
    }

    function handleSend() {
        dispatch(
            makeSendMessageAction({
                conversation_id,
                content: message
            })
        )
    }

    return <div>
        <TextField
            disabled={session === null}
            multiline
            value={message}
            onChange={handleChange}
        />
        <Button
            onClick={handleSend}
            disabled={session === null}
        >
            Wyślij
        </Button>
    </div>
}

MessageComposer.propTypes = {
    conversationId: PropTypes.string.isRequired
};

