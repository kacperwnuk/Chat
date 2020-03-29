import * as yup from "yup";
import {uuid_regex} from "../regex";

const requestBody = yup.object({
    session_id: yup.string().matches(uuid_regex).required(),
    secret_key: yup.string().matches(uuid_regex).required()
});

/**
 *
 * @param data
 * @return {Promise<AuthData>}
 */
export default function (data) {
    return requestBody.validate(data);
}