import * as yup from "yup";
import {uuid_regex} from "../regex";
import type {MessagePrototypeData} from "../types";

const requestBody = yup.object({
    conversation_id: yup.string().matches(uuid_regex).required(),
    content: yup.string().required(),
});

export default function (data: MessagePrototypeData): Promise<MessagePrototypeData> {
    return requestBody.validate(data);
}