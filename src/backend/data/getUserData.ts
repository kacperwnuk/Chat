import type DatabaseT from "../../share/DatabaseT";
import {databaseUser} from "../lib/server";
import ServerError from "../lib/ServerError";

export default async function (user_id: string) {
    let result = await databaseUser.query<DatabaseT.User>(`
        select * from users where user_id=$1::uuid;
    `, [user_id]);

    if (result.rows.length === 1) {
        return result.rows[0];
    } else {
        throw new ServerError(ServerError.Type.NOT_FOUND, "user not found")
    }
}

export async function getUserDataByEmail(email: string) {
    let result = await databaseUser.query<DatabaseT.User>(`
        select * from users where email=$1::text;
    `, [email]);

    if (result.rows.length === 1) {
        return result.rows[0];
    } else {
        throw new ServerError(ServerError.Type.NOT_FOUND, "user not found")
    }
}

export async function getUserDataByUsername(username: string) {
    let result = await databaseUser.query<DatabaseT.User>(`
        select * from users where username=$1::text;
    `, [username]);

    if (result.rows.length === 1) {
        return result.rows[0];
    } else {
        throw new ServerError(ServerError.Type.NOT_FOUND, "user not found")
    }
}