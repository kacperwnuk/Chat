import * as express from "express";
import About from "../lib/About";
import {makeServer, app} from "../lib/server";
import root_backend_js from "./root/backend_js";

About.instance_type = "cdn";

makeServer({
    port: 8080
}).then(async (port) => {

    root_backend_js(app);

    app.use(express.static("./dist/public/"));
});

