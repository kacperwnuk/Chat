import fs from "fs";
import {v4 as uuid} from "uuid";
import ssh2 from "ssh2";
import logger, {makeLogger} from "../../share/logger";
import isAdmin from "./isAdmin";
import About from "../lib/About";
import back_env from "../lib/back_env";
import commander from "./commander";

About.instance_type = "adm";

const ssh_server = new ssh2.Server({
    hostKeys: [
        fs.readFileSync(".adm_key")
    ]
}, function (client) {
    const client_uuid = uuid();
    const client_logger = makeLogger(`client:${client_uuid}`);
    client_logger.verbose("connected");

    client.on("authentication", async (ctx) => {

        switch (ctx.method) {
            case "password": {

                if (!await isAdmin(ctx.username, ctx.password)) {
                    client_logger.error(`rejected, wrong credentials`);
                    return ctx.reject();
                }

                break;
            }

            default: {
                client_logger.error(`rejected, unsupported method ${ctx.method}`);
                return ctx.reject();
            }
        }

        ctx.accept();

    }).on("ready", function () {
        client_logger.verbose("client authenticated");

        client.on("session", function (accept, reject) {
            const session_uuid = uuid();
            client_logger.verbose(`creating new session ${session_uuid}`);
            const session_logger = makeLogger(`session:${session_uuid}`);

            const session = accept();

            session.on("exec", (accept, reject, info) => {
                session_logger.verbose(`executing command`);
                const stream = accept();
                commander(info.command, stream)
            });

            session.on("close", () => {
                session_logger.verbose("closed");
            });
        });
    }).on('end', function () {
        client_logger.verbose('disconnected');
    });
}).listen(back_env.RSO_ADM.port, "127.0.0.1", function () {
    logger.info(`listening on port ${ssh_server.address().port}`);
});