import {
  View,
  Text,
  Alert,
  Image,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { APIURL } from "@env";
import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OtpVerify = () => {
  const router = useRouter();
  const inputRefs = useRef([]);
  const { phoneNumber } = useLocalSearchParams();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      return;
    }

    let otpArray = [...otp];
    otpArray[index] = value;
    setOtp(otpArray);

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    if (value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResendCode = () => {
    router.back();
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join("");

    if (otp.every((digit) => digit !== "")) {
      try {
        const response = await fetch(APIURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              mutation VerifyOtp($phoneNumber: String!, $otpCode: String!) {
                verifyOtp(phoneNumber: $phoneNumber, otpCode: $otpCode) {
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
              phoneNumber: phoneNumber,
              otpCode: otpCode,
            },
          }),
        });

        const result = await response.json();

        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        if (result.data.verifyOtp.success) {
          try {
            await AsyncStorage.setItem(
              "loginUserSessionId",
              result.data.verifyOtp.data.sessionId
            );
            Alert.alert("Success", "OTP Verified Successfully!");
            router.push("/onboarding");
          } catch (error) {
            Alert.alert("Error", "Failed to save session ID.");
          }
        } else {
          Alert.alert("OTP Verification Failed", result.data.verifyOtp.message);
        }
      } catch (error) {
        Alert.alert("Error", "Otp didn't match! Please try again.");
      }
    } else {
      alert("Please enter all OTP digits");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://img.freepik.com/premium-vector/otp-authentication-secure-verification-never-share-otp-bank-details-concept_251235-482.jpg",
          }}
          style={styles.illustration}
        />
      </View>

      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.subtitle}>
        We are automatically detecting an SMS sent to your mobile phone number
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleOtpChange(index, value)}
          />
        ))}
      </View>

      <Text style={styles.resendText}>
        Don’t receive the code?{" "}
        <Text style={styles.resendLink} onPress={handleResendCode}>
          Resend Code
        </Text>
      </Text>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  imageContainer: {
    marginBottom: 20,
  },
  illustration: {
    width: 200,
    height: 200,
    borderRadius: 400,
    resizeMode: "cover",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#7d7d7d",
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  otpContainer: {
    width: "90%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpInput: {
    width: 50,
    height: 50,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    borderColor: "#ccc",
  },
  resendText: {
    fontSize: 14,
    color: "#7d7d7d",
    marginBottom: 30,
  },
  resendLink: {
    color: "#7A5DF5",
    textDecorationLine: "underline",
  },
  verifyButton: {
    width: "80%",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "#7A5DF5",
  },
  verifyButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
});

export default OtpVerify;
