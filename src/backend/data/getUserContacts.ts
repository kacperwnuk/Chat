import {databaseUser} from "../lib/server";

export default async function (user_id: string): Promise<string[]> {
    let result = await databaseUser.query(`
        select user_id from public.users;
    `);

    return result.rows;
}