import type {RegistrationData} from "../../../share/MessagingSchema";
import isRegistrationData from "../../../share/data-checker/isRegistrationData";
import createUser from "../../data/createUser";
import logger from "../../../share/logger";

export default async function (registration_data: RegistrationData) {
    registration_data = await isRegistrationData(registration_data)
    const user_data = await createUser(registration_data);

    logger.data(`user added`);

    return user_data;
}