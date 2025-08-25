import BackBtn from "@/components/common/BackBtn";
import Button from "@/components/common/Button";
import InterBold from "@/components/Text/InterBold";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";
import { Pressable, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import InterMedium from "@/components/Text/InterMedium";
import { OtpInput } from "react-native-otp-entry";
import styles from "./style";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useShedaApi";
import { showAlert } from "@/components/common/CrossPlatformAlert";

const Otp = () => {
  const { email } = useLocalSearchParams();
  const [otp, setOtp] = useState("");
  const { verifyOtp, sendOtp, isLoading, error, clearError } = useAuth();

  // Handle error display
  useEffect(() => {
    if (error) {
      showAlert("Error", error);
      clearError();
    }
  }, [error, clearError]);

  //handle submit otp code
  const handleSubmiteOtp = async () => {
    if (!otp || otp.length !== 4) {
      showAlert("Error", "Please enter a valid 4-digit OTP");
      return;
    }

    try {
      const token = await verifyOtp(email as string, otp);
      console.log("🔑 OTP verification successful, token:", token);

      router.push({
        pathname: "/reset-pass",
        params: {
          otpCode: otp,
          email: email as string,
          otpToken: token.access_token, // Pass the OTP token
        },
      });
      setOtp("");
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };

  const handleResendOtp = async () => {
    try {
      await sendOtp(email as string);
      showAlert("Success", "OTP has been resent to your email");
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    }
  };

  return (
    <View className="container max-w-2xl mx-auto" style={{ padding: 20 }}>
      <View className="pt-2">
        <BackBtn />
      </View>

      <View>
        <InterBold className="text-2xl lg:text-4xl mt-16">
          Please check your email
        </InterBold>
      </View>

      <View className="mt-8">
        <View className="flex flex-row gap-1 mb-4">
          <InterRegular className="">We've sent a code to</InterRegular>
          <InterMedium>{email}</InterMedium>
        </View>

        <OtpInput
          numberOfDigits={4}
          type="numeric"
          focusColor="#C1272D"
          onFilled={(text) => setOtp(text)} //print the enter values to the console
          textInputProps={{
            accessibilityLabel: "One-Time Password",
          }}
          theme={{
            containerStyle: styles.container,
            pinCodeContainerStyle: styles.pinCodeContainer,
            filledPinCodeContainerStyle: styles.filledPinCodeContainer,
          }}
        />

        <Button
          className="rounded-lg my-4"
          onPress={handleSubmiteOtp}
          disabled={isLoading}
        >
          <InterSemiBold className="text-background text-base">
            {isLoading ? "Verifying..." : "Verify"}
          </InterSemiBold>
        </Button>

        <Pressable
          className="flex-row items-center justify-center gap-2 mt-10"
          onPress={handleResendOtp}
        >
          <InterBold>Send code again</InterBold>
          <View>
            <Text>00:20</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Otp;
