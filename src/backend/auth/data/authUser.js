import {databaseUser} from "../../share/server";
import ServerError from "../../share/ServerError";

/**
 * Sprawdza czy podana kombinacja username/password jest poprawka, a następnie zwraca obiekt użytkownika lub wyjątek
 *
 * @param {string} username
 * @param {string} password
 * @return {Promise<DatabaseT.UserT>}
 */
export default async function (username, password) {
    let result = await databaseUser.query(`
        select *
        from users
             join basic_auth on users.user_id = basic_auth.user_id
        where username=$1::text and password=$2::text
    `, [username, password]);

    if (result.rows.length === 1) {
        return result.rows[0];
    } else {
        throw new ServerError(ServerError.Type.UNAUTHORIZED)
    }
}