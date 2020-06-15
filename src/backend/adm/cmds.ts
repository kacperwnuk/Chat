import addUser from "./cmd/addUser";
import getUser from "./cmd/getUser";
import type {AdminMessagingSchema} from "../../share/MessagingSchema";

const commands: {
    [Key in keyof AdminMessagingSchema]: (
        ...args: Parameters<AdminMessagingSchema[Key]>
    ) => Promise<ReturnType<AdminMessagingSchema[Key]>>
} = {
    addUser,
    getUser
}

export default commands;