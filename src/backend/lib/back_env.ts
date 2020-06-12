import {exit, EXIT_TYPE} from "./exit";
import type {DatabaseConParams} from "./DatabaseCon";
import type {BrokerConParams} from "./BrokerCon";
import type {RsoEnv} from "../../share/types";

interface ENV {
    RSO_ENV: RsoEnv
    RSO_DB_MAIN: DatabaseConParams[]
    RSO_DB_USER: DatabaseConParams[]
    RSO_REDIS: BrokerConParams[]
    RSO_ADM: {
        port: number
    }
}

let back_env = {} as ENV;

try {
    console.log("process.env", process.env);
    back_env.RSO_ENV = process.env.RSO_ENV as RsoEnv;
    back_env.RSO_DB_MAIN = JSON.parse(process.env.RSO_DB_MAIN as string);
    back_env.RSO_DB_USER = JSON.parse(process.env.RSO_DB_USER as string);
    back_env.RSO_REDIS = JSON.parse(process.env.RSO_REDIS as string);
    back_env.RSO_ADM = JSON.parse(process.env.RSO_ADM as string);
} catch (e) {
    exit(EXIT_TYPE.ENV_FILE);

    // ta linia się i tak nie wykona, ale inaczej ts krzyczy, że coś się mu nie podoba
    process.exit();
}


export default back_env;

const argv = [...process.argv];
