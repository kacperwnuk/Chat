/**
 * Implementacja połączenia z bazą danych
 */

import pg from "pg";

export default class DatabaseCon {
    /**
     * @param {DatabaseConParams} params
     */
    constructor(params) {

        this.params = params;

        this.pool = new pg.Pool({
            user: this.params.user,
            host: this.params.host,
            database: this.params.database,
            password: this.params.password,
            port: this.params.port,
        })
    }

    /**
     *
     * @param {string} query
     * @param {any[]} [params]
     * @return {Promise<void>}
     */
    async query(query, params = []) {
        return await this.pool.query(query, params);
    }
}