import {useSelector} from "react-redux";

/**
 *
 * @param {AppData.State} store
 * @return {AppData.BackendData}
 */
function selector(store) {
    return store.backendData;
}

/**
 * @return {AppData.BackendData}
 */
export default function () {

    let backendData = useSelector(selector);

    return backendData;
}