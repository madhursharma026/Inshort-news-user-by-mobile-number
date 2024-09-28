import tw from "twrnc";
import { Tabs } from "expo-router";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function Layout() {
  const screenOptions = {
    headerShown: false,
    tabBarLabel: "", // Remove text label
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: tw`absolute bottom-0 left-0 right-0 bg-black`, // Set height to 60px
      }}
    >
      {/* Discover Tab */}
      <Tabs.Screen
        name="index"
        options={{
          ...screenOptions,
          title: "Discover",
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons
              name="magnifier"
              size={18}
              color={color}
              style={tw`pt-2`} // Fix the typo in pt-2 style
            />
          ),
        }}
      />

      {/* Feeds Tab */}
      <Tabs.Screen
        name="feeds"
        options={{
          ...screenOptions,
          title: "Feeds",
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons
              name="notebook"
              size={18}
              color={color}
              style={tw`pt-2`} // Consistent style
            />
          ),
        }}
      />

      {/* Settings Tab */}
      <Tabs.Screen
        name="settings"
        options={{
          ...screenOptions,
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons
              name="settings"
              size={18}
              color={color}
              style={tw`pt-2`} // Fix the typo in pt-2 style
            />
          ),
        }}
      />
    </Tabs>
  );
}
