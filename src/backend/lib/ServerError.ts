import HttpStatus from "http-status-codes";

export default class ServerError {
    readonly type: number;
    readonly msg: string;

    constructor(type: number, msg: string = "") {
        this.type = type;
        this.msg = msg;
    }

    static Type = HttpStatus;
}