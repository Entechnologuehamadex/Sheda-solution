import React from "react";
import { View, Text, SafeAreaView, TextInput } from "react-native";
import BackBtn from "@/components/common/BackBtn";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";
import Button from "@/components/common/Button";

const DeleteAccount = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        className="container flex-1 mx-auto max-w-2xl"
        style={{ padding: 20 }}
      >
        <View className="flex-row items-center gap-4">
          <BackBtn />
          <InterSemiBold className="text-lg/5">Delete account</InterSemiBold>
        </View>

        <View className="mt-10">
          <View>
            <InterSemiBold className="text-xs/5 mb-5">
              It's sad to see you go.
            </InterSemiBold>

            <InterRegular className="text-xs/5">
              You will not be able to access this account anymore if you proceed
              and it cannot be restored.
            </InterRegular>
          </View>

          <View className="border border-borderColor rounded-lg h-[141] mt-5 mb-3">
            <TextInput
              placeholder="Tell us why you're leaving"
              multiline
              style={{
                // flex: 1,
                padding: 10,
                fontSize: 12,
                lineHeight: 20,
                color: "#000000BF",
              }}
            />
          </View>

          <View>
            <Button className="rounded-lg">
              <InterSemiBold className="text-white">
                Delete my account
              </InterSemiBold>
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteAccount;
