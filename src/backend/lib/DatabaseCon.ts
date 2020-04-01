/**
 * Implementacja połączenia z bazą danych
 */

import pg from "pg";

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
    }

    query<T = any>(query: string, params: any[] = []): Promise<QueryResult<T>> {
        return this.pool.query(query, params);
    }
}