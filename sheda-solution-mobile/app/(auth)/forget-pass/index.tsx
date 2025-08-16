import BackBtn from "@/components/common/BackBtn";
import Button from "@/components/common/Button";
import InterBold from "@/components/Text/InterBold";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";
import StyledTextInput from "@/components/input/textInput";
import { Text, View, Alert } from "react-native";
import { Link, router } from "expo-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useShedaApi";

const Signup = () => {
  const [useremail, setUserEmail] = useState("");
  const { sendOtp, isLoading, error, clearError } = useAuth();

  // Handle error display
  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
      clearError();
    }
  }, [error, clearError]);

  const handleSendCode = async () => {
    if (!useremail) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    try {
      await sendOtp(useremail);
      router.push({
        pathname: "/otp",
        params: { email: useremail },
      });
      setUserEmail("");
    } catch (error) {
      console.error("Failed to send OTP:", error);
    }
  };

  return (
    <View className="container max-w-2xl mx-auto" style={{ padding: 20 }}>
      <View className="pt-2">
        <BackBtn />
      </View>

      <View>
        <InterBold className="text-2xl lg:text-4xl mt-16">
          Forget password
        </InterBold>
      </View>

      <View className="mt-8">
        <View>
          <InterRegular className="py-1">Email address</InterRegular>
          <StyledTextInput
            placeholder="Enter your email address"
            value={useremail}
            onChangeText={(text) => setUserEmail(text)}
          />
        </View>

        <Button
          className="rounded-lg my-4"
          onPress={handleSendCode}
          disabled={isLoading}
        >
          <InterSemiBold className="text-background text-base">
            {isLoading ? "Sending..." : "Send code"}
          </InterSemiBold>
        </Button>

        <Link href={"/login"} className="text-center">
          <InterRegular>Remember password?</InterRegular>
          <InterBold className="text-primary ml-1"> Log in</InterBold>
        </Link>
      </View>
    </View>
  );
};

export default Signup;
