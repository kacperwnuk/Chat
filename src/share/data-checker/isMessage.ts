import * as yup from "yup";
import {uuid_regex} from "../regex";
import DatabaseT from "../DatabaseT";

const requestBody = yup.object({
    version: yup.string(),
    input_time: yup.string().required(),
    from_user_id: yup.string().matches(uuid_regex).required(),
    conversation_id: yup.string().matches(uuid_regex).required(),
    message_id: yup.string().matches(uuid_regex).required(),
    content: yup.string().required(),
    session_id: yup.string().matches(uuid_regex).required(),
    read: yup.boolean().required()
});

export default function (data: any): Promise<DatabaseT.Message> {
    return requestBody.validate(data);
}