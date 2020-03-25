import http from "http";
import express from "express";
import socketIO from "socket.io";
import About from "../share/about";

const package_json = require("./../../../package");

/**@type{module:http.Server}*/
export let server = null;

/**@type{e.Application}*/
export let app = null;

/**@type{socketIO}*/
export let io = null;

export async function makeServer() {

    app = express();
    server = new http.Server(app);
    io = socketIO(server);


    app.get("/about", (req, res) => {
        res.json(About);
    });

    server.listen(8081);

}