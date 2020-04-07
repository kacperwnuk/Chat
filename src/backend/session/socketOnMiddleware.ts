import socket_io from "socket.io";
import resolveError from "../lib/resolveError";
import {
    SessionMessagingSchemaByClient,
    SessionMessagingSchemaByServer,
    SocketMiddlewareReturn
} from "../../share/MessagingSchema";

export function socketOnMiddleware<Key extends keyof SessionMessagingSchemaByClient>(
    socket: socket_io.Socket,
    name: Key,
    func: (
        ...params: Parameters<SessionMessagingSchemaByClient[Key]>
    ) => Promise<ReturnType<SessionMessagingSchemaByClient[Key]>> | ReturnType<SessionMessagingSchemaByClient[Key]>
) {
    socket.on(name, async (...args) => {
        let cb = args.pop();

        try {
            // @ts-ignore
            let data = await func(...args);
            return cb({data})
        } catch (error) {
            return cb({error: resolveError(error)});
        }
    })
}

export function socketOnceMiddleware<Key extends keyof SessionMessagingSchemaByClient>(
    socket: socket_io.Socket,
    name: Key,
    func: (
        ...params: Parameters<SessionMessagingSchemaByClient[Key]>
    ) => Promise<ReturnType<SessionMessagingSchemaByClient[Key]>> | ReturnType<SessionMessagingSchemaByClient[Key]>
) {
    socket.once(name, async (...args) => {
        let cb: (arg: SocketMiddlewareReturn) => void = args.pop();

        try {
            // @ts-ignore
            let data = await func(...args);
            return cb({data})
        } catch (error) {
            return cb({error: resolveError(error)});
        }
    })
}

export function socketEmitMiddleware<Key extends keyof SessionMessagingSchemaByServer>(
    socket: socket_io.Socket,
    name: Key,
    ...params: Parameters<SessionMessagingSchemaByServer[Key]>
) {
    return new Promise<ReturnType<SessionMessagingSchemaByServer[Key]>>((resolve, reject) => {
        socket.emit(name, ...params, (ret: SocketMiddlewareReturn) => {
            if (ret.hasOwnProperty("error")) {
                reject(ret.error);
            } else {
                resolve(ret.data);
            }
        })
    });
}
