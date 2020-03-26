import HttpStatus from "http-status-codes";

export default class AppError {
    /**
     *
     * @param {AppError.Type} type
     * @param [msg]
     * @param [data]
     */
    constructor(type, msg, data) {
        this.type = type;
        this.msg = msg;
        this.data = data;
    }


}

AppError.Type = {
    NONE: undefined,
    FATAL: "FATAL",
    ACCESS_DENIED: "ACCESS_DENIED",
    CONNECTION: "CONNECTION",
};