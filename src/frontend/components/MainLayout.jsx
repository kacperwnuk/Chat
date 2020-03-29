import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import MyAppBar from "./MyAppBar";
import ContactList from "./ContactList";
import ConversationContainer from "./ConversationContainer";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({}));


export default function () {
    const classes = useStyles();

    return (
        <React.Fragment>

            <MyAppBar/>

            <main>

                <Grid container>

                    <Grid item xs={3}>
                        <ContactList/>
                    </Grid>

                    <Grid item xs={9}>
                        <ConversationContainer/>
                    </Grid>

                </Grid>

            </main>

            <footer>

            </footer>

        </React.Fragment>
    );
}