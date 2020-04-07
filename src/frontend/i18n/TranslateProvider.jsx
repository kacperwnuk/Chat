import * as React from "react";
import Languages from "./lang/index";
import noop from "../../share/noop";
export const LanguageContext = React.createContext({
    language: Languages.default,
    setLanguage: noop
});
console.log("HERE");
export default function TranslateProvider({children}) {
    const [language, setLanguage] = React.useState(Languages.default);
    return <LanguageContext.Provider value={{language, setLanguage}}>
        {children}
    </LanguageContext.Provider>
}