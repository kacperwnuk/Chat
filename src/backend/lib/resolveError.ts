import ServerError from "./ServerError";
import {ValidationError} from "yup";

/**
 * Każdy błąd musi być przerobiony i odesłany do klienta
 */
export default function (error: any): {
    msg: string,
    type: number
} {
    if (error instanceof ServerError) {
        return {
            type: error.type,
            msg: error.msg
        }
    }

    if (error instanceof ValidationError) {
        return {
            type: ServerError.Type.BAD_REQUEST,
            msg: error.message
        }
    }

    return {
        type: ServerError.Type.INTERNAL_SERVER_ERROR,
        msg: error.msg
    }
}