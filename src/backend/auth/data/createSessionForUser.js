import {v4 as uuid} from 'uuid';
import About from "../../share/about";
import getMyAddress from "../../share/getMyAddress";
import {databaseMain} from "../../share/server";
import ServerError from "../../share/ServerError";

/**
 *
 * @param {string} user_id
 * @return {Promise<DatabaseT.SessionT>}
 */
export default async function (user_id) {

    let session_id = uuid();

    await databaseMain.query(`
    insert into public.sessions
        (version, session_id, user_id, server_address, args)
    values ($1::text, $2::uuid, $3::uuid, $4::text[], $5::json);
    `, [About.version, session_id, user_id, await getMyAddress(), {}]);


    let result = await databaseMain.query(`
    select * from public.sessions where session_id=$1::uuid;
    `, [session_id]);

    console.log(result);

    if (result.rows.length === 1) {
        return result.rows[0];
    } else {
        throw new ServerError(ServerError.Type.INTERNAL_SERVER_ERROR);
    }
}