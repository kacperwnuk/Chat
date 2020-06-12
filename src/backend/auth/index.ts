import {app, makeServer} from "../lib/server";
import root_auth from "./root/auth"

makeServer({
    port: 8082
}).then(() => {

    root_auth(app);

})