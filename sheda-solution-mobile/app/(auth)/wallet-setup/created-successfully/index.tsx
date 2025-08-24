import React from "react";
import { View, SafeAreaView, Alert } from "react-native";
import { router } from "expo-router";
import Button from "@/components/common/Button";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";
import { useWallet } from "@/contexts/WalletContext";

const WalletCreatedSuccessfully = () => {
  const { walletState, connectWallet, loading, getAccountId } = useWallet();

  const handleConnectWallet = async () => {
    try {
      if (walletState.account?.accountId) {
        await connectWallet(walletState.account.accountId);
        Alert.alert(
          "Wallet Connected!",
          "Your wallet has been successfully connected.",
          [
            {
              text: "Continue to App",
              onPress: () => router.push("/(tabs)/home"),
            },
          ]
        );
      } else {
        // If no wallet in state, try to get the account ID from the service
        const accountId = getAccountId();
        if (accountId) {
          await connectWallet(accountId);
          Alert.alert(
            "Wallet Connected!",
            "Your wallet has been successfully connected.",
            [
              {
                text: "Continue to App",
                onPress: () => router.push("/(tabs)/home"),
              },
            ]
          );
        } else {
          Alert.alert("Error", "No wallet found to connect.");
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to connect wallet. Please try again.");
    }
  };

  const handleGoToDashboard = async () => {
    try {
      // Try to connect wallet if not already connected
      if (!walletState.isConnected) {
        const accountId = getAccountId();
        if (accountId) {
          await connectWallet(accountId);
        }
      }
      router.push("/(tabs)/home");
    } catch (error) {
      console.error("Error connecting wallet:", error);
      // Still go to dashboard even if connection fails
      router.push("/(tabs)/home");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 justify-center items-center p-5">
        <View className="bg-white rounded-lg p-8 shadow-sm w-full max-w-md">
          <View className="items-center mb-6">
            <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-4">
              <InterSemiBold className="text-green-600 text-2xl">
                ✓
              </InterSemiBold>
            </View>
            <InterSemiBold className="text-xl mb-2">
              Wallet Created Successfully!
            </InterSemiBold>
            <InterRegular className="text-secondaryText text-center">
              Your NEAR wallet has been created and is ready to use.
            </InterRegular>
          </View>

          {walletState.account && (
            <View className="mb-6">
              <View className="mb-3">
                <InterRegular className="text-secondaryText text-sm">
                  Account ID
                </InterRegular>
                <InterSemiBold className="text-base">
                  {walletState.account.accountId}
                </InterSemiBold>
              </View>

              <View className="mb-3">
                <InterRegular className="text-secondaryText text-sm">
                  Public Key
                </InterRegular>
                <InterSemiBold className="text-xs break-all">
                  {walletState.account.publicKey}
                </InterSemiBold>
              </View>
            </View>
          )}

          <View className="space-y-3">
            <Button
              className="rounded-lg"
              onPress={handleConnectWallet}
              disabled={loading}
            >
              <InterSemiBold className="text-white">
                {loading ? "Connecting..." : "Connect Wallet"}
              </InterSemiBold>
            </Button>

            <Button
              className="rounded-lg border border-borderColor"
              color="transparent"
              onPress={handleGoToDashboard}
            >
              <InterSemiBold>Continue to App</InterSemiBold>
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WalletCreatedSuccessfully;
