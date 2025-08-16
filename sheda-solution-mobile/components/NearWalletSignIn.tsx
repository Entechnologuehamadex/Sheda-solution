import React, { useState } from "react";
import { View, Alert, TextInput } from "react-native";
import { useWallet } from "@/contexts/WalletContext";
import Button from "@/components/common/Button";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";

interface NearWalletSignInProps {
  onSuccess?: (accountId: string) => void;
  onCancel?: () => void;
}

const NearWalletSignIn: React.FC<NearWalletSignInProps> = ({
  onSuccess,
  onCancel,
}) => {
  const [accountId, setAccountId] = useState("");
  const { signIn, loading, error } = useWallet();

  const handleSignIn = async () => {
    if (!accountId.trim()) {
      Alert.alert("Error", "Please enter your NEAR account ID");
      return;
    }

    try {
      const account = await signIn(accountId);
      Alert.alert("Sign In Successful!", `Welcome, ${account.accountId}!`, [
        {
          text: "Continue",
          onPress: () => onSuccess?.(account.accountId),
        },
      ]);
    } catch (err) {
      Alert.alert(
        "Error",
        "Failed to sign in. Please check your account ID and try again."
      );
    }
  };

  const handleCreateWallet = () => {
    // Navigate to wallet setup
    // This would typically navigate to the wallet setup flow
    Alert.alert("Create Wallet", "Redirecting to wallet creation...");
  };

  return (
    <View className="p-5">
      <View className="bg-white rounded-lg p-6 shadow-sm">
        <InterSemiBold className="text-xl mb-4 text-center">
          Sign In with NEAR
        </InterSemiBold>

        <InterRegular className="text-secondaryText text-center mb-6">
          Enter your NEAR account ID to sign in to your wallet
        </InterRegular>

        <View className="mb-4">
          <InterRegular className="text-secondaryText text-sm mb-2">
            NEAR Account ID
          </InterRegular>
          <TextInput
            className="border border-gray-300 rounded-lg p-3"
            placeholder="e.g., user.near or user.testnet"
            value={accountId}
            onChangeText={setAccountId}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View className="space-y-3">
          <Button
            className="rounded-lg"
            onPress={handleSignIn}
            disabled={loading || !accountId.trim()}
          >
            <InterSemiBold className="text-white">
              {loading ? "Signing In..." : "Sign In"}
            </InterSemiBold>
          </Button>

          <Button
            className="rounded-lg border border-borderColor"
            color="transparent"
            onPress={handleCreateWallet}
          >
            <InterSemiBold>Create New Wallet</InterSemiBold>
          </Button>

          {onCancel && (
            <Button
              className="rounded-lg border border-red-300"
              color="transparent"
              onPress={onCancel}
            >
              <InterSemiBold className="text-red-500">Cancel</InterSemiBold>
            </Button>
          )}
        </View>

        {error && (
          <View className="mt-4 p-3 bg-red-100 rounded-lg">
            <InterRegular className="text-red-600 text-sm">
              {error}
            </InterRegular>
          </View>
        )}
      </View>
    </View>
  );
};

export default NearWalletSignIn;
