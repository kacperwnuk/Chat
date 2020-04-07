/**
 * Implementacja połączenia z bazą danych
 */

import pg from "pg";
import logger from "../../share/logger";
import ServerError from "./ServerError";

export interface DatabaseConParams {
    user: string
    host: string
    password: string
    database: string
    port: number
}

interface QueryResult<T = any> {
    rows: T[],
    fields: {
        name: string
        format: string
    }[]
}

export default class DatabaseCon {
    /**
     * Tablica z bazami danych, pierwsza to główna, a reszta zapasowa
     */
    readonly dbs: DatabaseConParams[];
    private pool: pg.Pool;

    constructor(params: DatabaseConParams[]) {

        this.dbs = params;

        this.pool = new pg.Pool(this.dbs[0]);

        this.pool.on("error", (error) => {
            logger.error("Krytyczny błąd bazy danych", {error})
        })
    }

    async query<T = any>(query: string, params: any[] = []): Promise<QueryResult<T>> {
        try {
            return await this.pool.query(query, params);
        } catch (error) {

            if (error.code === "ECONNREFUSED") {
                logger.error("Błąd połączenia z bazą danych", {error});

                throw new ServerError(ServerError.Type.INTERNAL_SERVER_ERROR);
            }

            throw error;
        }
    }
}