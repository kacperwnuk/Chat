import Redis, {RedisClient} from "redis";
import DatabaseT from "../../share/DatabaseT";
import isMessage from "../../share/data-checker/isMessage";

export interface BrokerSubscription {
    unsubscribe: () => void
}

export interface BrokerConParams {
    host: string,
    port: number
}

export default class BrokerCon {
    private dbs: BrokerConParams[];
    private redis_publisher?: RedisClient;


    constructor(params: BrokerConParams[]) {

        this.dbs = params;
    }

    private createClient() {
        return Redis.createClient({
            host: this.dbs[0].host,
            port: this.dbs[0].port
        });
    }

    private publish(channel_name: string, value: any) {
        if (!this.redis_publisher) {
            this.redis_publisher = this.createClient();
        }

        this.redis_publisher.publish(channel_name, value);
    }

    subscribeForNewMessages(
        user_id: string,
        callback: (message: DatabaseT.Message) => void
    ): BrokerSubscription {
        const client = this.createClient();
        client.subscribe(`user:${user_id}`)

        const redis_callback = async (message_json: string) => {
            const message = await isMessage(JSON.parse(message_json));

            callback(message);
        }

        client.on("message", redis_callback);

        return {
            unsubscribe: () => {
                client.off("message", redis_callback);
                client.quit();
            }
        }
    }

    publishNewMessage(message: DatabaseT.Message): void {
        this.publish(`user:${message.conversation_id}`, message);
    }
}