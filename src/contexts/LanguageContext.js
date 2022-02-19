import React, { useState } from "react";

export const languageContext = React.createContext();

const LanguageStore = ({ children }) => {
  // new stuff starts
  const [language, setLangauge] = useState("English");
  return (
    <languageContext.Provider value={[language, setLangauge]}>
      {children}
    </languageContext.Provider>
  );
};

export default LanguageStore;
