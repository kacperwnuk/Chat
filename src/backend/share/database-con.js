/**
 * Implementacja połączenia z bazą danych
 */

import pg from "pg";

export default class DatabaseCon {
    /**
     * @param {DatabaseConParams[]} params
     */
    constructor(params) {

        /**
         * Tablica z bazami danych, pierwsza to główna, a reszta zapasowa
         * @type {DatabaseConParams[]}
         */
        this.dbs = params;

        this.pool = new pg.Pool(this.dbs[0]);
    }

    /**
     *
     * @param {string} query
     * @param {any[]} [params]
     * @return {Promise<QueryResult>}
     */
    query(query, params = []) {
        return this.pool.query(query, params);
    }
}