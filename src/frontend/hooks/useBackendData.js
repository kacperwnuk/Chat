import {useSelector} from "react-redux";

/**
 *
 * @param {AppData.State} store
 * @return {AppData.BackendData}
 */
function selector(store) {
    return store.backend_data;
}

/**
 * @return {AppData.BackendData}
 */
export default function () {

    let backendData = useSelector(selector);

    return backendData;
}