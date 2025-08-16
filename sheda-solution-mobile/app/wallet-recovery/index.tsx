import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, Alert } from "react-native";
import BackBtn from "@/components/common/BackBtn";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";
import Button from "@/components/common/Button";
import { useWallet } from "@/contexts/WalletContext";
import * as Clipboard from "expo-clipboard";

const WalletRecovery = () => {
  const {
    walletState,
    getStoredSeedPhrase,
    getPrivateKeyFromStoredSeedPhrase,
  } = useWallet();
  const [seedPhrase, setSeedPhrase] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowSeedPhrase = async () => {
    if (!walletState.account?.accountId) {
      Alert.alert("Error", "No wallet connected");
      return;
    }

    try {
      setIsLoading(true);
      const storedSeedPhrase = await getStoredSeedPhrase(
        walletState.account.accountId
      );

      if (storedSeedPhrase) {
        setSeedPhrase(storedSeedPhrase);

        // Also get the private key for wallet import
        const storedPrivateKey = await getPrivateKeyFromStoredSeedPhrase(
          walletState.account.accountId
        );
        if (storedPrivateKey) {
          setPrivateKey(storedPrivateKey);
        }

        setShowSeedPhrase(true);
      } else {
        Alert.alert("Error", "No seed phrase found for this wallet");
      }
    } catch (error) {
      console.error("Failed to retrieve seed phrase:", error);
      Alert.alert("Error", "Failed to retrieve seed phrase");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopySeedPhrase = async () => {
    if (!seedPhrase) {
      Alert.alert("Error", "No seed phrase to copy");
      return;
    }

    try {
      await Clipboard.setStringAsync(seedPhrase);
      Alert.alert("Copied!", "Seed phrase copied to clipboard");
    } catch (error) {
      Alert.alert("Error", "Failed to copy seed phrase");
    }
  };

  const handleCopyPrivateKey = async () => {
    if (!privateKey) {
      Alert.alert("Error", "No private key to copy");
      return;
    }

    try {
      await Clipboard.setStringAsync(privateKey);
      Alert.alert("Copied!", "Private key copied to clipboard");
    } catch (error) {
      Alert.alert("Error", "Failed to copy private key");
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
          <InterSemiBold className="text-lg/5">Wallet Recovery</InterSemiBold>
        </View>

        <View className="mt-10">
          <View>
            <InterSemiBold className="text-xs/5 mb-5">
              Show wallet recovery phase.
            </InterSemiBold>

            <InterRegular className="text-xs/5">
              View and export the recovery phase for your wallet portfolio
            </InterRegular>
          </View>

          <View className="border border-borderColor rounded-lg h-[141] mt-5 mb-3">
            <TextInput
              placeholder={
                showSeedPhrase
                  ? `Seed Phrase:\n${seedPhrase}\n\nPrivate Key:\n${privateKey}`
                  : "Keep your recovery phase safe, your wallet key control assess to your funds anyone with it can move your assets without permission"
              }
              multiline
              editable={false}
              style={{
                // flex: 1,
                padding: 10,
                fontSize: 12,
                lineHeight: 20,
                color: showSeedPhrase ? "#000000" : "#000000BF",
              }}
            />
          </View>

          <View>
            <Button
              className="rounded-lg"
              onPress={handleShowSeedPhrase}
              disabled={isLoading}
            >
              <InterSemiBold className="text-white">
                {isLoading
                  ? "Loading..."
                  : showSeedPhrase
                  ? "Seed Phrase Shown"
                  : "I understand, Show my seed phrase"}
              </InterSemiBold>
            </Button>
          </View>
          {showSeedPhrase && (
            <>
              <View className="mt-3">
                <Button
                  className="rounded-lg"
                  onPress={handleCopySeedPhrase}
                  color="#d4d4d7"
                >
                  <InterSemiBold className="text-black">
                    Copy Seed Phrase
                  </InterSemiBold>
                </Button>
              </View>
              <View className="mt-3">
                <Button
                  className="rounded-lg"
                  onPress={handleCopyPrivateKey}
                  color="#d4d4d7"
                >
                  <InterSemiBold className="text-black">
                    Copy Private Key
                  </InterSemiBold>
                </Button>
              </View>
            </>
          )}
          <View className="mt-3">
            <Button className="rounded-lg">
              <InterSemiBold className="text-white">
                Backup using passkey
              </InterSemiBold>
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WalletRecovery;
