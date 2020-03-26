import HttpStatus from "http-status-codes";
import ServerError from "./ServerError";
import {ValidationError} from "yup";

/**
 * Warstwa pośrednia do przechwytywania wyjątków z asynchronicznych funkcji express'a
 *
 * @param {function(req:e.Request, res:e.Response)} func
 * @return {function(req:e.Request, res:e.Response, next:e.NextFunction)}
 */
export default function expressAsyncMiddleware(func) {
    return async (req, res, next) => {
        try {
            await func(req, res);
            next();
        } catch (e) {
            console.error(e);

            if (e instanceof ServerError) {

                res.status(e.type);
                res.json({
                    error: {
                        type: e.type,
                        msg: e.msg
                    }
                });

                return;
            }

            if (e instanceof ValidationError) {
                res.status(ServerError.Type.BAD_REQUEST);
                res.json({
                    error: {
                        type: ServerError.Type.BAD_REQUEST,
                        msg: e.message
                    }
                });

                return;
            }

            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
            res.json({
                error: {
                    type: "INTERNAL_SERVER_ERROR"
                }
            })
        }
    }
}