import back_env from "./lib/back_env";
import {exit, EXIT_TYPE} from "./lib/exit";

switch (back_env.RSO_SERVER) {

    case "cdn":
        require("./cdn/index");
        break;

    case "session":
        require("./session/index");
        break;

    case "auth":
        require("./auth/index");
        break;

    case "adm":
        require("./adm/index");
        break;

    default:
        exit(EXIT_TYPE.WRONG_ENV);

}