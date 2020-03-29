import * as yup from "yup";
import {uuid_regex} from "../regex";

const requestBody = yup.object({
    to_type: yup.string().required(),
    to_id: yup.string().matches(uuid_regex).required(),
    content: yup.string().required(),
});

/**
 *
 * @param data
 * @return {Promise<MessagePrototypeData>}
 */
export default function (data) {
    return requestBody.validate(data);
}