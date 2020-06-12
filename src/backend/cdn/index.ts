import * as express from "express";
import {makeServer, app} from "../lib/server";
import root_backend_js from "./root/backend_js";

makeServer({
    port: 8080
}).then(async (port) => {

    root_backend_js(app);

    app.use(express.static("./dist/public/"));
});

