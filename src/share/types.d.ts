export interface BasicLoginData {
    username: string
    password: string
}

export interface AuthData {
    session_id: string
    secret_key: string
}

type MessageContent = string;

export interface MessagePrototypeData {
    to_type: string,
    to_id: string,
    content: MessageContent
}