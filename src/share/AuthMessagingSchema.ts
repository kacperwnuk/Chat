import type AppData from "../frontend/redux/AppData";

declare namespace AuthMessagingSchema {
    type auth = AppData.CredentialsData;
}

export default AuthMessagingSchema;