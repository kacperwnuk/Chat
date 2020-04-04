import socket_io from "socket.io";
import isAuthData from "../../share/data-checker/isAuthData";
import getSession from "../data/getSession";
import logger from "../../share/logger";
import {socketEmitMiddleware, socketOnceMiddleware, socketOnMiddleware} from "./socketOnMiddleware";
import isMessagePrototypeData from "../../share/data-checker/isMessagePrototypeData";
import sendMessage from "../data/sendMessage";
import getUserContacts from "../data/getUserContacts";
import {MessagePrototypeData} from "../../share/types";
import getUserData from "../data/getUserData";
import {addSubscription, removeSubscription} from "../lib/informSessionsAboutMessage";
import DatabaseT from "../../share/DatabaseT";

export default function (socket: socket_io.Socket) {
    const myLogger = logger.child({
        label: `SocketIO: ${socket.id}`
    });

    myLogger.info("connected");

    let user_id = "", session_id = "";

    socket.on("disconnect", async () => {
        removeSubscription(user_id, onNewMessage);
        myLogger.info("disconnected");
    });

    socketOnceMiddleware(socket, "authSession", async (auth_data) => {

        auth_data = await isAuthData(auth_data);
        let session = await getSession(auth_data.session_id);

        if (session === null || session.secret_key !== auth_data.secret_key) {
            myLogger.warn("auth failed");

            return false;
        } else {
            myLogger.warn("auth succeed");

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

        addSubscription(user_id, onNewMessage);

        socketOnMiddleware(socket, "sendMessage", async (msg_proto: MessagePrototypeData) => {
            msg_proto = await isMessagePrototypeData(msg_proto);

            return await sendMessage({
                from_user_id: user_id,
                conversation_id: msg_proto.conversation_id,
                session_id: session_id,
                content: msg_proto.content
            });
        });

        socketOnMiddleware(socket, "getMyContacts", async () => {

            return await getUserContacts(user_id);
        });

        socketOnMiddleware(socket, "getUserData", async (user_id: string) => {

            return await getUserData(user_id);
        });
    }
}

