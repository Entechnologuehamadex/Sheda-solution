import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, Alert } from "react-native";
import BackBtn from "@/components/common/BackBtn";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";
import Button from "@/components/common/Button";
import { push } from "expo-router/build/global-state/routing";
import { router } from "expo-router";
import { useWallet } from "@/contexts/WalletContext";

const ImportWallet = () => {
  const [privateKey, setPrivateKey] = useState("");
  const { importWallet, loading, error } = useWallet();

  const handleImportWallet = async () => {
    if (!privateKey.trim()) {
      Alert.alert("Error", "Please enter your private key");
      return;
    }

    try {
      const wallet = await importWallet(privateKey);
      Alert.alert(
        "Wallet Imported Successfully!",
        `Account ID: ${wallet.accountId}\nPublic Key: ${wallet.publicKey}`,
        [
          {
            text: "Continue",
            onPress: () => router.push("/wallet-setup/created-successfully"),
          },
        ]
      );
    } catch (err) {
      Alert.alert(
        "Error",
        "Failed to import wallet. Please check your private key and try again."
      );
    }
  };

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
            <InterSemiBold className="text-xs/5 mb-5">
              Import your existing .Near wallet.
            </InterSemiBold>
          </View>

          <View className="border border-borderColor rounded-lg h-[141] mt-5 mb-3">
            <TextInput
              placeholder="Enter your private key"
              multiline
              value={privateKey}
              onChangeText={setPrivateKey}
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
            <Button
              className="rounded-lg"
              onPress={handleImportWallet}
              disabled={loading}
            >
              <InterSemiBold className="text-white">
                {loading ? "Importing..." : "Import"}
              </InterSemiBold>
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ImportWallet;
