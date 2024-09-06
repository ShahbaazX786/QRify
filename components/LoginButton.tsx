import React from "react";
import { Text, TouchableOpacity } from "react-native";

const LoginButton = () => {
  return (
    <TouchableOpacity className="mr-2 border px-2 py-1">
      <Text className="text-lg text-black">Login</Text>
    </TouchableOpacity>
  );
};

export default LoginButton;
