import HttpStatus from "http-status-codes";

export default class ServerError {
    /**
     *
     * @param {number} type
     * @param [msg]
     * @param [data]
     */
    constructor(type, msg, data) {
        this.type = type;
        this.msg = msg;
        this.data = data;
    }


}

ServerError.Type = HttpStatus;