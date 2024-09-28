import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedMode = await AsyncStorage.getItem("themeMode");
        if (savedMode !== null) {
          setIsDarkMode(JSON.parse(savedMode));
        }
      } catch (error) {
        console.error("Failed to load theme mode from AsyncStorage", error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    try {
      await AsyncStorage.setItem("themeMode", JSON.stringify(newMode));
    } catch (error) {
      console.error("Failed to save theme mode to AsyncStorage", error);
    }
    setIsDarkMode(newMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
