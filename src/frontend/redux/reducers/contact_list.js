/**
 *
 * @param {AppData.State} store
 * @return {AppData.ContactList}
 */
function contactListSelector(store) {
    return store.contact_list ?? null
}

