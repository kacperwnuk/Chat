import {email_regex, username_regex, uuid_regex} from "../../../share/regex";
import getUserData, {getUserDataByEmail, getUserDataByUsername} from "../../data/getUserData";
import DatabaseT from "../../../share/DatabaseT";

const error_str = "command can only have one argument, user_id or email";

export default async function (args: any): Promise<DatabaseT.User> {
    const key = Object.keys(args);
    if (key.length !== 1) {
        throw new Error(error_str);
    }

    switch (key[0]) {
        case "user_id": {
            const {user_id} = args;
            if (!uuid_regex.test(user_id)) {
                throw new Error("user_id is not valid");
            }

            return await getUserData(user_id);
        }
        case "email": {
            const {email} = args;

            if (!email_regex.test(email)) {
                throw new Error("email is not valid");
            }

            return await getUserDataByEmail(email);
        }
        case "username": {
            const {username} = args;

            if (!username_regex.test(username)) {
                throw new Error("email is not valid");
            }

            return await getUserDataByUsername(username);
        }
        default:
            throw new Error(error_str);
    }
}