import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import {
  ActivityIndicator,
  Button,
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
    <View className="px-4 py-2 flex-1 bg-blue-50 flex justify-center items-center relative">
      <ActivityIndicator
        className="absolute z-50"
        animating={loading}
        color={MD2Colors.purple800}
        size={"large"}
        hidesWhenStopped={true}
      />
      <View
        className="w-full h-auto bg-white rounded-lg px-4 py-6 space-y-6"
        style={{ elevation: 4 }}
      >
        <View>
          <Text className="text-center font-bold text-2xl">Log In</Text>
        </View>
        <TextInput
          mode="outlined"
          label={"Email Address"}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(email) => setEmailAddress(email)}
        />
        <TextInput
          mode="outlined"
          value={password}
          label={"Password"}
          placeholder="Password..."
          secureTextEntry={true}
          right={<TextInput.Icon icon="eye" />}
          onChangeText={(password) => setPassword(password)}
        />
        <Button mode="contained" onPress={onSignInPress}>
          <Text className="text-lg">Login</Text>
        </Button>
        <Button mode="text" onPress={handleRedirection}>
          <Text className="text-lg">Don't Have an Account?</Text>
        </Button>
      </View>
    </View>
  );
};

export default Login;
