import ssh2 from "ssh2";
// import cmd_add_user from "./cmd/add-user"
import {Command} from "commander";
import {parse as parseCmd} from "shell-quote";

const program = new Command();

// cmd_add_user(program);


export default function (args: string, stream: ssh2.ServerChannel) {

    console.log(args);
    console.log(parseCmd(args));
}