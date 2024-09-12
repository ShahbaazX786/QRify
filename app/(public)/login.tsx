import { useSignIn } from "@clerk/clerk-expo";
import { Feather, Octicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Divider,
  MD2Colors,
  TextInput,
} from "react-native-paper";

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPress = useCallback(async () => {
    setLoading(true);
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  const handleRedirection = () => {
    router.replace("/(public)/register");
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
          source={require("@/assets/images/login.png")}
          resizeMode="contain"
          className="w-[400px] min-w-[300px] h-[300px]"
        />
        <View className="flex flex-col justify-start items-start w-full px-6 space-y-4">
          <Text className="text-4xl font-bold text-black">Login</Text>
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
          <Text className="w-full text-right text-md text-gray-500 leading-6 my-4">
            <Link
              href={"www.google.com"}
              className="text-blue-500 text-base font-bold"
            >
              Forgot Password?
            </Link>
          </Text>
          <View className="w-full">
            <Button
              mode="contained"
              onPress={onSignInPress}
              className="bg-blue-500 h-14 flex justify-center items-center"
            >
              <Text className="text-xl">Login</Text>
            </Button>
            <View className="flex-row justify-center items-start mt-6 mx-6">
              <Divider
                bold={true}
                horizontalInset={true}
                className="my-2 w-[50%]"
              />
              <Text>OR</Text>
              <Divider
                bold={true}
                horizontalInset={true}
                className="my-2 w-[50%]"
              />
            </View>
            <Button
              mode="contained-tonal"
              onPress={handleRedirection}
              className="h-14 flex justify-center items-center mt-5"
            >
              <Text className="text-base text-gray-500">
                Log In with Google
              </Text>
            </Button>
            <Button mode="text" onPress={handleRedirection} className="mt-5">
              <Text className="text-base text-gray-500">
                New to QRify?{"  "}
                <Link href={"/(public)/register"} className="text-blue-500">
                  Register
                </Link>
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
