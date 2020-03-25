import About from "../share/about";
import {makeServer} from "./server";

About.instance_type = "session";

makeServer().then(() => {
    console.log("started");
});

