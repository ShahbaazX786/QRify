import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "black",
        headerBackTitle: "Back",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="register" options={{ headerTitle: "" }} />
      <Stack.Screen name="login" options={{ headerTitle: "" }} />
      <Stack.Screen name="reset" options={{ headerTitle: "" }} />
    </Stack>
  );
};

export default PublicLayout;
