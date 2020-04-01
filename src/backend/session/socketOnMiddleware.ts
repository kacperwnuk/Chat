import socket_io from "socket.io";
import resolveError from "../lib/resolveError";
import {SessionMessagingSchemaByClient} from "../../share/MessagingSchema";

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
            cb({data})
        } catch (error) {
            cb({error: resolveError(error)});
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
        let cb = args.pop();

        try {
            // @ts-ignore
            let data = await func(...args);
            cb({data})
        } catch (error) {
            cb({error: resolveError(error)});
        }
    })
}
