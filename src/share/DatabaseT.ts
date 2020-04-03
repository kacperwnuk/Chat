import type {MessageContent} from "./types";

declare namespace DatabaseT {

    interface User {
        user_id: string
        law_type: string
        username: string
        name_family: string
        name_given: string
        name_middle: string
        name_prefix: string
        name_suffix: string
        address: string
        address_data: any
        deleted: boolean
        gender: string
        email: string
    }

    interface Session {
        input_time?: string
        version: string
        session_id: string
        secret_key: string
        user_id: string
        server_address: string[]
        args: any,
    }

    interface MessageKey {
        from_user_id: string
        conversation_id: string
        message_id: string
    }

    interface Message extends MessageKey {
        input_type: string
        version: string
        content: MessageContent
        session_id: string
        read: boolean
    }
}

export default DatabaseT;