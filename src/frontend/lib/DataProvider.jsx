import * as React from "react";
import useBackendData from "../hooks/useBackendData";
import AppError from "./AppError";
import HttpStatus from "http-status-codes";

function encodeQueryData(data) {
    return Object.keys(data).map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])).join("&");
}


class DataHandler {
    /**
     *
     * @param {AppData.BackendData} backend_data
     */
    constructor(backend_data) {
        this.backend_data = backend_data;
    }

    /**
     *
     * @param {string} url
     * @param {*} data
     * @param {RequestInit} options
     * @return {Promise<Response>}
     */
    async fetch(url, data, options = {}) {
        let response = await fetch(url, {
            method: "POST",
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            cache: "no-cache",
            body: JSON.stringify(data),
            ...options
        });

        try {
            response = await response;
        } catch (e) {
            throw new AppError(AppError.Type.CONNECTION);
        }

        if (response.status === HttpStatus.OK)
            return response;

        switch (response.status) {
            case HttpStatus.UNAUTHORIZED:
                throw new AppError(AppError.Type.ACCESS_DENIED);

            case HttpStatus.BAD_REQUEST:
            default:
                throw new AppError(AppError.Type.FATAL);
        }
    }

    get authUrl() {
        return `http://${this.backend_data.authUrl}`
    }

    /**
     *
     * @param {string} username
     * @param {string} password
     * @return {Promise<ResponseT.AuthS.auth>}
     */
    async authCredentials(username, password) {
        let response = await this.fetch(`${this.authUrl}/auth`, {
            username, password
        });

        return response.json();
    }

}

const Context = React.createContext();

export default function DataProvider({children}) {

    const backend_data = useBackendData();

    const [data_handler, setDataHandler] = React.useState(null);

    React.useState(() => {
        setDataHandler(new DataHandler(backend_data))
    }, [backend_data]);

    return <Context.Provider value={data_handler}>
        {children}
    </Context.Provider>
}

/**
 * @return {DataHandler}
 */
export function useDataProvider() {
    return React.useContext(Context);
}