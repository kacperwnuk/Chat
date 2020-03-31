import isAuthData from "../../share/data-checker/isAuthData";
import getSession from "../data/getSession";
import logger from "../../share/logger";
import {socketOnceMiddleware, socketOnMiddleware} from "../lib/socketOnMiddleware";
import isMessagePrototypeData from "../../share/data-checker/isMessagePrototypeData";
import sendMessage from "../data/sendMessage";
import getUserContacts from "../data/getUserContacts";

/**
 *
 * @param {SocketIO.Socket} socket
 */
export default function (socket) {
    const myLogger = logger.child({
        label: `SocketIO: ${socket.id}`
    });

    myLogger.info("connected");

    let user_id = "", session_id = "";

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

    socketOnMiddleware(socket, "disconnect", async () => {
        myLogger.info("disconnected");
    });


    function initMessagingWithAuthSocket(socket) {

        socketOnMiddleware(socket, "sendMessage", async (msg_proto) => {
            msg_proto = await isMessagePrototypeData(msg_proto);

            return await sendMessage({
                from: user_id,
                session_id: session_id,
                to_type: msg_proto.to_type,
                to_id: msg_proto.to_id,
                content: msg_proto.content
            });
        });

        socketOnMiddleware(socket, "getMyContacts", async () => {

            return await getUserContacts(user_id);
        });
    }
}

