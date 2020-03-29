import React from "react";
import useContactList from "../hooks/useContactList";

export default function ContactList() {
    const contactList = useContactList();

    if (contactList === null)
        return <div>Ładowanie</div>

    return <div>Kontakty</div>
}