import {databaseMain, databaseUser} from "../lib/server";

/**
 *
 * @param {string} session_id
 * @return {Promise<DatabaseT.SessionT | null>}
 */
export default async function (session_id) {
    let response = await databaseMain.query(`
        select *
        from sessions
        where session_id = $1::uuid;
    `, [session_id]);

    return response.rows.length === 1 ? response.rows[0] : null;
}