import yargs from "yargs";
import ssh2 from "ssh2";

const parser = yargs
    .command(require("./cmd/add-user"))
    // .command(require("./cmd/add-users"))
    .help();

export default function (args: string, stream: ssh2.ServerChannel) {

    let q = parser.parse(args)
    console.log(q);
}