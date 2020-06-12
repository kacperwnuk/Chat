import express from "express";
import back_env from "../../lib/back_env";

const backend_js = `window.RSO_ENV=${JSON.stringify(back_env.RSO_FRONT_ENV)};`;

export default function (app: express.Application) {
    app.get("/backend.js", async (req, res) => {

        res.setHeader("content-type", "text/javascript");
        res.write(backend_js);
        res.end();
    })
}
