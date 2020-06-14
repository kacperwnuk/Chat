import * as yup from "yup";
import {gender_regex} from "../regex";
import type {RegistrationData} from "../MessagingSchema";

const requestBody = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().email().required(),
    name_family: yup.string().required(),
    name_given: yup.string().required(),
    name_middle: yup.string().nullable(),
    name_prefix: yup.string().nullable(),
    name_suffix: yup.string().nullable(),
    gender: yup.string().matches(gender_regex).required(),
    address: yup.string().required(),
});

export default async function (data: any): Promise<RegistrationData> {
    data = await requestBody.validate(data);
    return data;
}