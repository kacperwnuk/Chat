import winston from "winston";

const logger = winston.createLogger({
    level: "debug",
    format: winston.format.simple(),
    transports: [
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.printf(info => {

            let msg = "";

            if (info.label) {
                msg += `[${info.label}] `;
            }

            if (info.level) {
                msg += `${info.level}: `;
            }

            if (info.message) {
                msg += `${info.message}`;
            }

            if (info.level === "error" && info.error && info.error.stack) {
                msg += `\n${info.error.stack}`;
            }

            return msg;
        })
    }));
}

export default logger;