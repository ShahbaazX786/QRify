import { useSignUp } from "@clerk/clerk-expo";
import { Feather, Octicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  MD2Colors,
  TextInput,
} from "react-native-paper";

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const onSignUpPress = async () => {
    setLoading(true);
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setLoading(false);
    } catch (err: any) {
      setLoading(true);
      console.error(JSON.stringify(err, null, 2));
    }
    showModal();
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handleRedirection = () => {
    router.replace("/(public)/login");
  };

  return (
    <ScrollView className="bg-white">
      <View className="py-2 flex-1 flex justify-center items-center relative">
        <ActivityIndicator
          className="absolute z-50"
          animating={loading}
          color={MD2Colors.purple800}
          size={"large"}
          hidesWhenStopped={true}
        />
        <Image
          source={require("@/assets/images/register.png")}
          resizeMode="contain"
          className="w-[400px] min-w-[300px] h-[300px]"
        />
        <View className="flex flex-col justify-start items-start w-full px-6 space-y-4">
          <Text className="text-4xl font-bold text-black">Sign up</Text>
          <View className="flex flex-row justify-start items-center my-2">
            <Octicons name="mention" size={24} color="black" className="mr-2" />
            <TextInput
              mode="flat"
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email ID"
              onChangeText={(email) => setEmailAddress(email)}
              className="w-[90%] bg-white"
            />
          </View>
          <View className="flex flex-row justify-start items-center my-2">
            <Feather name="user" size={24} color="black" className="mr-2" />
            <TextInput
              mode="flat"
              autoCapitalize="none"
              value={emailAddress}
              placeholder="User name"
              onChangeText={(email) => setEmailAddress(email)}
              className="w-[90%] bg-white"
            />
          </View>
          <View className="flex flex-row justify-start items-center my-2">
            <Feather name="lock" size={24} color="black" className="mr-2" />
            <TextInput
              mode="flat"
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Password"
              onChangeText={(email) => setEmailAddress(email)}
              className="w-[90%] bg-white"
            />
          </View>
          <View className="my-4">
            <Text className="text-left text-md text-gray-500 leading-6">
              By signing up, you are agreeing to our{" "}
              <Link href={"www.google.com"} className="text-blue-500">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href={"www.google.com"} className="text-blue-500">
                Terms & Conditions
              </Link>
            </Text>
          </View>
          <View className="w-full">
            <Button
              mode="contained"
              onPress={onSignUpPress}
              className="bg-blue-500 h-16 flex justify-center items-center"
            >
              <Text className="text-xl">Continue</Text>
            </Button>
            <Button mode="text" onPress={handleRedirection} className="mt-5">
              <Text className="text-base text-gray-500">
                Joined us before?{"  "}
                <Link href={"/(public)/login"} className="text-blue-500">
                  Login
                </Link>
              </Text>
            </Button>
          </View>
        </View>
        {/* <Portal>
          <Modal
            style={{
              width: "100%",
              alignItems: "center",
            }}
            visible={visible}
            dismissableBackButton={true}
            onDismiss={hideModal}
            contentContainerStyle={{ backgroundColor: "white", padding: 20 }}
          >
            <View className="px-4 py-2 w-full h-64 flex justify-center items-center">
              <View className="flex flex-col justify-center items-center space-y-8">
                <Text className="text-2xl font-bold text-black">
                  Code Verification
                </Text>
                <TextInput
                  mode="outlined"
                  value={code}
                  inputMode="numeric"
                  label={"Enter Code"}
                  placeholder="Code..."
                  onChangeText={(code) => setCode(code)}
                  className="w-56"
                />
                <Button
                  mode="contained"
                  onPress={onPressVerify}
                  className="w-full"
                >
                  <Text className="text-lg">Verify Email</Text>
                </Button>
              </View>
            </View>
          </Modal>
        </Portal> */}
      </View>
    </ScrollView>
  );
};

export default Register;
