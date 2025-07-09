import React from "react";
import { View, Text, SafeAreaView, TextInput } from "react-native";
import BackBtn from "@/components/common/BackBtn";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";
import Button from "@/components/common/Button";
import { push } from "expo-router/build/global-state/routing";
import { router } from "expo-router";

const ImportWallet = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        className="container flex-1 mx-auto max-w-2xl"
        style={{ padding: 20 }}
      >
        <View className="flex-row items-center gap-4">
          <BackBtn />
          <InterSemiBold className="text-lg/5">Import wallet</InterSemiBold>
        </View>

<View className="mt-10">
    
    <View>
        <InterSemiBold className="text-xs/5 mb-5">Import your existing .Near wallet.</InterSemiBold>
    </View>

                <View className="border border-borderColor rounded-lg h-[141] mt-5 mb-3">
                <TextInput
                  placeholder="Enter 12-24 key phrase "
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
        <Button className="rounded-lg" onPress={() => router.push('/wallet-setup/created-successfully')}>
            <InterSemiBold className="text-white">Import</InterSemiBold>
            </Button>
    </View>
   
</View>

      </View>
    </SafeAreaView>
  );
};

export default ImportWallet;