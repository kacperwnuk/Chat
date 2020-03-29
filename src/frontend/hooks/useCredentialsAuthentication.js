import useBackendData from "./useBackendData";
import AppError from "../lib/AppError";
import HttpStatus from "http-status-codes";
import {useDispatch} from "react-redux";
import {setCredentialsData} from "../redux/reducers/setCredentialsData";

/**
 *
 * @param {string} authUrl
 * @param {string} username
 * @param {string} password
 * @return {Promise<ResponseT.AuthS.auth>}
 */
async function credentialsAuthentication(authUrl, username, password) {

    let response = await fetch(`http://${authUrl}/auth`, {
        method: "POST",
        headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }),
        cache: "no-cache",
        body: JSON.stringify({
            username,
            password
        }),
    });

    try {
        response = await response;
    } catch (e) {
        throw new AppError(AppError.Type.CONNECTION);
    }

    if (response.status === HttpStatus.OK)
        return response.json();

    switch (response.status) {
        case HttpStatus.UNAUTHORIZED:
            throw new AppError(AppError.Type.ACCESS_DENIED);

        case HttpStatus.BAD_REQUEST:
        default:
            throw new AppError(AppError.Type.FATAL);
    }
}


/**
 * @return {function(username:string, password:string)}
 */
export function useCredentialsAuthentication() {
    const backend_data = useBackendData();
    const dispatch = useDispatch();

    return async (username, password) => {
        let auth_data = await credentialsAuthentication(backend_data.auth_url, username, password);

        dispatch(setCredentialsData(auth_data));

        return auth_data;
    }
}