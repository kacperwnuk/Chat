import type {RsoEnv} from "../../share/types";

interface ENV {
    RSO_ENV: RsoEnv
    RSO_CDN: string
    RSO_SESSION: string
    RSO_AUTH: string
}

let front_env = process.env as unknown as ENV;

export default front_env;
