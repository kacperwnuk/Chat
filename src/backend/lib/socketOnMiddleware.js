import resolveError from "./resolveError";

/**
 *
 * @param socket
 * @param {string} name
 * @param {function} func
 */
export function socketOnMiddleware(socket, name, func) {
    socket.on(name, async (...args) => {
        let cb = args.pop();

        try {
            let data = await func(...args);
            cb({data})
        } catch (error) {
            cb({error: resolveError(error)});
        }
    })
}

/**
 *
 * @param socket
 * @param {string} name
 * @param {function} func
 */
export function socketOnceMiddleware(socket, name, func) {
    socket.once(name, async (...args) => {
        let cb = args.pop();

        try {
            let data = await func(...args);
            cb({data})
        } catch (error) {
            cb({error: resolveError(error)});
        }
    })
}
