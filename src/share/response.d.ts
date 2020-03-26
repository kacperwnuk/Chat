import DatabaseT from "./database";

declare namespace ResponseT {

    namespace AuthS {
        interface auth {
            user: DatabaseT.UserT
            session: DatabaseT.SessionT
        }
    }
}

export default ResponseT;