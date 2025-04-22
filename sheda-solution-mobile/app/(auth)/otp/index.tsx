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
import { useState } from "react";

const Otp = () => {
  const { email } = useLocalSearchParams();

  const [otp, setOtp] = useState("");

  //handle submit otp code
  const handleSubmiteOtp = () => {
    router.push({
      pathname: "/reset-pass",
      params: { otpCode: otp },
    });
    setOtp("");
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

        <Button className="rounded-lg my-4" onPress={handleSubmiteOtp}>
          <InterSemiBold className="text-background text-base lg:text-2xl">
            Verify
          </InterSemiBold>
        </Button>

        <Pressable className="flex-row items-center justify-center gap-2 mt-10">
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
