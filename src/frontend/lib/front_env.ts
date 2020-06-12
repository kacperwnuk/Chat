import type {RsoEnv} from "../../share/types";

export interface FrontENV {
    RSO_ENV: RsoEnv
    RSO_CDN: string
    RSO_SESSION: string
    RSO_AUTH: string
}

let front_env = JSON.parse(
    JSON.stringify(
        // @ts-ignore
        window.RSO_ENV as string
    )
) as FrontENV;

export default front_env;
