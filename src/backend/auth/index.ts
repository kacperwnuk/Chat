import {app, makeServer} from "../lib/server";
import root_auth from "./root/auth"
import root_registration from "./root/registration"

makeServer().then(() => {

    root_auth(app);
    root_registration(app);

});
