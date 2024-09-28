import React from "react";
import { useRouter } from "expo-router";
import { View, Text, Image, Pressable, SafeAreaView } from "react-native";

export default function Screen1() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#E0F7FA]">
      <View className="flex-1 items-center px-5 justify-center">
        <Image
          accessibilityLabel="App logo"
          className="w-[200px] h-[200px] mb-5"
          source={require("../../assets/favicon.png")}
        />
        <Text className="text-2xl text-[#004D40] mb-3 font-bold">
          Discover News Easily
        </Text>
        <Text className="text-base text-[#00796B] text-center leading-6">
          Explore a vibrant and modern design showcasing news articles and
          categories like World News, Technology, and Sports. Enjoy easy
          navigation with a clean blue and white color palette.
        </Text>
      </View>
      <Pressable
        onPress={() => router.push("onboarding/screen2")}
        className="m-5 p-4 rounded mb-10 items-center justify-center bg-[#007bff]"
      >
        <Text className="text-base text-white font-bold">Next</Text>
      </Pressable>
    </SafeAreaView>
  );
}
