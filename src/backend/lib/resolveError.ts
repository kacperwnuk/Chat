import ServerError from "./ServerError";
import {ValidationError} from "yup";
import logger from "../../share/logger";

/**
 * Każdy błąd musi być przerobiony i odesłany do klienta
 */
export default function resolveError(error: any): {
    msg: string,
    type: number
} {

    if (error instanceof ServerError) {
        return {
            type: error.type,
            msg: error.name
        }
    }

    if (error instanceof ValidationError) {
        return {
            type: ServerError.Type.BAD_REQUEST,
            msg: error.message
        }
    }

    logger.error("Nieznany błąd aplikacji", {error});

    return {
        type: ServerError.Type.INTERNAL_SERVER_ERROR,
        msg: error.msg
    }
}