import React from "react";
import {SessionContext} from "../lib/SessionProvider";

/**
 *
 * @return {Session | null}
 */
export default function () {
    let session = React.useContext(SessionContext);

    return session ?? null;
}
