import useSession from "./useSession";
import AppError from "../lib/AppError";

/**
 *
 * @return {function(proto:MessagePrototypeData): DatabaseT.Message}
 */
export default function () {
    const session = useSession();

    return async (proto) => {
        if (session === null) {
            throw new AppError(AppError.Type.FATAL);
        }

        return session.sendMessage({
            ...proto
        })
    }
}