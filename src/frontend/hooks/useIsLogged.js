import {useCredentials} from "../redux/reducers/credentials_data";

/**
 *
 * @return {boolean}
 */
export default function useIsLogged() {
    return useCredentials() !== null;
}
