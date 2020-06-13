import React from "react";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

const theme = createMuiTheme({
    //
    //
});

export default function (props: {
    children: React.ReactNode
}) {
    return <ThemeProvider theme={theme}>
        {props.children}
    </ThemeProvider>
}