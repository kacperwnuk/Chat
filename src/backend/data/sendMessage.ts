import {databaseMain} from "../lib/server";
import About from "../lib/About";
import {v4 as uuid} from 'uuid';
import ServerError from "../lib/ServerError";
import DatabaseT from "../../share/DatabaseT";

export default async function (msg: {
    session_id: string,
    from: string,
    to_type: string,
    to_id: string,
    content: string
}): Promise<DatabaseT.Message> {

    let id = uuid();

    try {
        await databaseMain.query(`
            insert into public.messages
                (version, session_id, "from", message_id, to_type, to_id, content)
            values ($1::text, $2::uuid, $3::uuid, $4::uuid, $5::text, $6::uuid, $7::json);
        `, [About.version, msg.session_id, msg.from, id, msg.to_type, msg.to_id, msg.content]);
    } catch (e) {
        throw new ServerError(ServerError.Type.INTERNAL_SERVER_ERROR);
    }

    let response = await databaseMain.query(`
        select *
        from public.messages
        where "from"=$1::text and message_id=$2::text;
    `, [msg.from, id]);

    if (response.rows.length !== 1) {
        throw new ServerError(ServerError.Type.INTERNAL_SERVER_ERROR);
    }

    return response.rows[0];
}