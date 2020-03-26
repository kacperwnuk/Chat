import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import ReduxStore from "./redux/StoreProvider";
import CssBaseline from '@material-ui/core/CssBaseline';
import DataProvider from "./lib/DataProvider";

const app = document.createElement("div");
app.id = "app";
document.body.append(app);

ReactDOM.render(
    <ReduxStore>
        <DataProvider>
            <CssBaseline>
                <App/>
            </CssBaseline>
        </DataProvider>
    </ReduxStore>,
    app);
