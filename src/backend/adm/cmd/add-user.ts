import yargs from "yargs";

export const command = "add-user <username>";
export const desc = "Adds one user";
export const builder: yargs.CommandBuilder = {

}

export const handler = (argv: any) => {
    console.log("to sie nie powinno wykonać")
    console.log(argv);
}