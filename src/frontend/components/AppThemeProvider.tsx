import React from "react";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import green from "@material-ui/core/colors/green";
import yellow from "@material-ui/core/colors/yellow";
import red from "@material-ui/core/colors/red";

// https://material-ui.com/customization/color/#playground

const theme = createMuiTheme({
    //
    // palette: {
    //     primary: red,
    //     secondary: green,
    // },
    //
});

export default function (props: {
    children: React.ReactNode
}) {
    return <ThemeProvider theme={theme}>
        {props.children}
    </ThemeProvider>
}