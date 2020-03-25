import * as React from "react";
import lang from "./lang";

export const LanguageContext = React.createContext(lang.polish);

export default function TranslateProvider({children}) {

    return <LanguageContext.Provider value={lang.polish}>
        {children}
    </LanguageContext.Provider>
}