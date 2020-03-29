import {MessageContent} from "./types";

declare namespace DatabaseT {

    interface UserT {
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

    interface SessionT {
        input_time?: string
        version: string
        session_id: string
        secret_key: string
        user_id: string
        server_address: string[]
        args: any,
    }

    interface MessageT {
        input_type: string
        version: string
        from: string
        message_id: string
        to_type: string
        to_id: string
        content: MessageContent
        session_id: string
        read: boolean
    }
}

export default DatabaseT;