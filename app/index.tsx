import WaveBottom from "@/assets/svg/WaveBottom";
import WaveTop from "@/assets/svg/waveTop";
import BeginButton from "@/components/BeginButton";
import { useAuth } from "@clerk/clerk-expo";
import { AntDesign } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  if (isSignedIn) {
    return <Redirect href={"/(tabs)/generate"} />;
  }

  const initialRedirect = () => {
    if (isSignedIn) {
      router.replace("/(tabs)/generate");
    } else {
      router.replace("/(public)/register");
    }
  };

  return (
    <SafeAreaView className="bg-blue-800 relative justify-center items-center flex flex-col">
      <WaveTop className="w-full h-36 opacity-100 stroke-black shadow-xl absolute top-0 left-0 z-10" />
      <View className="bg-blue-500 py-28">
        <Animated.View
          entering={FadeInDown.springify().delay(100)}
          className="flex justify-center items-center space-y-4 flex-1"
        >
          <AntDesign name="qrcode" size={200} color="white" />
          <Text className="text-center text-white text-6xl font-bold">
            QRify
          </Text>
        </Animated.View>

        <View className="space-y-8">
          <Text className="text-center text-lg font-bold text-white px-8">
            Discover the best way to Create and share QR codes effortlessly,
            like never before
          </Text>
          <TouchableOpacity onPress={initialRedirect}>
            <BeginButton title={"get started"} />
          </TouchableOpacity>
        </View>
      </View>
      <WaveBottom className="w-full h-36 opacity-100 stroke-black shadow-xl absolute -bottom-8 z-10" />
    </SafeAreaView>
  );
};

export default Welcome;
