import DatabaseT from "./database";
import {AuthData} from "./types";

declare namespace ResponseT {

    namespace AuthS {
        interface auth {
            user: DatabaseT.UserT
            auth_data: AuthData
        }
    }
}

export default ResponseT;