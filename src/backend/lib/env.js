import fs from "fs";
import path from "path";


const env_path = path.join(process.cwd(), ".env.json");
/**@type{ENV}*/
const env = JSON.parse(fs.readFileSync(env_path).toString());
export default env;

const argv = [...process.argv];
