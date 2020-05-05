import express from "express";
import expressAsyncMiddleware from "../../lib/expressAsyncMiddleware";
import authUser from "../../data/authUser";
import isBasicLoginData from "../../../share/data-checker/isBasicLoginData";
import createSessionForUser from "../../data/createSessionForUser";

export default function (app: express.Application) {

    app.post("/auth",
        expressAsyncMiddleware(async (req, res) => {

            let {username, password} = await isBasicLoginData(req.body);

            let user = await authUser(username, password);
            let session = await createSessionForUser(user.user_id);
            let response = {
                user,
                auth_data: {
                    session_id: session.session_id,
                    secret_key: session.secret_key
                }
            };
            res.send(response);
        }));
}