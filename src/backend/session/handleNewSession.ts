import socket_io from "socket.io";
import isAuthData from "../../share/data-checker/isAuthData";
import getSession from "../data/getSession";
import {socketEmitMiddleware, socketOnceMiddleware, socketOnMiddleware} from "./socketOnMiddleware";
import isMessagePrototypeData from "../../share/data-checker/isMessagePrototypeData";
import sendMessage from "../data/sendMessage";
import getUserContacts from "../data/getUserContacts";
import {MessagePrototypeData, SessionAuthData} from "../../share/types";
import getUserData from "../data/getUserData";
import DatabaseT from "../../share/DatabaseT";
import isUUID from "../../share/data-checker/isUUID";
import {makeLogger} from "../../share/logger";
import noop from "../../share/noop";
import {redisBroker} from "../lib/server";

export default function (socket: socket_io.Socket) {
    const session_logger = makeLogger('Session', socket.id);

    session_logger.verbose("connected");

    let user_id = "", session_id = "";
    let unsubscribeBroker = noop;

    socket.on("disconnect", async () => {
        unsubscribeBroker();
        session_logger.verbose("disconnected");
    });

    socketOnceMiddleware(socket, "authSession", async (auth_data: SessionAuthData) => {

        auth_data = await isAuthData(auth_data);
        let session = await getSession(auth_data.session_id);

        if (session === null || session.secret_key !== auth_data.secret_key) {
            session_logger.warn("auth failed");

            return false;
        } else {
            session_logger.info("auth succeed");

            user_id = session.user_id;
            session_id = session.session_id;

            initMessagingWithAuthSocket(socket);
            return true;
        }
    });

    function onNewMessage(message: DatabaseT.Message) {
        socketEmitMiddleware(socket, "newMessage", message);
    }

    function initMessagingWithAuthSocket(socket: socket_io.Socket) {

        const subscription = redisBroker.subscribeForNewMessages(user_id, onNewMessage)
        unsubscribeBroker = () => subscription.unsubscribe();

        socketOnMiddleware(socket, "sendMessage", async (msg_proto: MessagePrototypeData) => {
            msg_proto = await isMessagePrototypeData(msg_proto);
            session_logger.data(`executing: sendMessage()`);

            return await sendMessage({
                from_user_id: user_id,
                conversation_id: msg_proto.conversation_id,
                session_id: session_id,
                content: msg_proto.content
            });
        });

        socketOnMiddleware(socket, "getMyContacts", async () => {
            session_logger.data(`executing: getMyContacts()`);

            return await getUserContacts(user_id);
        });

        socketOnMiddleware(socket, "getUserData", async (user_id: string) => {
            user_id = await isUUID(user_id);

            session_logger.data(`executing: getUserData("${user_id}")`);

            return await getUserData(user_id);
        });
    }
}

