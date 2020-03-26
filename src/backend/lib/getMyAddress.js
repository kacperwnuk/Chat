import os from "os";

let ifaces = os.networkInterfaces();

let my_ips = Object.keys(ifaces)
    .map(ifname => ifaces[ifname])
    .reduce((a, i) => [...a, ...i], [])
    .filter(iface => iface.family === "IPv4")
    .map(iface => {
        return iface.address;
    });


/**
 *
 * @return {Promise<string[]>}
 */
export default async function () {
    return my_ips;
}