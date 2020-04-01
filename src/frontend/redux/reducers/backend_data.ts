import {useSelector} from "react-redux";
import type AppData from "../AppData";

export function backendDataSelector(store: AppData.State): AppData.BackendData {
    return store.backend_data;
}


export function useBackendData(): AppData.BackendData {
    return useSelector(backendDataSelector);
}