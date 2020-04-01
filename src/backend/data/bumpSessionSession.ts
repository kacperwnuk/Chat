import emitSessionEvent from "./emitSessionEvent";

export default function (session_id: string): Promise<void> {
    return emitSessionEvent(session_id, "bump", {});
}