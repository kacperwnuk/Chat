/**
 * Implementacja połączenia z bazą danych
 */

import pg from "pg";
import {makeLogger} from "../../share/logger";
import ServerError from "./ServerError";
import winston from "winston";

export interface DatabaseConParams {
    user: string
    host: string
    password: string
    database: string
    port: number
}

export interface RedisDatabaseConParams {
    host: string,
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
    private readonly dbs: DatabaseConParams[];
    private readonly pool: pg.Pool;
    private readonly logger: winston.Logger;

    constructor(params: DatabaseConParams[]) {

        this.dbs = params;

        let db_cfg = this.dbs[0];

        this.logger = makeLogger(DatabaseCon.name, `${db_cfg.user}@${db_cfg.database}(${db_cfg.host}:${db_cfg.port})`);

        this.pool = new pg.Pool(db_cfg);

        this.pool.on("connect", () => {
            this.logger.info("połączono")
        });

        this.pool.on("error", (error) => {
            this.logger.error("Krytyczny błąd bazy danych", {error})
        })
    }

    async query<T = any>(query: string, params: any[] = []): Promise<QueryResult<T>> {
        try {
            return await this.pool.query(query, params);
        } catch (error) {

            if (error.code === "ECONNREFUSED") {
                this.logger.error("Błąd połączenia z bazą danych", {error});

                throw new ServerError(ServerError.Type.INTERNAL_SERVER_ERROR);
            }

            throw error;
        }
    }
}