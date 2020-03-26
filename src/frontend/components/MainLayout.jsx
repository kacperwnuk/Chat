import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import MyAppBar from "./MyAppBar";
import ContactList from "./ContactList";
import ConversationContainer from "./ConversationContainer";

const useStyles = makeStyles((theme) => ({}));


export default function () {
    const classes = useStyles();

    return (
        <React.Fragment>

            <MyAppBar/>

            <main>

                <ContactList/>

                <ConversationContainer/>

            </main>

            <footer>

            </footer>

        </React.Fragment>
    );
}