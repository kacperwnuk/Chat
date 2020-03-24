import DatabaseCon from "../share/database-con";
import env from "../share/env";


const database = new DatabaseCon(env.database.main);

/**
 *
 * @return {Promise<Date>}
 */
export async function getTime() {
    let result = await database.query(`select now() as "now"`);
    return result.rows[0].now;
}

