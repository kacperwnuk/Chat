import {DatabaseConParams} from "./database-con";

interface ENV {
    database: {
        main: DatabaseConParams[]
        user: DatabaseConParams[]
    }
}

export default ENV;