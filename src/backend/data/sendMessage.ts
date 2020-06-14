import {databaseMain, redisBroker} from "../lib/server";
import About from "../lib/About";
import {v4 as uuid} from 'uuid';
import ServerError from "../lib/ServerError";
import type DatabaseT from "../../share/DatabaseT";

export default async function (msg: {
    from_user_id: string,
    conversation_id: string,
    session_id: string,
    content: string
}): Promise<DatabaseT.Message> {

    let message_id = uuid();

    try {
        await databaseMain.query(`
            insert into public.messages
                (version, session_id, from_user_id, message_id, conversation_id, content)
            values ($1::text, $2::uuid, $3::uuid, $4::uuid, $5::uuid, $6::json);
        `, [About.version, msg.session_id, msg.from_user_id, message_id, msg.conversation_id, JSON.stringify(msg.content)]);
    } catch (e) {
        throw new ServerError(ServerError.Type.INTERNAL_SERVER_ERROR);
    }

    let response = await databaseMain.query(`
        select *
        from public.messages
        where from_user_id=$1::uuid and message_id=$2::uuid and conversation_id=$3::uuid;
    `, [msg.from_user_id, message_id, msg.conversation_id]);

    if (response.rows.length !== 1) {
        throw new ServerError(ServerError.Type.INTERNAL_SERVER_ERROR);
    }

    let message = response.rows[0];

    // informowanie innych sesji niech będzie asynchroniczne
    redisBroker.publishNewMessage(message);

    return message;
}