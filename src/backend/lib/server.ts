import http from "http";
import express from "express";
import cors from "cors";
import socket_io from "socket.io";
import About from "./About";
import bodyParser from "body-parser";
import DatabaseCon from "./DatabaseCon";
import env from "./env";
import BrokerCon from "./BrokerCon";
import {makeLogger} from "../../share/logger";

export let server: http.Server;
export let app: express.Express;
export let io: socket_io.Server;

export let databaseUser: DatabaseCon;
export let databaseMain: DatabaseCon;
export let redisBroker: BrokerCon;


export async function makeServer(args: {
    port: number
}): Promise<number> {
    const makeServerLogger = makeLogger("makeServer");

    makeServerLogger.info("start")

    // łączenia z bazą
    databaseUser = new DatabaseCon(env.database.user);
    databaseMain = new DatabaseCon(env.database.main);
    redisBroker = new BrokerCon(env.database.redis);

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

    server.listen(args.port);

    makeServerLogger.info("end")

    return args.port;
}