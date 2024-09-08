import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#1e40af" },
        headerTintColor: "#fff",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen
        name="register"
        options={{ headerTitle: "Create Account" }}
      />
      <Stack.Screen name="login" options={{ headerTitle: "Welcome Back" }} />
      <Stack.Screen name="reset" options={{ headerTitle: "Reset Password" }} />
    </Stack>
  );
};

export default PublicLayout;
