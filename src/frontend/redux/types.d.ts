interface ApplicationState {
    userCredentials: UserCredentials
    serviceData?: ServiceData
}

interface UserCredentials {
    isLogged: boolean
    username?: string
    sessionKey?: string
}

interface ServiceData {
    sessionUrl: string
    authUrl: string
    cdnUrl: string
}