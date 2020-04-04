import * as React from "react";
import Languages from "./lang";
import noop from "../../share/noop";

export const LanguageContext = React.createContext({
    language: Languages.default,
    setLanguage: noop
});

export default function TranslateProvider({children}) {
    console.log("TranslateProvider");

    const [language, setLanguage] = React.useState(Languages.default);

    return <LanguageContext.Provider value={{language, setLanguage}}>
        {children}
    </LanguageContext.Provider>
}