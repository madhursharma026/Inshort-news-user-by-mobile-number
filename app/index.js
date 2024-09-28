import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [isUserLogin, setIsUserLogin] = useState(null);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkUserLoginORNot = async () => {
      const checkingIsUserLogin = await AsyncStorage.getItem(
        "loginUserSessionId"
      );
      if (checkingIsUserLogin !== null) {
        setIsUserLogin(true);
      } else {
        setIsUserLogin(false);
      }
    };

    checkUserLoginORNot();
  }, []);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem("hasLaunched");
      setIsFirstLaunch(hasLaunched === null);
    };

    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null || isUserLogin === null) return null;

  return (
    <>
      {isUserLogin ? (
        <>
          {isFirstLaunch ? (
            <Redirect href="/onboarding" />
          ) : (
            <Redirect href="/(tabs)" />
          )}
        </>
      ) : (
        <Redirect href="/PhoneVerification" />
      )}
    </>
  );
}
