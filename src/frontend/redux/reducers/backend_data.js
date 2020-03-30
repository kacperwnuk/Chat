import {useSelector} from "react-redux";

/**
 *
 * @param {AppData.State} store
 * @return {AppData.BackendData}
 */
export function selectorBackendData(store) {
    return store.backend_data;
}

/**
 * @return {AppData.BackendData}
 */
export function useBackendData() {
    return  useSelector(selectorBackendData);
}