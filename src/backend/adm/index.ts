import fs from "fs";
import {v4 as uuid} from "uuid";
import ssh2 from "ssh2";
import logger, {makeLogger} from "../../share/logger";
import back_env from "../lib/back_env";
import cmdExec from "./cmdExec";
import {makeDatabaseCon} from "../lib/server";

makeDatabaseCon();

const ssh_server = new ssh2.Server({
    hostKeys: [
        fs.readFileSync("cert/.id_rsa")
    ]
}, function (client) {
    const client_uuid = uuid();
    const logger = makeLogger(`client:${client_uuid}`);
    logger.verbose("connected");

    client.on("authentication", async (ctx) => {

        switch (ctx.method) {
            case "password": {

                if (!(ctx.username === "admin" && ctx.password === "admin")) {
                    logger.error(`rejected, wrong credentials`);
                    return ctx.reject();
                }

                break;
            }

            default: {
                logger.error(`rejected, unsupported method ${ctx.method}`);
                return ctx.reject();
            }
        }

        ctx.accept();

    });

    client.on("ready", function () {
        logger.verbose("client authenticated");

        client.on("session", function (accept, reject) {
            logger.verbose(`creating new session`);

            const session = accept();

            session.on("exec", async (accept, reject, info) => {
                if (info.command === "exec") {
                    const stream = accept();
                    await cmdExec(logger, stream);
                } else {
                    reject?.();
                }
            });

            session.on("close", () => {
                logger.verbose('session closed');
            });
        });


    });

    client.on("end", function () {
        logger.verbose('disconnected');
    });

}).listen(back_env.RSO_PORT, "0.0.0.0", function () {
    logger.info(`listening on port ${ssh_server.address().port}`);
});