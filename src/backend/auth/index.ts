import {app, makeServer} from "../lib/server";
import root_auth from "./root/auth"

makeServer().then(() => {

    root_auth(app);

});
