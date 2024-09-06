import WaveBottom from "@/assets/svg/WaveBottom";
import { default as WaveTop } from "@/assets/svg/waveTop";
import BeginButton from "@/components/BeginButton";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome = () => {
  const router = useRouter();
  return (
    <SafeAreaView className=" flex-1 bg-blue-800 relative">
      <WaveTop className="w-full h-36 opacity-100 stroke-black shadow-xl absolute top-0 left-0 z-10" />
      <View className="bg-blue-500 w-full h-full">
        <View className="mt-auto">
          <Image
            source={require("../assets/images/qr_code.png")}
            alt="Qrify"
            resizeMode="contain"
            className="w-full"
          />
          <Text className="mt-8 text-center text-white text-6xl font-bold mb-5">
            QRify
          </Text>
        </View>

        <Text className="text-center text-lg text-white mb-12 mt-auto mx-8">
          Discover the best way to Create and share QR codes effortlessly, like
          never before
        </Text>
        <View className="mb-auto">
          <TouchableOpacity onPress={() => router.replace("/(tabs)/generate")}>
            <BeginButton title={"get started"} />
          </TouchableOpacity>
        </View>
      </View>
      <WaveBottom className="w-full h-36 opacity-100 stroke-black shadow-xl absolute -bottom-8 z-10" />
    </SafeAreaView>
  );
};

export default Welcome;
