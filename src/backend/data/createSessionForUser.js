import {v4 as uuid} from 'uuid';
import About from "../lib/about";
import getMyAddress from "../lib/getMyAddress";
import {databaseMain} from "../lib/server";
import ServerError from "../lib/ServerError";

/**
 *
 * @param {string} user_id
 * @return {Promise<DatabaseT.SessionT>}
 */
export default async function (user_id) {

    let session_id = uuid(),
        secret_key = uuid();

    await databaseMain.query(`
    insert into public.sessions
        (version, session_id, secret_key, user_id, server_address, args)
    values ($1::text, $2::uuid, $3::text, $4::uuid, $5::text[], $6::json);
    `, [About.version, session_id, secret_key, user_id, await getMyAddress(), {}]);


    let result = await databaseMain.query(`
    select * from public.sessions where session_id=$1::uuid;
    `, [session_id]);

    if (result.rows.length === 1) {
        return result.rows[0];
    } else {
        throw new ServerError(ServerError.Type.INTERNAL_SERVER_ERROR);
    }
}