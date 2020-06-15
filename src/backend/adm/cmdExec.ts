import {EOL} from "os";
import ssh2 from "ssh2";
import * as yup from "yup";
import yaml from "js-yaml";
import {yaml_split_regex} from "../../share/regex";
import commands from "./cmds";
import type winston from "winston";

function readStream(stream: ssh2.ServerChannel): Promise<string> {
    return new Promise((resolve, reject) => {
        let sum = ""

        function onData(buffer: Buffer) {
            sum += buffer.toString();

            if (stream.readableLength === 0) {
                stream.off("data", onData);
                resolve(sum);
            }
        }

        stream.on("data", onData);
    })
}

const isCommandBody = yup.object({
    command: yup.string().required(),
    argument: yup.object().required()
});

export default async function (logger: winston.Logger, stream: ssh2.ServerChannel) {
    let bodies: any[];

    try {
        const body = await readStream(stream);
        bodies = body.split(yaml_split_regex);
        bodies = bodies.map(body => yaml.load(body));
    } catch (e) {
        stream.stderr.write("syntax error")
        stream.close();
        return;
    }

    const promises = bodies.map(async body => {
        try {
            body = isCommandBody.validateSync(body);

            if (commands.hasOwnProperty(body.command)) {
                // @ts-ignore
                body.return = await commands[body.command](body.argument);
                body.code = 0;
            } else {
                body.return = `command not found`;
                body.code = 1;
            }
        } catch (e) {
            body.return = `failed, ${e.message}`;
            body.code = 2;
        }

        return body;
    });

    for (const body of await Promise.all(promises)) {
        stream.write(yaml.safeDump(body));
        stream.write("---" + EOL);
    }

    stream.close();
}