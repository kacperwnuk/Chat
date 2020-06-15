//
//
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
        username_label: string
        password_label: string
        remember_me: string
        submit: string
        forgot_password: string
        sign_up: string
    },
    register_screen: {
        sign_invite: string
        email_label: string
        password_label: string
        password2_label: string
        username_label: string
        name_family_label: string
        name_given_label: string
        name_middle_label: string
        name_prefix_label: string
        name_suffix_label: string
        address_label: string
        forgot_password: string
        submit: string
        sign_in: string
    },
    copyright: {
        prefix: string
        name: string
        suffix: string
    },
    profile: {
        username_label: string
        name_family_label: string
        name_given_label: string
        name_middle_label: string
        name_prefix_label: string
        name_suffix_label: string
        address_label: string
        empty: string
    }
    error_msg: {
        credentials_fail: string
        message_send_fail: string
    }
}