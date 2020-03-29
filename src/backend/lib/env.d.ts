import {DatabaseConParams} from "./DatabaseCon";

interface ENV {
    database: {
        main: DatabaseConParams[]
        user: DatabaseConParams[]
    }
}

export default ENV;