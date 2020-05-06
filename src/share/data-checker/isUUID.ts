import * as yup from "yup";
import {uuid_regex} from "../regex";

const body = yup.string().matches(uuid_regex);

export default function (uuid: string): Promise<string> {
    return body.validate(uuid);
}
