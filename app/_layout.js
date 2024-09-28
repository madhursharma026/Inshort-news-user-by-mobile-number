import tw from "twrnc";
import { useEffect } from "react";
import { Stack } from "expo-router";
import Constants from "expo-constants";
import { View, StatusBar, LogBox } from "react-native";
import { setupOneSignal } from "../context/SetupOneSignal";
import { ReadNewsProvider } from "../context/ReadNewsContext";
import { LanguageProvider } from "../context/LanguageContext";
import { BookmarkProvider } from "../context/BookmarkContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

const Layout = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
    // setupOneSignal();
  }, []);

  return (
    <SafeAreaProvider style={tw`flex-1`}>
      <ThemeProvider>
        <LanguageProvider>
          <BookmarkProvider>
            <ReadNewsProvider>
              <ThemedLayout />
            </ReadNewsProvider>
          </BookmarkProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

function ThemedLayout() {
  const { isDarkMode } = useTheme();
  const backgroundColor = isDarkMode ? "#282C35" : "#f1f1f1";
  const barStyle = isDarkMode ? "light-content" : "dark-content";

  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      <View
        style={[
          tw`flex-1 pt-[${Constants.statusBarHeight}px]`,
          { backgroundColor },
        ]}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade",
          }}
        >
          <Stack.Screen name="PhoneVerification" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="BookmarkNews/index" />
          <Stack.Screen name="ReadNews/index" />
          <Stack.Screen name="ContactUs/index" />
          <Stack.Screen name="TermsOfService/index" />
          <Stack.Screen
            name="LinkViewer/index"
            options={{
              presentation: "modal",
              gestureDirection: "vertical",
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen name="ImageViewer/index" />
          <Stack.Screen name="SingleArticle/index" />
        </Stack>
      </View>
    </>
  );
}

export default Layout;
