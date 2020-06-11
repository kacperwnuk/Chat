export default async function (username: string, password: string) {
    return username === "admin" && password === "admin";
}