/**
 * logger, którego będziemy używać do debugowania i innych rzeczy
 */
import winston from "winston";
import colors from "colors/safe";
import {EOL} from "ts-loader/dist/constants";

let i = -1;

const logger = winston.createLogger({
    level: "silly",
    levels: {
        error: ++i,
        warn: ++i,
        info: ++i,
        data: ++i,
        verbose: ++i,
        debug: ++i,
        silly: ++i
    },
    format: winston.format.simple(),
    transports: []
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.printf(info => {

            let time = colors.gray(`[${new Date().toISOString()}]`);
            let msg = "";

            if (info.label) {
                msg += `[${info.label}] `;
            }

            if (info.level) {
                msg += `[${info.level}] `;
            }

            if (info.message) {
                msg += `${info.message}`;
            }

            // Kolorowanie
            if (info.level === "error") {
                msg = colors.red(msg);
            } else if (info.level === "info") {
                msg = colors.blue(msg);
            } else if (info.level === "data") {
                msg = colors.white(msg);
            }

            if (info.level === "error" && info.error && info.error.stack) {
                msg += `${EOL}${info.error.stack}`;
            }

            if (info.level === "data" && Array.isArray(info.data)) {
                msg += `${EOL}${info.data.join(" ")}`;
            }

            return `${time} ${msg}`;
        })
    }));
}

export enum NotificationLevel {
    Info = "info",
    Error = "error",
    Warn = "warn",
    Success = "success"
}

export default logger;