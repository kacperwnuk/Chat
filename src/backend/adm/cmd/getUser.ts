import type {RegistrationData} from "../../../share/MessagingSchema";
import isRegistrationData from "../../../share/data-checker/isRegistrationData";
import createUser from "../../data/createUser";
import {uuid_regex} from "../../../share/regex";
import getUserData, {getUserDataByEmail} from "../../data/getUserData";
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
                throw new Error("user_id is not uuid");
            }

            return await getUserData(user_id);
        }
        case "email":{
            const {email} = args;

            //TODO: walidacja email?

            return await getUserDataByEmail(email);
        }
        default:
            throw new Error(error_str);
    }
}