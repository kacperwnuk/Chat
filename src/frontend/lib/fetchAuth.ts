import {AuthMessagingSchema} from "../../share/MessagingSchema";
import AppData from "../redux/AppData";
import AppError, {AppErrorType} from "./AppError";
import HttpStatus from "http-status-codes";

export default async function <Key extends keyof AuthMessagingSchema>(
    key: Key,
    backend_data: AppData.BackendData,
    ...params: Parameters<AuthMessagingSchema[Key]>
): Promise<ReturnType<AuthMessagingSchema[Key]>> {

    let response = await fetch(`http://${backend_data.auth_url}/${key}`, {
        method: "POST",
        headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json"
        }),
        cache: "no-cache",
        body: JSON.stringify(params[0] ?? undefined),
    });

    try {
        response = await response;
    } catch (e) {
        throw new AppError(AppErrorType.CONNECTION);
    }

    if (response.status === HttpStatus.OK)
        return response.json();

    switch (response.status) {
        case HttpStatus.UNAUTHORIZED:
            throw new AppError(AppErrorType.ACCESS_DENIED);

        case HttpStatus.BAD_REQUEST:
        default:
            throw new AppError(AppErrorType.FATAL);
    }
}