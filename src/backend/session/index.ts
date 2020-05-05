import About from "../lib/About";
import {io, makeServer} from "../lib/server";
import handleNewSession from "./handleNewSession";
import env from "../lib/env";
import {createPublisher, createSubscriber} from "../lib/redisBuilder";
import {subscriptions} from "../lib/informSessionsAboutMessage";

About.instance_type = "session";

const redis_info = env.database.redis[0];
const host = redis_info.host;
const port = redis_info.port;

export const publisher = createPublisher(host, port);

const subscriber = createSubscriber(host, port);

// subscriber.on("subscribe", (channel, message) =>{
//     console.log("sub done");
// });

subscriber.on("message", (channel, message) => {
    const msg = JSON.parse(message);
    console.log("Poinformuj swoich uzytkownikow o wiadomosci" + message);
    if (subscriptions[msg.conversation_id] != undefined){
        subscriptions[msg.conversation_id].forEach(cb => cb(msg));
    }
});


makeServer({
    port: 8081
}).then(() => {
    console.log("open");
    io.on("connection", handleNewSession);
});

