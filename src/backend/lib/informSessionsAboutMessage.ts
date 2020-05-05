import DatabaseT from "../../share/DatabaseT";
import {publisher} from "../session";
import {channelName} from "./redisBuilder";

type Callback = (message: DatabaseT.Message) => void;
export const subscriptions: {
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

    publisher.publish(channelName, JSON.stringify(message));
    // subscriptions[message.conversation_id].forEach(cb => cb(message));
}