import React from "react";
import {LanguageContext} from "../i18n/TranslateProvider";
import get from "lodash/get";

function translate(lang, id) {
    return get(lang, id, id);
}

/**
 *
 * @return {function(id:string)}
 */
export default function useTranslate() {
    const language = React.useContext(LanguageContext);

    return (id) => translate(language, id);
}
