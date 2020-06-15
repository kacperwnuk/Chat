import {io, makeServer} from "../lib/server";
import handleNewSession from "./handleNewSession";

makeServer().then(() => {

    io.on("connection", handleNewSession);

});

