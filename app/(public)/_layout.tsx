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
      <Stack.Screen name="register" options={{ title: "" }} />
      <Stack.Screen name="login" options={{ headerTitle: "Welcome Back" }} />
      <Stack.Screen name="reset" options={{ headerTitle: "Reset Password" }} />
    </Stack>
  );
};

export default PublicLayout;
