import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TextInput, Alert } from "react-native";
import BackBtn from "@/components/common/BackBtn";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";
import Button from "@/components/common/Button";
import { router } from "expo-router";
import { useWallet } from "@/contexts/WalletContext";
import * as Clipboard from "expo-clipboard";

const WalletRecovery = () => {
  const {
    createWallet,
    connectWallet,
    getStoredSeedPhrase,
    walletState,
    hasStoredWallet,
    saveWalletState,
  } = useWallet();
  const [seedPhrase, setSeedPhrase] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isWalletCreated, setIsWalletCreated] = useState(false);

  useEffect(() => {
    checkExistingWallet();
  }, []);

  const checkExistingWallet = async () => {
    try {
      const hasStored = await hasStoredWallet();
      if (hasStored) {
        Alert.alert(
          "Wallet Already Exists",
          "You already have a wallet. Would you like to import it instead?",
          [
            {
              text: "Import Wallet",
              onPress: () => router.push("/(auth)/wallet-setup/import-wallet"),
            },
            {
              text: "Cancel",
              style: "cancel",
            },
          ]
        );
      }
    } catch (error) {
      console.error("Failed to check existing wallet:", error);
    }
  };

  const handleCreateWallet = async () => {
    try {
      setIsLoading(true);
      console.log("Creating NEAR wallet...");

      const result = await createWallet();
      console.log("Wallet created successfully:", result);

      setSeedPhrase(result.seedPhrase);
      setIsWalletCreated(true);

      // Save the wallet state for persistence
      await saveWalletState(result.accountId, result.seedPhrase);

      console.log("Wallet state saved for persistence");
    } catch (error) {
      console.error("Failed to create wallet:", error);
      Alert.alert("Error", "Failed to create wallet. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopySeedPhrase = async () => {
    try {
      await Clipboard.setStringAsync(seedPhrase);
      Alert.alert("Copied!", "Seed phrase copied to clipboard");
    } catch (error) {
      Alert.alert("Error", "Failed to copy seed phrase");
    }
  };

  const handleContinue = () => {
    router.push("/(auth)/wallet-setup/created-successfully");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="container flex-1 mx-auto max-w-2xl">
        {/* Header */}
        <View className="px-5 py-5 flex-row items-center">
          <BackBtn />
          <InterSemiBold className="text-lg/5 ml-4">
            Create Wallet
          </InterSemiBold>
        </View>

        {/* Content */}
        <View className="flex-1 px-5">
          {!isWalletCreated ? (
            // Show create wallet button
            <View className="flex-1 justify-center items-center">
              <InterRegular className="text-center text-gray-600 mb-8">
                Create a new NEAR wallet to get started
              </InterRegular>
              <Button
                onPress={handleCreateWallet}
                disabled={isLoading}
                className="w-full"
              >
                <InterSemiBold className="text-white text-center">
                  {isLoading ? "Creating Wallet..." : "Create Wallet"}
                </InterSemiBold>
              </Button>
            </View>
          ) : (
            // Show seed phrase
            <View className="flex-1">
              <InterSemiBold className="text-xl/6 mb-4">
                Save Your Seed Phrase
              </InterSemiBold>
              <InterRegular className="text-gray-600 mb-6">
                Write down these 12 words in a safe place. You'll need them to
                recover your wallet.
              </InterRegular>

              <View className="bg-gray-50 p-4 rounded-lg mb-6">
                <Text className="text-sm font-mono leading-6">
                  {seedPhrase}
                </Text>
              </View>

              <Button
                onPress={handleCopySeedPhrase}
                isFull={false}
                color="#d4d4d7"
                className="mb-4"
              >
                <InterRegular className="text-sm/5">
                  Copy Seed Phrase
                </InterRegular>
              </Button>

              <Button onPress={handleContinue} className="w-full">
                <InterSemiBold className="text-white text-center">
                  I've Saved My Seed Phrase
                </InterSemiBold>
              </Button>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WalletRecovery;
