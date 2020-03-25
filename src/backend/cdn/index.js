import path from "path";
import os from "os";
import id from "../share/rsoApp";
import * as express from "express";

const PORT = 8080;
const app = id();

app.use(express.static(path.join(__dirname, "../../public/")));

app.listen(PORT, () => {
    let ifaces = os.networkInterfaces();

    let my_ips = Object.keys(ifaces)
        .map(ifname => ifaces[ifname])
        .reduce((a, i) => [...a, ...i], [])
        .filter(iface => iface.family === "IPv4")
        .map(iface => {
            return iface.address;
        });

    console.log([
        "Uruchomiono:",
        ...my_ips.map(ip => `\thttp://${ip}:${PORT}`)
    ].join(os.EOL));
});

