import React from "react";
import { View, Text, SafeAreaView, TextInput } from "react-native";
import BackBtn from "@/components/common/BackBtn";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";
import Button from "@/components/common/Button";
import { router } from "expo-router";

const WalletRecovery = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        className="container flex-1 mx-auto max-w-2xl"
        style={{ padding: 20 }}
      >
        <View className="flex-row items-center gap-4">
          <BackBtn />
          <InterSemiBold className="text-lg/5">Wallet setup</InterSemiBold>
        </View>

        <View className="mt-10">
          <View>
            <InterSemiBold className="text-xs/5 mb-5">
              Setup your secure pass-phrase
            </InterSemiBold>

            <InterRegular className="text-xs/5">
              Write down the following words in order and keep them somewhere
              safe. Anyone with access to it will also have access to your
              assets! your can access this words later in the settings.
            </InterRegular>
          </View>

          <View className="border border-borderColor rounded-lg h-[141] mt-5 mb-3">
            <TextInput
              placeholder=""
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

          <View className="flex-row gap-4">
            <View className="flex-1">
              <Button className="rounded-lg">
                <InterSemiBold className="text-white">Copy</InterSemiBold>
              </Button>
            </View>
            <View className="flex-1">
              <Button className="rounded-lg">
                <InterSemiBold className="text-white">
                  Backup using passkey
                </InterSemiBold>
              </Button>
            </View>
          </View>
        </View>

        <View className="flex-1">
          <Button className="rounded-lg" onPress={() => router.push('/(auth)/wallet-setup/created-successfully')}>
            <InterSemiBold className="text-white">
              Continue
            </InterSemiBold>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WalletRecovery;
