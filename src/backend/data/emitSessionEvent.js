import {databaseMain, databaseUser} from "../lib/server";

/**
 *
 * @param {string} session_id
 * @param {string} name
 * @param {*} args
 * @return {Promise<void>}
 */
export default async function (session_id, name, args) {
    await databaseMain.query(`
        select *
        from users
             join basic_auth on users.user_id = basic_auth.user_id
        where username=$1::text and password=$2::text
    `, [username, password]);
}