import Redis from "redis"

export const channelName = "notification";
export const messageObj = "Message";

export function createPublisher(host: string, port: number) {
    return createRedisClient(host, port);
}

export function createSubscriber(host: string, port: number) {
    let client = createRedisClient(host, port);
    client.subscribe(channelName);
    return client;
}

function createRedisClient(host: string, port: number) {
    return Redis.createClient({
        host: host,
        port: port
    });
}

