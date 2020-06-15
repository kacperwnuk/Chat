import {exit, EXIT_TYPE} from "./exit";
import type {DatabaseConParams} from "./DatabaseCon";
import type {BrokerConParams} from "./BrokerCon";
import type {RsoServerType, RsoEnv} from "../../share/types";
import type {FrontENV} from "../../frontend/lib/front_env";

interface ENV {
    /**
     * Informacja w jakim środowisku działa program
     */
    RSO_ENV: RsoEnv

    /**
     * Typ serwera jakim ma się stać program
     */
    RSO_SERVER: RsoServerType

    /**
     * Port na którym ma być wystawiony program
     */
    RSO_PORT: number

    /**
     * Poświadczenia bazy "main"
     */
    RSO_DB_MAIN: DatabaseConParams[]

    /**
     * Poświadczenia bazy "user"
     */
    RSO_DB_USER: DatabaseConParams[]

    /**
     * Poświadczenia bazy "redis"
     */
    RSO_REDIS: BrokerConParams[]

    /**
     * Informacje, które zostaną wysłane do frontend'u,patrz `src/frontend/lib/front_env.ts`
     */
    RSO_FRONT_ENV: FrontENV
}

let back_env = {} as ENV;

try {
    //TODO sprawdzanie poprawności tych zmiennych
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
