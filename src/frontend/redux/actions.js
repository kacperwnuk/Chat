export function makeAction(name, data) {
    return {type: name, data};
}

export const CREDENTIALS_DATA_REQUEST = "CREDENTIALS_DATA_REQUEST";
export const CREDENTIALS_DATA_SET = "CREDENTIALS_DATA_SET";

export const SESSION_STATE_SET = "SESSION_STATE_SET";
