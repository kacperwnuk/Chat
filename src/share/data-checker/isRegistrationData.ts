import * as yup from "yup";
import {gender_regex} from "../regex";
import type {RegistrationData} from "../MessagingSchema";

const requestBody = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().email().required(),
    name_family: yup.string(),
    name_given: yup.string().required(),
    name_middle: yup.string(),
    name_prefix: yup.string(),
    name_suffix: yup.string(),
    gender: yup.string().matches(gender_regex),
    address: yup.string()
});

export default async function (data: any): Promise<RegistrationData> {
    data = await requestBody.validate(data);
    return data;
}