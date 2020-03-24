import express from "express";
import {v4 as uuid} from 'uuid';

const package_json = require("./../../../package");
export const INSTANCE_ID = uuid();


/**
 *
 * @return {express.application}
 */
export default function rsoApp() {

    const app = /**@type{express.application}*/express();

    app.get("/version", (req, res) => {
        res.json({
            version: package_json.version
        })
    });

    app.get("/id", (req, res) => {
        res.json({
            id: INSTANCE_ID
        })
    });

    return app;
}