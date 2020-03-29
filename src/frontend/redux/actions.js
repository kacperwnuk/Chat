export function createAction(name, data) {
    return {type: name, data};
}

export const SET_CREDENTIALS_DATA = "SET_CREDENTIALS_DATA";
export const SET_SESSION_STATE = "SET_SESSION_STATE";
