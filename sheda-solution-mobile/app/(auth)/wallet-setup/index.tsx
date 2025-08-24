import { View, ImageBackground, ScrollView, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import Button from "@/components/common/Button";
import InterSemiBold from "@/components/Text/InterSemiBold";
import { HERO } from "@/constants/images-icons";
import InterRegular from "@/components/Text/InterRegular";
import { deviceHeight } from "@/constants/values";
import { useWallet } from "@/contexts/WalletContext";

export default function Onboarding() {
  const { loading, createWallet } = useWallet();
  const { email } = useLocalSearchParams();
  const [isAutoCreating, setIsAutoCreating] = useState(false);

  // Auto-create wallet if email is provided
  useEffect(() => {
    if (email && !isAutoCreating) {
      handleAutoCreateWallet();
    }
  }, [email]);

  const handleAutoCreateWallet = async () => {
    if (!email || isAutoCreating) return;

    try {
      setIsAutoCreating(true);
      console.log("Auto-creating wallet for email:", email);

      const result = await createWallet(email as string);
      console.log("Wallet created successfully:", result);

      // Navigate to success screen
      router.push("/(auth)/wallet-setup/created-successfully");
    } catch (error) {
      console.error("Failed to auto-create wallet:", error);
      Alert.alert(
        "Error",
        "Failed to create wallet automatically. Please try manually."
      );
    } finally {
      setIsAutoCreating(false);
    }
  };

  const handleCreateWallet = () => {
    console.log("Navigate to create wallet screen");
    router.push("/wallet-setup/create-wallet");
  };

  return (
    <View style={{ flex: 1, height: deviceHeight }}>
      <View className="h-[60%] w-full">
        <ImageBackground
          resizeMode="cover"
          source={HERO}
          style={{ width: "100%", height: "100%" }}
        ></ImageBackground>
      </View>

      <View className="flex-1 bg-background rounded-t-2xl lg:rounded-t-none -mt-5 lg:mt-none p-5">
        <View className="mt-5 flex items-center">
          <InterSemiBold className="text-xl mb-2">
            {email && isAutoCreating
              ? "Creating Your Wallet"
              : "Welcome, Connect your wallet"}
          </InterSemiBold>
          <InterRegular className="text-secondaryText text-base">
            {email && isAutoCreating
              ? `Setting up your NEAR wallet for ${email}`
              : "Create and connect your web3 wallet to your account"}
          </InterRegular>
          <InterRegular className="text-secondaryText text-base">
            {email && isAutoCreating
              ? "This will only take a moment..."
              : "Manage your assets and cryptocurrencies."}
          </InterRegular>
        </View>

        <View className="mt-8">
          {email && isAutoCreating ? (
            <View className="items-center">
              <InterRegular className="text-secondaryText text-center mb-4">
                Creating wallet for {email}...
              </InterRegular>
              <Button isFull={true} className="rounded-lg" disabled={true}>
                <InterSemiBold className="text-background">
                  Creating Wallet...
                </InterSemiBold>
              </Button>
            </View>
          ) : (
            <>
              <Button
                isFull={true}
                className="rounded-lg"
                onPress={handleCreateWallet}
                disabled={loading}
              >
                <InterSemiBold className="text-background">
                  {loading ? "Creating..." : "Create new wallet"}
                </InterSemiBold>
              </Button>
              <Button
                isFull={true}
                color="tranparent"
                onPress={() => router.push("/wallet-setup/import-wallet")}
                className="rounded-lg border border-borderColor"
              >
                <InterSemiBold className="">
                  Import Existing wallet
                </InterSemiBold>
              </Button>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
