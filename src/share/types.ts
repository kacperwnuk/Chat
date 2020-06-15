/**
 * Zbiór różnych typów
 */
import DatabaseT from "./DatabaseT";

export type Dictionary<T> = { [key: string]: T }

export interface SessionAuthData {
    session_id: string
    secret_key: string
}

export type MessageContent = string;

export interface MessagePrototypeData {
    conversation_id: string,
    content: MessageContent
}

export type PromisifyFunction<Func extends (...params: any[]) => any> =
    (...params: Parameters<Func>) => Promise<ReturnType<Func>> | ReturnType<Func>;

export type RsoEnv = "development" | "docker-compose" | "kubernetes";
export type RsoServerType = "cdn" | "auth" | "session" | "adm";

export type HumanGender = "male" | "female" | "other";

export type UserStatus = {
    user_id: string
    status: "online" | "offline"
    timestamp:number
}