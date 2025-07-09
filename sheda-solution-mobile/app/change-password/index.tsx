import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import BackBtn from "@/components/common/BackBtn";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";
import StyledTextInput from "@/components/input/textInput";
import Button from "@/components/common/Button";

const ChangePassword = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        className="container flex-1 mx-auto max-w-2xl"
        style={{ padding: 20 }}
      >
        <View className="flex-row items-center gap-4">
          <BackBtn />
          <InterSemiBold className="text-lg/5">Change password</InterSemiBold>
        </View>

<View className="mt-5">
    <View className="mb-5">
        <InterRegular className="text-xs/[150%] mb-1">Old password</InterRegular>
        <StyledTextInput placeholder="Enter old password" isPassword={true} />
    </View>
    <View className="mb-5">
        <InterRegular className="text-xs/[150%] mb-1">New password</InterRegular>
        <StyledTextInput placeholder="Must be 8 characters" isPassword={true} />
    </View>
    <View className="mb-5">
        <InterRegular className="text-xs/[150%] mb-1">Confirm new password</InterRegular>
        <StyledTextInput placeholder="Repeat password" isPassword={true} />
    </View>

    <View>
        <Button className="rounded-lg">
            <InterSemiBold className="text-white">Reset password</InterSemiBold>
            </Button>
    </View>
</View>

      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
