export default interface Lang {
    language_button: string,
    lang_name: string,
    lang_name_english: string,
    app: {
        name: string
    },
    login_screen: {
        sign_invite: string,
        email_label: string
        password_label: string
        remember_me: string
        submit: string
        forgot_password: string
        sign_up: string
    },
    copyright: {
        prefix: string
        name: string
        suffix: string
    },
    error_msg: {
        message_send_fail: string
    }
}