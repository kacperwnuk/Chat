import * as yup from "yup";

const requestBody = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
});

/**
 *
 * @param data
 * @return {Promise<BasicLoginData>}
 */
export default function (data) {
    return requestBody.validate(data);
}