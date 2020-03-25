import About from "../share/about";
import {makeServer} from "../share/server";

About.instance_type = "session";

makeServer({
    port: 8081
}).then(() => {
    console.log("started");
});

