import http from "http";
import express from "express";
import cors from "cors";
import ioServer from "socket.io";
import About from "./about";
import bodyParser from "body-parser";
import DatabaseCon from "./DatabaseCon";
import env from "./env";

const package_json = require("../../../package");

/**@type{module:http.Server}*/
export let server = null;

/**@type{e.Application}*/
export let app = null;

/**@type{SocketIO.Server}*/
export let io = null;

/**@type{DatabaseCon}*/
export let databaseUser = null;

/**@type{DatabaseCon}*/
export let databaseMain = null;

/**
 *
 * @param port
 * @return {Promise<number>}
 */
export async function makeServer({
                                     port
                                 }) {

    // łączenia z bazą
    databaseUser = new DatabaseCon(env.database.user);
    databaseMain = new DatabaseCon(env.database.main);

    app = express();

    //https://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters


    // to support URL-encoded bodies
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // to support JSON-encoded bodies
    app.use(bodyParser.json());

    // enable CORS
    app.use(cors());


    server = new http.Server(app);
    io = ioServer(server);

    app.get("/about", (req, res) => {
        res.json(About);
    });

    server.listen(port);

    return port;
}