import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name="PhoneNumber" options={{ headerShown: false }} />
      <Stack.Screen name="OtpVerify" options={{ headerShown: false }} />
    </Stack>
  );
}
