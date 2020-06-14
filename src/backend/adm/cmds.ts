import addUser from "./cmd/addUser";
import getUser from "./cmd/getUser";

const commands: {
    [key: string]: (args: any) => Promise<any>
} = {
    "addUser": addUser,
    "getUser": getUser
}

export default commands;