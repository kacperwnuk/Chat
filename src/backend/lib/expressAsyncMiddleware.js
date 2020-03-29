import HttpStatus from "http-status-codes";
import ServerError from "./ServerError";
import {ValidationError} from "yup";
import resolveError from "./resolveError";

/**
 * Warstwa pośrednia do przechwytywania wyjątków z asynchronicznych funkcji express'a
 *
 * @param {function(req:e.Request, res:e.Response)} func
 * @return {function(req:e.Request, res:e.Response, next:e.NextFunction)}
 */
export default function (func) {
    return async (req, res, next) => {
        try {
            await func(req, res);
            next();
        } catch (error) {
            error = resolveError(error);

            res.status(error.type);
            res.json({error});
        }
    }
}