import {useSelector} from "react-redux";

/**
 *
 * @param {AppData.State} store
 * @return {SessionState | null}
 */
function selector(store) {
    return store.session_state;
}

/**
 *
 * @return {SessionState | null}
 */
export default function () {
    let data = useSelector(selector);

    return data ?? null;
}
