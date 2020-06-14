import fs from "fs";
import path from "path";
import {DatabaseConParams, RedisDatabaseConParams} from "./DatabaseCon";
import {exit, EXIT_TYPE} from "./exit";

interface ENV {
    database: {
        main: DatabaseConParams[]
        user: DatabaseConParams[]
        redis: RedisDatabaseConParams[]
    }
}

const env_path = path.join(process.cwd(), ".env.json");
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
