/**
 *
 * @param {string} username
 * @param {string} password
 * @return {Promise<UserCredentials>}
 */
export default async function fetchCredentials(username, password) {
    return {
        isLogged: true,
        sessionKey: "dupa",
        username
    };
}