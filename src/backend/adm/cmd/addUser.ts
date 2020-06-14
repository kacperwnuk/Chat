import type {RegistrationData} from "../../../share/MessagingSchema";
import isRegistrationData from "../../../share/data-checker/isRegistrationData";
import createUser from "../../data/createUser";

export default async function (registration_data: RegistrationData) {
    registration_data = await isRegistrationData(registration_data)
    const user_data = await createUser(registration_data);

    return {
        user_id: user_data.user_id
    }
}