import React from "react";
import { Text, TouchableOpacity } from "react-native";

const LoginButton = () => {
  return (
    <TouchableOpacity className="mr-4">
      <Text className="text-lg text-black">Login</Text>
    </TouchableOpacity>
  );
};

export default LoginButton;
