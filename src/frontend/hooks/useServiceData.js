import {useSelector} from "react-redux";

/**
 *
 * @param {ApplicationState} store
 * @return {ServiceData}
 */
function selector(store) {
    return store.serviceData;
}

/**
 * @return {ServiceData}
 */
export default function useServiceData() {

    let serviceData = useSelector(selector);

    return serviceData;
}