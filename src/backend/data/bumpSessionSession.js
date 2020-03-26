import emitSessionEvent from "./emitSessionEvent";

/**
 *
 * @param {string} session_id
 * @return {Promise<void>}
 */
export default function (session_id) {
    return emitSessionEvent(session_id, "bump", {});
}