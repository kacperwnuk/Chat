import About from "../lib/about";
import {makeServer} from "../lib/server";

About.instance_type = "session";

makeServer({
    port: 8081
}).then(() => {
    console.log("started");
});

