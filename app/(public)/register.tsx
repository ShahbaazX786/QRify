import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
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
    <View className="px-4 py-2 flex-1 bg-blue-50 flex justify-center items-center">
      {!pendingVerification && (
        <View
          className="w-full h-auto bg-white rounded-lg px-4 py-6 space-y-6"
          style={{ elevation: 4 }}
        >
          <View>
            <Text className="text-center font-bold text-2xl">
              Create Account
            </Text>
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
          <Button mode="contained" onPress={onSignUpPress}>
            <Text className="text-lg">Register</Text>
          </Button>
          <Button mode="text" onPress={handleRedirection}>
            <Text className="text-lg">Already have an account?</Text>
          </Button>
        </View>
      )}
      {pendingVerification && (
        <>
          <TextInput
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
          />
          <Button mode="contained" onPress={onPressVerify}>
            <Text className="text-lg">Verify Email</Text>
          </Button>
        </>
      )}
    </View>
  );
};

export default Register;
