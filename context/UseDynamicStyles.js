import { useTheme } from "./ThemeContext";

const UseDynamicStyles = () => {
  const { isDarkMode } = useTheme();

  return {
    textColor: {
      color: isDarkMode ? "#FFFFFF" : "#000000",
    },
    backgroundColor: {
      backgroundColor: isDarkMode ? "#282C35" : "#f1f1f1",
    },
    footerTextColor: {
      color: isDarkMode ? "#000000" : "#FFFFFF",
    },
    footerBackgroundColor: {
      backgroundColor: isDarkMode ? "#f1f1f1" : "#282C35",
    },
    topQuaterCircle: {
      backgroundColor: isDarkMode ? "rgb(100 116 139)" : "rgb(243 232 255)",
    },
  };
};

export default UseDynamicStyles;
