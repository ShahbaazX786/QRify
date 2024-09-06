import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import LoginButton from "@/components/LoginButton";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="generate"
        options={{
          title: "Generate",
          headerShown: true,
          headerRight: () => <LoginButton />,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="qrcode-plus"
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          headerShown: true,
          headerRight: () => <LoginButton />,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="qr-code-scanner" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerShown: true,
          headerRight: () => <LoginButton />,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="history" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
