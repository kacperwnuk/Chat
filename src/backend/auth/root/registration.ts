import express from "express";
import expressAsyncMiddleware from "../../lib/expressAsyncMiddleware";
import isRegistrationData from "../../../share/data-checker/isRegistrationData";
import createUser from "../../data/createUser";
import createSessionForUser from "../../data/createSessionForUser";

export default function (app: express.Application) {

    app.post("/registration",
        expressAsyncMiddleware(async (req, res) => {

            const registration_data = await isRegistrationData(req.body);

            const user_data = await createUser(registration_data);
            const session = await createSessionForUser(user_data.user_id);

            const response = {
                user: user_data,
                auth_data: {
                    session_id: session.session_id,
                    secret_key: session.secret_key
                }
            };
            res.send(response);
        }));
}