import {
  View,
  Alert,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { APIURL } from "@env";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PhoneNumber = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleVerify = async () => {
    if (phoneNumber.length < 10) {
      Alert.alert(
        "Invalid Number",
        "Please enter a valid 10-digit phone number."
      );
      return;
    }

    try {
      const response = await fetch(APIURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation GenerateOtp($phoneNumber: String!) {
              generateOtp(phoneNumber: $phoneNumber) {
                success
                message
                data {
                  phoneNumber
                  sessionId
                }
              }
            }
          `,
          variables: {
            phoneNumber: `+91${phoneNumber}`,
          },
        }),
      });
      const result = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      if (result.data.generateOtp.success) {
        Alert.alert("Success", "OTP Sent Successfully!");
        setPhoneNumber("");
        router.push({
          pathname: "PhoneVerification/OtpVerify",
          params: { phoneNumber: `+91${phoneNumber}` },
        });
      } else {
        Alert.alert("Failed", "Something went wrong");
      }
    } catch (error) {
      Alert.alert("Error", `User already exists with +91${phoneNumber}`);
    }
  };

  const handleSkip = () => {
    AsyncStorage.setItem("loginUserSessionId", "skippedLogin");
    router.push("/onboarding");
  };

  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center bg-white px-5`}>
      {/* Skip Button */}
      <TouchableOpacity
        onPress={handleSkip}
        style={tw`absolute top-0 right-0 mt-5 mr-5`}
      >
        <Text style={tw`text-sm text-purple-600 font-bold`}>Skip Login</Text>
      </TouchableOpacity>

      <View style={tw`mb-10`}>
        <Image
          source={{
            uri: "https://img.freepik.com/premium-vector/online-appointment-booking-concept-people-using-scheduling-software_251235-373.jpg",
          }}
          style={tw`w-50 h-50 rounded-full`}
        />
      </View>

      <Text style={tw`text-lg font-bold mb-2 text-center`}>
        Enter Your Mobile Number
      </Text>
      <Text style={tw`text-sm text-gray-500 mb-7 text-center`}>
        We will send you a confirmation code through call
      </Text>

      <View
        style={tw`w-full mb-5 rounded-lg py-2 px-4 flex-row items-center bg-gray-200`}
      >
        <Image
          source={{
            uri: "https://img.freepik.com/free-vector/illustration-india-flag_53876-27130.jpg",
          }}
          style={tw`w-7 h-5 mr-3`}
        />
        <Text style={tw`text-base text-black mr-2`}>+91</Text>
        <TextInput
          maxLength={10}
          value={phoneNumber}
          style={tw`flex-1 text-base text-black`}
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
          placeholder="Enter your phone number"
        />
      </View>

      <TouchableOpacity
        style={tw`w-full rounded-full bg-purple-600 py-3 mb-5 items-center`}
        onPress={handleVerify}
      >
        <Text style={tw`text-lg text-white font-semibold`}>Generate OTP</Text>
      </TouchableOpacity>

      <Text style={tw`text-xs text-gray-500 text-center`}>
        By continuing you agree with Calorie Challenge{" "}
        <Text style={tw`text-purple-600 underline`}>
          Terms of Use & Privacy Policy
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default PhoneNumber;
