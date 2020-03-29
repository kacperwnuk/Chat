import About from "../lib/about";
import {io, makeServer} from "../lib/server";
import handleNewSession from "./handleNewSession";

About.instance_type = "session";

makeServer({
    port: 8081
}).then(() => {

    io.on("connection", handleNewSession)

});

