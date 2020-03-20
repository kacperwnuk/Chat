import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./index.scss"

const app = document.createElement("div");
app.id = "app";
document.body.append(app);

ReactDOM.render(<App/>, app);
