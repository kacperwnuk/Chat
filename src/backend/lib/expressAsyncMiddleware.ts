import express from "express";
import resolveError from "./resolveError";

/**
 * Warstwa pośrednia do przechwytywania wyjątków z asynchronicznych funkcji express'a
 */
export default function (
    func: (
        req: express.Request,
        res: express.Response
    ) => void
) {
    return async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
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