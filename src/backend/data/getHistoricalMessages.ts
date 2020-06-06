import {databaseMain} from "../lib/server";
import DatabaseT from "../../share/DatabaseT";

export default async function (conversation_id: string, offset: number): Promise<DatabaseT.Message[]> {
    const messagesAmount = 5;
    let result = await databaseMain.query<DatabaseT.Message>(`
        select * from public.messages where conversation_id = $1::uuid order by input_time desc limit $2::int offset $3::int;
    `, [conversation_id, messagesAmount, offset]);

    return result.rows;
}