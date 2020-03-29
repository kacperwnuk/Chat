import * as yup from "yup";
import expressAsyncMiddleware from "../../lib/expressAsyncMiddleware";
import authUser from "../../data/authUser";
import isBasicLoginData from "../../../share/data-checker/isBasicLoginData";
import createSessionForUser from "../../data/createSessionForUser";

const requestBody = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
});

/**
 *
 * @param {e.Application} app
 */
export default function (app) {

    app.post("/auth",
        expressAsyncMiddleware(async (req, res) => {

            let {username, password} = await isBasicLoginData(req.body);

            let user = await authUser(username, password);
            let session = await createSessionForUser(user.user_id);

            /**@type{ResponseT.AuthS.auth}*/
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