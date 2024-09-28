import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name="screen1" options={{ headerShown: false }} />
      <Stack.Screen name="screen2" options={{ headerShown: false }} />
      <Stack.Screen name="screen3" options={{ headerShown: false }} />
    </Stack>
  );
}
