import DatabaseT from "../../share/DatabaseT";

type Callback = (message: DatabaseT.Message) => void;
const subscriptions: {
    [user_id: string]: Callback[]
} = {};

export function addSubscription(user_id: string, callback: Callback) {
    let array = subscriptions[user_id] ?? [];
    array = [...array, callback];
    subscriptions[user_id] = array;
}

export function removeSubscription(user_id: string, callback: Callback) {
    let array = subscriptions[user_id] ?? [];
    let index = array.indexOf(callback);
    if (index < 0) return;
    array = [...array.slice(0, index), ...array.slice(index + 1)];
    subscriptions[user_id] = array;
}

export default async function (message: DatabaseT.Message) {
    subscriptions[message.conversation_id].forEach(cb => cb(message));
}