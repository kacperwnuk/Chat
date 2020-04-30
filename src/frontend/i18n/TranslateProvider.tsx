import * as React from "react";
import Languages from "./lang/index";
import noop from "../../share/noop";
import Lang from "./Lang";

export const LanguageContext = React.createContext<{
    language: Lang,
    setLanguage: (lang: Lang) => void
}>({
    language: Languages.default,
    setLanguage: noop
});

export default function TranslateProvider(props: {
    children: React.ReactNode
}) {

    const [language, setLanguage] = React.useState(Languages.default);

    return <LanguageContext.Provider value={{language, setLanguage}}>
        {props.children}
    </LanguageContext.Provider>
}