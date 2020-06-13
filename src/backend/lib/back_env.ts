import {exit, EXIT_TYPE} from "./exit";
import type {DatabaseConParams} from "./DatabaseCon";
import type {BrokerConParams} from "./BrokerCon";
import type {RsoServerType, RsoEnv} from "../../share/types";
import type {FrontENV} from "../../frontend/lib/front_env";

interface ENV {
    RSO_ENV: RsoEnv
    RSO_SERVER: RsoServerType
    RSO_PORT: number
    RSO_DB_MAIN: DatabaseConParams[]
    RSO_DB_USER: DatabaseConParams[]
    RSO_REDIS: BrokerConParams[]
    RSO_FRONT_ENV: FrontENV
}

let back_env = {} as ENV;

try {
    back_env.RSO_ENV = process.env.RSO_ENV as RsoEnv;
    back_env.RSO_SERVER = process.env.RSO_SERVER as RsoServerType;
    back_env.RSO_PORT = parseInt(process.env.RSO_PORT as string);
    back_env.RSO_DB_MAIN = JSON.parse(process.env.RSO_DB_MAIN as string);
    back_env.RSO_DB_USER = JSON.parse(process.env.RSO_DB_USER as string);
    back_env.RSO_REDIS = JSON.parse(process.env.RSO_REDIS as string);

    back_env.RSO_FRONT_ENV = JSON.parse(process.env.RSO_FRONT_ENV as string);
} catch (e) {
    console.error(e);
    exit(EXIT_TYPE.WRONG_ENV);

    // ta linia się i tak nie wykona, ale inaczej ts krzyczy, że coś się mu nie podoba
    process.exit();
}


export default back_env;

const argv = [...process.argv];
