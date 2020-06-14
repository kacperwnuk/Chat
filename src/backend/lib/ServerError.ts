import HttpStatus from "http-status-codes";

export default class ServerError {
    readonly type: number;
    readonly name: string;

    constructor(type: number, name: string = "") {
        this.type = type;
        this.name = name;
    }

    static Type = HttpStatus;
}