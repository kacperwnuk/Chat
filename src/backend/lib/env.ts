import fs from "fs";
import path from "path";
import {DatabaseConParams} from "./DatabaseCon";

interface ENV {
    database: {
        main: DatabaseConParams[]
        user: DatabaseConParams[]
    }
}

const env_path = path.join(process.cwd(), ".env.json");
const env: ENV = JSON.parse(fs.readFileSync(env_path).toString());
export default env;

const argv = [...process.argv];
