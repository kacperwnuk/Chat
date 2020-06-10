import fs from "fs";
import path from "path";
import {DatabaseConParams} from "./DatabaseCon";
import {exit, EXIT_TYPE} from "./exit";
import {BrokerConParams} from "./BrokerCon";

interface ENV {
    database: {
        main: DatabaseConParams[]
        user: DatabaseConParams[]
        redis: BrokerConParams[]
    },
    adm: {
        port: number,
    }
}

const env_path = path.join(process.cwd(),
    process.env.NODE_ENV === "production" ?
        ".env_production.json" :
        ".env_development.json");

let env: ENV;

try {
    env = JSON.parse(fs.readFileSync(env_path).toString());
} catch (e) {
    exit(EXIT_TYPE.ENV_FILE);

    // ta linia się i tak nie wykona, ale inaczej ts krzyczy, że coś się mu nie podoba
    process.exit();
}


export default env;

const argv = [...process.argv];
