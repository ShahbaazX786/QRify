import { useAuth, useUser } from "@clerk/clerk-expo";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";

const LoginButton = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  console.log(user?.emailAddresses[0].emailAddress);

  return isSignedIn === true ? (
    <View className="mr-3">
      <Avatar.Text
        size={32}
        label={
          user?.emailAddresses[0]?.emailAddress.slice(0, 2).toUpperCase() ||
          "NA"
        }
      />
    </View>
  ) : (
    <TouchableOpacity className="mr-2 border px-2 py-1">
      <Text className="text-lg text-black">Login</Text>
    </TouchableOpacity>
  );
};

export default LoginButton;
