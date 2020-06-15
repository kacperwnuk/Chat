import {databaseMain} from "../lib/server";
import type DatabaseT from "../../share/DatabaseT";

export default async function (session_id: string): Promise<DatabaseT.Session | null> {
    let response = await databaseMain.query(`
        select *
        from active_sessions
        where session_id = $1::uuid;
    `, [session_id]);

    return response.rows.length === 1 ? response.rows[0] : null;
}