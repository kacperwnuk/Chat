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
    to_type: string,
    to_id: string,
    content: MessageContent
}