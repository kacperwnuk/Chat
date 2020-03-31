import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function MessageComposer({}) {

    const [message, setMessage] = React.useState("");
    // const messageCreator = useMessageCreator();

    function handleChange(event) {
        setMessage(event.target.value);
    }

    function handleSend() {
        // messageCreator({
        //     to_type: "user",
        //     to_id: "qq",
        //     content: message
        // })
    }

    return <div>
        <TextField
            multiline
            value={message}
            onChange={handleChange}
        />

        <Button onClick={handleSend}>
            Wyślij
        </Button>
    </div>
}