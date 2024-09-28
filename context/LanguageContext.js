import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const loadPreferredLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem("preferredLanguage");
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    };
    loadPreferredLanguage();
  }, []);

  const updateLanguage = async (newLanguage) => {
    setLanguage(newLanguage);
    await AsyncStorage.setItem("preferredLanguage", newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
