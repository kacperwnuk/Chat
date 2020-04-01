import * as yup from "yup";
import type {BasicLoginData} from "../types";

const requestBody = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
});

export default function (data: BasicLoginData): Promise<BasicLoginData> {
    return requestBody.validate(data);
}