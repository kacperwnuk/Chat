import os from "os";
import * as express from "express";
import About from "../lib/About";
import {makeServer, app} from "../lib/server";
import getMyAddress from "../lib/getMyAddress";

About.instance_type = "cdn";

makeServer({
    port: 8080
}).then(async (port) => {

    let my_ips = await getMyAddress();
    console.log("cdn");
    console.log([
        "Uruchomiono:",
        ...my_ips.map(ip => `\thttp://${ip}:${port}`)
    ].join(os.EOL));

    app.use(express.static("./dist/public/"));
});

