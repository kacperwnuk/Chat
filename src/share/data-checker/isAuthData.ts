import * as yup from "yup";
import {uuid_regex} from "../regex";
import type {SessionAuthData} from "../types";

const requestBody = yup.object({
    session_id: yup.string().matches(uuid_regex).required(),
    secret_key: yup.string().matches(uuid_regex).required()
});

export default function (data: SessionAuthData): Promise<SessionAuthData> {
    return requestBody.validate(data);
}