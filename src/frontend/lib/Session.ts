import io from "socket.io-client";
import type AppData from "../redux/AppData";
import type {SessionMessagingSchemaByClient} from "../../share/SessionMessagingSchema";
import type {MessagePrototypeData, SessionAuthData} from "../../share/types";

export default class Session {
    private backend_data: AppData.BackendData;
    private socket: SocketIOClient.Socket;

    constructor(
        backend_data: AppData.BackendData,
        auth_data: SessionAuthData
    ) {
        console.log("Session.constructor");

        this.backend_data = backend_data;

        this.socket = io(`http://${backend_data.session_url}`);

        this.socket.on("connect", async () => {
            let ok = await this.message("authSession", auth_data);

            if (ok) {
                this.setReady(true);
            } else {
                this.setReady(false);
            }
        });

        this.socket.on("error", () => {
            this.setReady(false);
        });

        this.socket.on("disconnect", () => {
            this.setReady(false);
        });
    }

    setReady(state: boolean) {

    }

    destructor() {
        this.socket.close();
    }

    /**
     * Implementacja asynchronicznego middleware'a
     * @param {string} name
     * @param {*} args
     * @return {Promise<*>}
     */
    message<Key extends keyof SessionMessagingSchemaByClient>(
        name: Key,
        ...args: Parameters<SessionMessagingSchemaByClient[Key]>
    ): Promise<ReturnType<SessionMessagingSchemaByClient[Key]>> {
        return new Promise((resolve, reject) => {
            this.socket.emit(name, ...args, (ret: { error?: any, data?: any }) => {

                if (ret.hasOwnProperty("error")) {
                    reject(ret.error);
                } else {
                    resolve(ret.data);
                }
            })
        })
    }

    sendMessage(msg: MessagePrototypeData) {
        return this.message("sendMessage", msg);
    }

    getMyContacts() {
        return this.message("getMyContacts");
    }
}
