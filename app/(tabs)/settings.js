import tw from "twrnc";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import UseDynamicStyles from "../../context/UseDynamicStyles";
import { View, Text, Switch, TouchableOpacity } from "react-native";

const Settings = () => {
  const router = useRouter();
  const dynamicStyles = UseDynamicStyles();
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, updateLanguage } = useLanguage();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible((prevVisible) => !prevVisible);
  };

  const handleLanguageChange = (lang, code) => {
    updateLanguage(code);
    setDropdownVisible(false);
  };

  return (
    <View style={[tw`flex-1 px-4`, dynamicStyles.backgroundColor]}>
      <Text style={[tw`text-2xl mt-6 font-bold`, dynamicStyles.textColor]}>
        Settings
      </Text>

      <View
        style={tw`py-3 border-b border-gray-300 flex-row items-center justify-between`}
      >
        <Text style={[tw`text-base`, dynamicStyles.textColor]}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          style={tw`p-0 m-0`}
        />
      </View>

      <TouchableOpacity
        style={tw`py-3 border-b border-gray-300 flex-row items-center justify-between`}
        onPress={() => router.push("Profile")}
      >
        <Text style={[tw`text-base`, dynamicStyles.textColor]}>My Profile</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={tw`py-3 border-b border-gray-300 flex-row items-center justify-between`}
        onPress={() => router.push("ReadNews")}
      >
        <Text style={[tw`text-base`, dynamicStyles.textColor]}>History</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={tw`py-3 border-b border-gray-300 flex-row items-center justify-between`}
        onPress={() => router.push("BookmarkNews")}
      >
        <Text style={[tw`text-base`, dynamicStyles.textColor]}>
          Bookmark News
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`py-3 border-b border-gray-300 flex-row items-center justify-between`}
        onPress={() => router.push("TermsOfService")}
      >
        <Text style={[tw`text-base`, dynamicStyles.textColor]}>
          Terms of Service
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`py-3 border-b border-gray-300 flex-row items-center justify-between`}
        onPress={() => router.push("ContactUs")}
      >
        <Text style={[tw`text-base`, dynamicStyles.textColor]}>Contact Us</Text>
      </TouchableOpacity>

      <View
        style={tw`py-3 border-b border-gray-300 flex-row items-center justify-between`}
      >
        <Text style={[tw`text-base`, dynamicStyles.textColor]}>Language</Text>
        <TouchableOpacity
          onPress={toggleDropdown}
          style={tw`flex-row items-center`}
        >
          <Text style={[tw`text-base mr-2`, dynamicStyles.textColor]}>
            {language === "en" ? "English" : "Hindi"}
          </Text>
          <Ionicons
            name={dropdownVisible ? "chevron-up" : "chevron-down"}
            size={16}
            color={dynamicStyles.textColor.color}
          />
        </TouchableOpacity>
      </View>

      {dropdownVisible && (
        <View
          style={[
            tw`absolute top-44 right-5 z-10 rounded-lg shadow-lg`,
            dynamicStyles.footerBackgroundColor,
          ]}
        >
          <TouchableOpacity
            onPress={() => handleLanguageChange("English", "en")}
            style={tw`p-2 border-b border-gray-200`}
          >
            <Text style={[tw`text-base`, dynamicStyles.footerTextColor]}>
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleLanguageChange("Hindi", "hi")}
            style={tw`p-2 border-b border-gray-200`}
          >
            <Text style={[tw`text-base`, dynamicStyles.footerTextColor]}>
              Hindi
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Settings;
