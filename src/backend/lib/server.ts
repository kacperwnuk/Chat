import http from "http";
import express from "express";
import cors from "cors";
import socket_io from "socket.io";
import About from "./About";
import bodyParser from "body-parser";
import DatabaseCon from "./DatabaseCon";
import back_env from "./back_env";
import BrokerCon from "./BrokerCon";
import {makeLogger} from "../../share/logger";

export let server: http.Server;
export let app: express.Express;
export let io: socket_io.Server;

export let databaseUser: DatabaseCon;
export let databaseMain: DatabaseCon;
export let redisBroker: BrokerCon;

export async function makeDatabaseCon() {
    databaseUser = new DatabaseCon(back_env.RSO_DB_USER);
    databaseMain = new DatabaseCon(back_env.RSO_DB_MAIN);
    redisBroker = new BrokerCon(back_env.RSO_REDIS);
}

export async function makeServer(): Promise<void> {
    const makeServerLogger = makeLogger("makeServer");

    makeServerLogger.info("starting ...")

    // łączenia z bazą
    await makeDatabaseCon();

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
    io = socket_io(server);

    app.get("/about", (req, res) => {
        res.json(About);
    });

    server.listen(back_env.RSO_PORT);
    makeServerLogger.info(`listening on port ${back_env.RSO_PORT}`)

    makeServerLogger.info("finished")
}