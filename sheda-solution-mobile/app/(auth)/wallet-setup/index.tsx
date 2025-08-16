import { View, ImageBackground, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import Button from "@/components/common/Button";
import InterSemiBold from "@/components/Text/InterSemiBold";
import { HERO } from "@/constants/images-icons";
import InterRegular from "@/components/Text/InterRegular";
import { deviceHeight } from "@/constants/values";
import { useWallet } from "@/contexts/WalletContext";

export default function Onboarding() {
  const { loading } = useWallet();

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
            Welcome, Connect your wallet
          </InterSemiBold>
          <InterRegular className="text-secondaryText text-base">
            Create and connect your web3 wallet to your account
          </InterRegular>
          <InterRegular className="text-secondaryText text-base">
            Manage your assets and cryptocurrencies.
          </InterRegular>
        </View>

        <View className="mt-8">
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
            <InterSemiBold className="">Import Existing wallet</InterSemiBold>
          </Button>
        </View>
      </View>
    </View>
  );
}
