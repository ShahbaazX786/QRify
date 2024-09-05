import { funkyOneLiners } from "@/constants/constants";
import { CameraType, useCameraPermissions } from "expo-camera";
import React, { useState } from "react";
import { Alert, Linking, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ScanQR = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  const handlePermissions = async () => {
    const { status } = await requestPermission();
    console.log(status);
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Camera permission is needed to scan QR codes. Please enable it in settings.",
        [{ text: "Open Settings", onPress: () => Linking.openSettings() }]
      );
    }
  };

  function toggleCamera() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-zinc-100 p-4">
        <Text className="text-center pb-10 text-2xl px-4">
          {funkyOneLiners[Math.floor(Math.random() * funkyOneLiners.length)]}
        </Text>
        <TouchableOpacity
          onPress={handlePermissions}
          className="border p-4 rounded-lg"
        >
          <Text className="text-lg font-semibold">
            Enable Camera Permissions
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView></SafeAreaView>
    // <View className="flex-1 w-full h-full justify-center items-center flex-col">
    //   <CameraView className="flex" facing={facing}>
    //     <View className={"flex-1 flex-row bg-transparent m-auto"}>
    //       <TouchableOpacity
    //         className={"flex-1 items-center justify-end z-10"}
    //         onPress={toggleCamera}
    //       >
    //         <Text className="font-bold text-white text-xl">Flip Camera</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </CameraView>
    // </View>
  );
};

export default ScanQR;
