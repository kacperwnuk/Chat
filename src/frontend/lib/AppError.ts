
export enum AppErrorType {
    NONE = "",
    FATAL = "FATAL",
    ACCESS_DENIED = "ACCESS_DENIED",
    CONNECTION = "CONNECTION",
}

export default class AppError {
    readonly type: AppErrorType;
    readonly msg: string;

    constructor(type: AppErrorType, msg: string = "") {
        this.type = type;
        this.msg = msg;
    }
}

