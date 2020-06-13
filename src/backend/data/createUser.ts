import {v4 as uuid} from 'uuid';
import {databaseUser} from "../lib/server";
import type DatabaseT from "../../share/DatabaseT";
import {RegistrationData} from "../../share/MessagingSchema";
import getUserData from "./getUserData";

export default async function (registration_data: RegistrationData): Promise<DatabaseT.User> {
    let user_id = uuid();

    await databaseUser.query(`
 
    insert into public.users
        (user_id, law_type, username, 
        name_family, name_given, name_middle, name_prefix, name_suffix, 
        address, address_data, deleted, gender, email)
    values ($1::uuid, $2::text, $3::text, 
        $4::text, $5::text, $6::text, $7::text, $8::text,
        $9::text, $10::json, $11::boolean, $12::text, $13::text);
        
    `, [
        user_id, 'pl', registration_data.username,
        registration_data.name_family, registration_data.name_given, registration_data.name_middle, registration_data.name_prefix, registration_data.name_suffix,
        registration_data.address, '{}', false, registration_data.gender, registration_data.email
    ]);

    await databaseUser.query(`

    insert into public.basic_auth
        (user_id, password)
    values ($1::uuid, $2::text);
    
    `, [
        user_id, registration_data.password
    ]);

    return await getUserData(user_id);
}