import {io, makeServer} from "../lib/server";
import handleNewSession from "./handleNewSession";

makeServer({
    port: 8081
}).then(() => {
    io.on("connection", handleNewSession);
});

