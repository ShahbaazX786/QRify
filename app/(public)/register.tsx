import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  MD2Colors,
  Modal,
  Portal,
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
          <Text className="text-center font-bold text-2xl">Create Account</Text>
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
      <Portal>
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
      </Portal>
    </View>
  );
};

export default Register;
