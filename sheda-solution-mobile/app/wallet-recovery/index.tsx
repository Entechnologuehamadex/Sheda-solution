import React from "react";
import { View, Text, SafeAreaView, TextInput } from "react-native";
import BackBtn from "@/components/common/BackBtn";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";
import Button from "@/components/common/Button";

const WalletRecovery = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        className="container flex-1 mx-auto max-w-2xl"
        style={{ padding: 20 }}
      >
        <View className="flex-row items-center gap-4">
          <BackBtn />
          <InterSemiBold className="text-lg/5">Wallet Recovery</InterSemiBold>
        </View>

<View className="mt-10">
    
    <View>
        <InterSemiBold className="text-xs/5 mb-5">Show wallet recovery phase.</InterSemiBold>

        <InterRegular className="text-xs/5">View and export the recovery phase for your wallet portfolio</InterRegular>
    </View>

                <View className="border border-borderColor rounded-lg h-[141] mt-5 mb-3">
                <TextInput
                  placeholder="Keep your recovery phase safe, your wallet key control assess to your funds anyone with it can move your assets without permission"
                  multiline
                  style={{
                    // flex: 1,
                    padding: 10,
                    fontSize: 12,
                    lineHeight: 20,
                    color: '#000000BF',
                  }} />
                </View>

    <View>
        <Button className="rounded-lg">
            <InterSemiBold className="text-white">I understand, Show my seed phrase</InterSemiBold>
            </Button>
    </View>
    <View>
        <Button className="rounded-lg">
            <InterSemiBold className="text-white">Backup using passkey</InterSemiBold>
            </Button>
    </View>
</View>

      </View>
    </SafeAreaView>
  );
};

export default WalletRecovery;