import io from "socket.io-client";
import {SESSION_STATE_SET} from "../redux/actions";
import deferredPromise from "../../share/deferredPromise";

/**
 * enum dla stany sesji
 * @readonly
 * @enum {string}
 */
export const SessionState = {
    Init: "initializing",
    Error: "error",
    Connected: "connected",
    Disconnected: "disconnected"
};


export default class Session {
    /**
     * @param {AppData.BackendData} backend_data
     * @param {AuthData} auth_data
     * @param {function} dispatch
     */
    constructor(backend_data, auth_data, dispatch) {
        console.log("Session.constructor");

        this._backend_data = backend_data;
        this._dispatch = dispatch;

        this._setState(SessionState.Init);

        this._socket = io(`http://${backend_data.session_url}`);

        this._socket.on("connect", async () => {
            let ok = await this.message("authSession", auth_data);

            if (ok) {
                this._setState(SessionState.Connected);
            } else {
                this._setState(SessionState.Error);
            }
        });

        this._socket.on("error", () => {
            this._setState(SessionState.Error);
        });

        this._socket.on("disconnect", () => {
            this._setState(SessionState.Disconnected);
        });
    }

    _setState(state) {

    }

    destructor() {
        this._socket.close();
    }

    /**
     * Implementacja asynchronicznego middleware'a
     * @param {string} name
     * @param {*} args
     * @return {Promise<*>}
     */
    message(name, ...args) {
        return new Promise((resolve, reject) => {
            this._socket.emit(name, ...args, ({error, data}) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            })
        })
    }

    /**
     *
     * @param {MessagePrototypeData} msg
     * @return {Promise<DatabaseT.Message>}
     */
    sendMessage(msg) {
        return this.message("sendMessage", msg);
    }

    /**
     *
     * @return {Promise<string[]>}
     */
    getMyContacts() {
        return this.message("getMyContacts");
    }
}
