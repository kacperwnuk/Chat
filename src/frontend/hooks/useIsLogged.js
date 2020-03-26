import useUserData from "./useUserData";

/**
 *
 * @return {boolean}
 */
export default function () {
    let user_data = useUserData();
    return !!user_data;
}
