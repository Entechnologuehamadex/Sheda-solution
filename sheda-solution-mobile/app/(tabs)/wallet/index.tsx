"use client";

import { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Alert,
  RefreshControl,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Clipboard from "expo-clipboard";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterMedium from "@/components/Text/InterMedium";
import InterRegular from "@/components/Text/InterRegular";
import InterExtraBold from "@/components/Text/InterExtraBold";
import Icon from "@/components/common/Icon";
import Button from "@/components/common/Button";
import { DEPOSIT, EYE, EYESLASH, WITHDRAW } from "@/assets/icons";
import WalletTabs from "@/components/organisms/WalletTabs";
import TokensList from "@/components/organisms/TokensList";
import AssetsList from "@/components/organisms/AssetsList";
import TransactionsList from "@/components/organisms/TransactionsList";
import { mockTokens, mockAssets, mockTransactions } from "@/data/wallet";
import type { WalletTab } from "@/types/wallet";
import { useWallet } from "@/contexts/WalletContext";
import WalletDashboard from "@/components/WalletDashboard";

const Wallet = () => {
  const [showBal, setShowBal] = useState(true);
  const [activeTab, setActiveTab] = useState<WalletTab>("Tokens");
  const [refreshing, setRefreshing] = useState(false);
  const {
    walletState,
    getAccountBalance,
    getAccountTransactions,
    getTokenBalances,
    loading,
  } = useWallet();
  const [balance, setBalance] = useState<string>("0");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [tokens, setTokens] = useState<any[]>([]);

  useEffect(() => {
    if (walletState.account?.accountId) {
      loadBalance();
      loadTransactions();
      loadTokenBalances();
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

  const loadTransactions = async () => {
    try {
      if (walletState.account?.accountId) {
        const accountTransactions = await getAccountTransactions(
          walletState.account.accountId,
          20 // Increased limit to show more transactions
        );
        setTransactions(accountTransactions);
      }
    } catch (error) {
      console.error("Failed to load transactions:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        loadBalance(),
        loadTransactions(),
        loadTokenBalances(),
      ]);
    } catch (error) {
      console.error("Failed to refresh data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const loadTokenBalances = async () => {
    try {
      if (walletState.account?.accountId) {
        const tokenBalances = await getTokenBalances(
          walletState.account.accountId
        );
        setTokens(tokenBalances);
      }
    } catch (error) {
      console.error("Failed to load token balances:", error);
    }
  };

  const handleShowBal = () => {
    setShowBal(!showBal);
  };

  const handleConnectWallet = () => {
    router.push("/(auth)/wallet-setup");
  };

  const handleSignOut = () => {
    router.push("/(auth)/wallet-setup");
  };

  const handleDeposit = async () => {
    if (!walletState.account?.accountId) {
      Alert.alert("Error", "No wallet connected");
      return;
    }

    try {
      await Clipboard.setStringAsync(walletState.account.accountId);
      Alert.alert("Copied!", "Wallet address copied to clipboard");
    } catch (error) {
      Alert.alert("Error", "Failed to copy wallet address");
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Tokens":
        return <TokensList tokens={tokens.length > 0 ? tokens : mockTokens} />;
      case "Transactions":
        return (
          <ScrollView
            className="flex-1"
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <TransactionsList transactions={transactions} loading={loading} />
          </ScrollView>
        );
      case "Assets":
        return <AssetsList assets={mockAssets} />;
      default:
        return <TokensList tokens={tokens.length > 0 ? tokens : mockTokens} />;
    }
  };

  // If wallet is not connected, show wallet dashboard
  if (!walletState.isConnected || !walletState.account) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View className="container flex-1 mx-auto max-w-2xl">
          <View className="px-5 py-5 flex-row justify-between">
            <InterSemiBold className="text-lg/5">Wallet</InterSemiBold>
            <Button
              className="rounded-lg bg-blue-500"
              onPress={handleConnectWallet}
            >
              <InterSemiBold className="text-white text-sm">
                Connect Wallet
              </InterSemiBold>
            </Button>
          </View>
          <WalletDashboard onSignOut={handleSignOut} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="container flex-1 mx-auto max-w-2xl">
        {/* Header */}
        <View className="px-5 py-5 flex-row justify-between">
          <InterSemiBold className="text-lg/5">My Portfolio</InterSemiBold>
          <View className="flex-row items-center gap-2">
            <View className="w-2 h-2 bg-green-500 rounded-full"></View>
            <InterMedium className="text-green-600 text-xs">
              Connected
            </InterMedium>
          </View>
        </View>

        {/* Balance Section */}
        <View className="max-w-64 mx-auto my-9 items-center">
          <View className="flex-row items-center gap-2">
            <InterRegular className="text-sm/5">Total balance</InterRegular>
            <TouchableOpacity onPress={handleShowBal}>
              <View pointerEvents="none">
                {showBal ? (
                  <Icon icon={EYE} width={15} height={15} color="black" />
                ) : (
                  <Icon icon={EYESLASH} width={15} height={15} color="black" />
                )}
              </View>
            </TouchableOpacity>
          </View>

          <InterExtraBold className="text-2xl/5 py-5">
            {showBal
              ? `${(parseFloat(balance) / 1e24).toFixed(4)} NEAR`
              : "********"}
          </InterExtraBold>

          <View className="flex-row gap-3">
            <Button
              isFull={false}
              color="#d4d4d7"
              className="flex-row gap-3 items-center justify-center rounded-md"
              onPress={handleDeposit}
            >
              <Icon
                icon={DEPOSIT}
                width={18}
                height={16}
                className="w-0 justify-center items-center bg-[#D8DADC26]"
              />
              <InterRegular className="text-sm/5">Deposit</InterRegular>
            </Button>
            <Button
              isFull={false}
              color="#d4d4d7"
              className="flex-row gap-3 items-center justify-center rounded-md"
            >
              <Icon
                icon={WITHDRAW}
                width={18}
                height={16}
                className="w-0 justify-center items-center bg-[#D8DADC26]"
              />
              <InterRegular className="text-sm/5">Withdraw</InterRegular>
            </Button>
          </View>
        </View>

        {/* Wallet Tabs */}
        <WalletTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <View className="flex-1">{renderTabContent()}</View>
      </View>
    </SafeAreaView>
  );
};

export default Wallet;
