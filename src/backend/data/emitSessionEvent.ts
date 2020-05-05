import {databaseMain, databaseUser} from "../lib/server";

export default async function (session_id: string, name: string, args: any): Promise<void> {
    // await databaseMain.query(`
    //     select *
    //     from users
    //          join basic_auth on users.user_id = basic_auth.user_id
    //     where username=$1::text and password=$2::text
    // `, [username, password]);
}