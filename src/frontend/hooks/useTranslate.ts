import React from "react";
import {LanguageContext} from "../i18n/TranslateProvider";
import get from "lodash/get";
import type Lang from "../i18n/Lang";

function translate(lang: Lang, id: string) {
    return get(lang, id, id);
}

export default function () {
    const language: Lang = React.useContext(LanguageContext);

    return (id: string) => translate(language, id);
}
