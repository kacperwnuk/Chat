import {databaseUser} from "../lib/server";
import ServerError from "../lib/ServerError";
import DatabaseT from "../../share/DatabaseT";

/**
 * Sprawdza czy podana kombinacja username/password jest poprawka, a następnie zwraca obiekt użytkownika lub wyjątek
 */
export default async function (username: string, password: string): Promise<DatabaseT.User> {
    let result = await databaseUser.query(`
        select *
        from users
             join basic_auth on users.user_id = basic_auth.user_id
        where username=$1::text and password=$2::text;
    `, [username, password]);

    if (result.rows.length === 1) {
        return result.rows[0];
    } else {
        throw new ServerError(ServerError.Type.UNAUTHORIZED)
    }
}