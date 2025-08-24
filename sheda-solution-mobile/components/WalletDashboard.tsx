import React, { useState, useEffect } from "react";
import { View, Text, Alert, ScrollView, TextInput } from "react-native";
import { router } from "expo-router";
import { useWallet } from "@/contexts/WalletContext";
import Button from "@/components/common/Button";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";

interface WalletDashboardProps {
  onSignOut?: () => void;
}

const WalletDashboard: React.FC<WalletDashboardProps> = ({ onSignOut }) => {
  const { walletState, getAccountBalance, sendTransaction, signOut, loading } =
    useWallet();
  const [balance, setBalance] = useState<string>("0");
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (walletState.account?.accountId) {
      loadBalance();
    }
  }, [walletState.account]);

  const loadBalance = async () => {
    try {
      if (walletState.account?.accountId) {
        const accountBalance = await getAccountBalance(
          walletState.account.accountId
        );
        setBalance(accountBalance);
      }
    } catch (error) {
      console.error("Failed to load balance:", error);
    }
  };

  const handleSendTransaction = async () => {
    if (!receiverId.trim() || !amount.trim()) {
      Alert.alert("Error", "Please enter both receiver ID and amount");
      return;
    }

    if (!walletState.account?.accountId) {
      Alert.alert("Error", "No wallet connected");
      return;
    }

    try {
      const transactionHash = await sendTransaction(
        walletState.account.accountId,
        receiverId,
        amount
      );
      Alert.alert(
        "Transaction Successful!",
        `Transaction hash: ${transactionHash}`,
        [{ text: "OK", onPress: loadBalance }]
      );
      setReceiverId("");
      setAmount("");
    } catch (error) {
      Alert.alert("Error", "Failed to send transaction. Please try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      if (onSignOut) {
        onSignOut();
      }
    } catch (error) {
      Alert.alert("Error", "Failed to sign out");
    }
  };

  if (!walletState.isConnected || !walletState.account) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <InterSemiBold className="text-lg mb-2">
          No Wallet Connected
        </InterSemiBold>
        <InterRegular className="text-secondaryText text-center mb-4">
          Please create or import a NEAR wallet to view your dashboard
        </InterRegular>
        <Button
          className="rounded-lg bg-blue-500"
          onPress={() => router.push("/(auth)/wallet-setup")}
        >
          <InterSemiBold className="text-white">Setup Wallet</InterSemiBold>
        </Button>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-5">
      <View className="bg-white rounded-lg p-5 mb-5 shadow-sm">
        <InterSemiBold className="text-lg mb-3">
          Wallet Information
        </InterSemiBold>

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

        <View className="mb-3">
          <InterRegular className="text-secondaryText text-sm">
            Balance
          </InterRegular>
          <InterSemiBold className="text-lg text-green-600">
            {parseFloat(balance) / 1e24} NEAR
          </InterSemiBold>
        </View>

        <Button
          className="rounded-lg bg-blue-500"
          onPress={loadBalance}
          disabled={loading}
        >
          <InterSemiBold className="text-white">
            {loading ? "Refreshing..." : "Refresh Balance"}
          </InterSemiBold>
        </Button>
      </View>

      <View className="bg-white rounded-lg p-5 mb-5 shadow-sm">
        <InterSemiBold className="text-lg mb-3">Send Transaction</InterSemiBold>

        <View className="mb-3">
          <InterRegular className="text-secondaryText text-sm mb-1">
            Receiver Account ID
          </InterRegular>
          <TextInput
            className="border border-gray-300 rounded-lg p-3"
            placeholder="Enter receiver account ID"
            value={receiverId}
            onChangeText={setReceiverId}
          />
        </View>

        <View className="mb-3">
          <InterRegular className="text-secondaryText text-sm mb-1">
            Amount (NEAR)
          </InterRegular>
          <TextInput
            className="border border-gray-300 rounded-lg p-3"
            placeholder="Enter amount in NEAR"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        <Button
          className="rounded-lg bg-green-500"
          onPress={handleSendTransaction}
          disabled={loading || !receiverId.trim() || !amount.trim()}
        >
          <InterSemiBold className="text-white">
            {loading ? "Sending..." : "Send Transaction"}
          </InterSemiBold>
        </Button>
      </View>

      <Button
        className="rounded-lg bg-red-500"
        onPress={handleSignOut}
        disabled={loading}
      >
        <InterSemiBold className="text-white">
          {loading ? "Signing Out..." : "Sign Out"}
        </InterSemiBold>
      </Button>
    </ScrollView>
  );
};

export default WalletDashboard;
