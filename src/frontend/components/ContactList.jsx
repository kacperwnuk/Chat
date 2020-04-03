import React from "react";
import {useContactList} from "../redux/reducers/contact_list";
import ContactRow from "./ContactRow";

export default function ContactList() {
    const contact_list = useContactList();

    if (contact_list === null)
        return <div>Ładowanie</div>;

    return <div>
        {contact_list.map(id => <ContactRow key={id} userId={id}/>)}
    </div>
}