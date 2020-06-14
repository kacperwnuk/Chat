import type DatabaseT from "../../share/DatabaseT";
import {databaseMain} from "../lib/server";
import type { UserStatus } from "../../share/types";

export default async function (user_id: string): Promise<UserStatus> {
    let result = await databaseMain.query<DatabaseT.User>(`
        select * from active_sessions where user_id=$1::uuid;
    `, [user_id]);

    if (result.rows.length > 0) {
        return {
            user_id,
            status: "online",
            timestamp: Date.now()
        }
    } else {
        return {
            user_id,
            status: "offline",
            timestamp: Date.now()
        }
    }
}