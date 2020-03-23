import {exit, EXIT_TYPE} from "./exit";

/**@type{ENV}*/
const env = {};
export default env;

let argv = [];

export function assertEnv() {
    argv = [...process.argv];

    if (argv.length !== 3) {
        exit(EXIT_TYPE.NO_ENV_FILE);
    }

    console.log("argv", process.argv);
}