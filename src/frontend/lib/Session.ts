import io from "socket.io-client";
import type AppData from "../redux/AppData";
import type {
    SessionMessagingSchemaByClient,
    SessionMessagingSchemaByServer,
    SocketMiddlewareReturn
} from "../../share/MessagingSchema";
import type {PromisifyFunction, SessionAuthData} from "../../share/types";
import {Action, makeAction} from "../redux/actions";

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
            let ok = await this.emit("authSession", auth_data);

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

        this.on("newMessage", message => {
            this.dispatch(makeAction("MESSAGE_ADD2DIC", message));
        })
    }

    destructor() {
        this.socket.close();
    }

    /**
     * Implementacja asynchronicznego middleware'a
     */
    emit<Key extends keyof SessionMessagingSchemaByClient>(
        name: Key,
        ...args: Parameters<SessionMessagingSchemaByClient[Key]>
    ): Promise<ReturnType<SessionMessagingSchemaByClient[Key]>> {

        return new Promise((resolve, reject) => {
            this.socket.emit(name, ...args, (ret: SocketMiddlewareReturn) => {

                if (ret.hasOwnProperty("error")) {
                    reject(ret.error);
                } else {
                    resolve(ret.data);
                }
            })
        })
    }

    on<Key extends keyof SessionMessagingSchemaByServer>(
        name: Key,
        func: PromisifyFunction<SessionMessagingSchemaByServer[Key]>
    ) {
        this.socket.on(name, async (...args: any[]) => {
            let cb: (arg: SocketMiddlewareReturn) => void = args.pop();
            try {
                // @ts-ignore
                let data = await func(...args);
                cb({data})
            } catch (error) {
                cb({error});
            }
        })
    }


    setReady(state: boolean) {

    }

    dispatch(action: Action) {

    }
}
