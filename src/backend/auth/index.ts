import {app, makeServer} from "../lib/server";

import root_auth from "./root/auth"

makeServer({
    port: 8082
}).then(() => {
    console.log("auth server");
    root_auth(app);

}).catch(() => {

});