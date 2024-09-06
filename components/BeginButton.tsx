import React from "react";
import { Text, View } from "react-native";

const BeginButton = ({ title }: { title: string }) => {
  return (
    <View className="mx-auto">
      <View className="px-4 py-4 bg-white max-w-sm min-w-[300px] rounded-full">
        <Text className="text-center text-lg text-black font-semibold capitalize">
          {title}
        </Text>
      </View>
    </View>
  );
};

export default BeginButton;
