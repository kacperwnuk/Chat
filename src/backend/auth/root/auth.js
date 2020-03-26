import * as yup from "yup";
import expressAsyncMiddleware from "../../share/expressAsyncMiddleware";
import authUser from "../data/authUser";
import createSessionForUser from "../data/createSessionForUser";

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

            let {
                username,
                password
            } = await requestBody.validate(req.body);

            let user = await authUser(username, password);
            let session = await createSessionForUser(user.user_id);

            res.send({
                user,
                session
            });
        }));
}