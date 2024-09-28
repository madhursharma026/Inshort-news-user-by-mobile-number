import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";

export default function Screen2() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#E0F7FA]">
      <TouchableOpacity
        className="absolute top-4 left-4 p-2 bg-white rounded shadow"
        onPress={() => router.back()}
      >
        <Icon name="arrow-back" size={24} color="#004D40" />
      </TouchableOpacity>
      <View className="flex-1 items-center px-5 justify-center">
        <Image
          accessibilityLabel="App logo"
          className="w-[200px] h-[200px] mb-5"
          source={require("../../assets/favicon.png")}
        />
        <Text className="text-2xl text-[#004D40] mb-3 font-bold">
          Personalize Your Feed
        </Text>
        <Text className="text-base text-[#00796B] text-center leading-6">
          The second screen showcases the app's customization features, with
          users selecting topics like Politics, Entertainment, and Health using
          interactive icons or checkboxes. The background features subtle
          news-themed graphics, and the color scheme includes engaging pops of
          green, yellow, and red against a light backdrop.
        </Text>
      </View>
      <Pressable
        onPress={() => router.push("onboarding/screen3")}
        className="m-5 p-4 rounded mb-10 items-center justify-center bg-[#007bff]"
      >
        <Text className="text-base text-white font-bold">Select Language</Text>
      </Pressable>
    </SafeAreaView>
  );
}
