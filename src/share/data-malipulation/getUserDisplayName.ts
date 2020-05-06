import type DatabaseT from "../DatabaseT";

export default function (user_data: DatabaseT.User): string {
    return [
        user_data.name_prefix,
        user_data.name_given,
        user_data.name_middle,
        user_data.name_family,
        user_data.name_suffix,
    ].filter(str => str).join(" ");
}
