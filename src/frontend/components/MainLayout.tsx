import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MyAppBar from "./MyAppBar";
import Grid from "@material-ui/core/Grid";
import Navigation from "./Navigation";

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


export default function (props: {
    children: React.ReactNode
}) {
    const classes = useStyles();

    return <div className={classes.root}>

        <MyAppBar/>

        <main>

            <Grid container>

                <Grid item xs={3}>
                    <Navigation/>
                </Grid>

                <Grid item xs={9}>
                    {props.children}
                </Grid>

            </Grid>

        </main>

    </div>
}