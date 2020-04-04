import {SessionMessagingSchemaByServer} from "./MessagingSchema";

export type Dictionary<T> = { [key: string]: T }

export interface BasicLoginData {
    username: string
    password: string
}

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