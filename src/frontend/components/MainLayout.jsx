import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MyAppBar from "./MyAppBar";
import ContactList from "./ContactList";
import ConversationContainer from "./ConversationContainer";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
    },
    main: {
        flex: 1
    }
}));


export default function () {
    const classes = useStyles();

    return <div className={classes.root}>

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

    </div>
}