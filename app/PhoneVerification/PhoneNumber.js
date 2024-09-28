import {
  View,
  Alert,
  Text,
  Image,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { APIURL } from "@env";
import { useRouter } from "expo-router";
import React, { useState } from "react";

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://img.freepik.com/premium-vector/online-appointment-booking-concept-people-using-scheduling-software_251235-373.jpg",
          }}
          style={styles.illustration}
        />
      </View>

      <Text style={styles.title}>Enter Your Mobile Number</Text>
      <Text style={styles.subtitle}>We will send you a confirmation code</Text>

      <View style={styles.inputContainer}>
        <View style={styles.flagIcon}>
          <Image
            source={{
              uri: "https://img.freepik.com/free-vector/illustration-india-flag_53876-27130.jpg",
            }}
            style={{ width: 30, height: 20 }}
          />
        </View>
        <Text style={styles.prefix}>+91</Text>
        <TextInput
          maxLength={10}
          value={phoneNumber}
          style={styles.input}
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
          placeholder="Enter your phone number"
        />
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyText}>Generate OTP</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        By continuing you agree with Calorie Challenge{" "}
        <Text style={styles.linkText}>Terms of Use & Privacy Policy</Text>
      </Text>
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
    marginBottom: 40,
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
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
    backgroundColor: "#f2f2f2",
  },
  flagIcon: {
    marginRight: 10,
  },
  prefix: {
    fontSize: 16,
    color: "#000",
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  verifyButton: {
    width: "100%",
    borderRadius: 25,
    marginBottom: 20,
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "#7A5DF5",
  },
  verifyText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  footerText: {
    fontSize: 12,
    color: "#7d7d7d",
    textAlign: "center",
  },
  linkText: {
    color: "#7A5DF5",
    textDecorationLine: "underline",
  },
});

export default PhoneNumber;
