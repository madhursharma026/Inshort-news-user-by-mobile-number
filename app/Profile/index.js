import {
  View,
  Text,
  Alert,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [skippedLogin, setSkippedLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const storedPhoneNumber = await AsyncStorage.getItem(
          "loginUserPhoneNumber"
        );
        const skippedLoginStatus = await AsyncStorage.getItem("skippedLogin");

        if (storedPhoneNumber) {
          setPhoneNumber(storedPhoneNumber);
          setIsLoggedIn(true); // Set user as logged in if phone number is available
        } else if (skippedLoginStatus) {
          setSkippedLogin(true);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load data from storage");
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("loginUserPhoneNumber");
      await AsyncStorage.removeItem("loginUserSessionId");
      await AsyncStorage.removeItem("hasLaunched");
      await AsyncStorage.removeItem("skippedLogin");
      router.replace("/PhoneVerification"); // Redirect to phone verification or login screen
    } catch (error) {
      Alert.alert("Error", "Failed to logout. Try again.");
    }
  };

  const handleLogin = () => {
    router.replace("/PhoneVerification"); // Redirect to phone verification or login screen
  };

  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center bg-white px-5`}>
      {isLoggedIn ? (
        <>
          {/* Profile Information */}
          <Text style={tw`text-5xl font-bold mb-10 text-center`}>
            Profile Page
          </Text>
          <Image
            source={{
              uri: "https://img.freepik.com/premium-vector/man-profile-cartoon_18591-58482.jpg",
            }}
            style={tw`w-50 h-50 rounded-full`}
          />
          <View style={tw`w-full mb-5 py-2 px-4 flex-row items-center`}>
            <Text style={tw`text-xl text-black mr-2`}>Phone Number:</Text>
            <Text style={tw`text-xl text-black font-semibold`}>
              {phoneNumber ? `${phoneNumber}` : "Not available"}
            </Text>
          </View>

          <TouchableOpacity
            style={tw`w-full rounded-full bg-red-600 py-3 mb-5 items-center`}
            onPress={handleLogout}
          >
            <Text style={tw`text-lg text-white font-semibold`}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={tw`w-full rounded-full bg-blue-600 py-3 mb-5 items-center`}
          onPress={handleLogin}
        >
          <Text style={tw`text-lg text-white font-semibold`}>Login</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Profile;
