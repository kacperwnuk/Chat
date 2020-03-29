import HttpStatus from "http-status-codes";

export default class ServerError {
    /**
     *
     * @param {number} type
     * @param {string} [msg]
     */
    constructor(type, msg = "") {
        this.type = type;
        this.msg = msg;
    }
}

ServerError.Type = HttpStatus;