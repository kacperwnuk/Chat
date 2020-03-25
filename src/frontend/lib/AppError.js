export default class AppError {
    /**
     *
     * @param {AppError.Type} type
     * @param data
     */
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }


}

AppError.Type = {
    NONE: null,
    FATAL: -1,
    CREDENTIALS: 0,
    CONNECTION: 1
};