import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useNearWallet } from "@/hooks/useNearWallet";

export const WalletExample: React.FC = () => {
  const {
    // State
    walletState,
    currentNetwork,
    loading,
    error,

    // Network management
    setNetwork,
    getCurrentNetwork,

    // Wallet operations
    createWallet,
    importWallet,
    connectWallet,
    signIn,
    signOut,

    // Account operations
    getAccountBalance,
    sendTransaction,
    accountExists,

    // Utility methods
    getFaucetInfo,
    getAccountExplorerUrl,
    getWalletUrl,
    formatNearAmount,
    parseNearAmount,

    // State checks
    isSignedIn,
    getAccountId,
    getAccounts,
    clearAccounts,
  } = useNearWallet();

  const [createdWallet, setCreatedWallet] = useState<any>(null);

  const handleCreateWallet = async () => {
    try {
      const wallet = await createWallet();
      setCreatedWallet(wallet);
      Alert.alert(
        "Wallet Created!",
        `Account ID: ${wallet.accountId}\n\nPrivate Key: ${wallet.privateKey}\n\nPublic Key: ${wallet.publicKey}`
      );
    } catch (error) {
      Alert.alert("Error", `Failed to create wallet: ${error}`);
    }
  };

  const handleSwitchNetwork = (network: "testnet" | "mainnet") => {
    setNetwork(network);
    Alert.alert("Network Switched", `Now using ${network}`);
  };

  const handleGetBalance = async () => {
    if (!walletState.account) {
      Alert.alert("Error", "No wallet connected");
      return;
    }

    try {
      const balance = await getAccountBalance(walletState.account.accountId);
      const formattedBalance = formatNearAmount(balance);
      Alert.alert("Balance", `${formattedBalance} NEAR`);
    } catch (error) {
      Alert.alert("Error", `Failed to get balance: ${error}`);
    }
  };

  const handleCheckAccountExists = async () => {
    if (!createdWallet) {
      Alert.alert("Error", "No wallet created yet");
      return;
    }

    try {
      const exists = await accountExists(createdWallet.accountId);
      Alert.alert(
        "Account Status",
        exists ? "Account exists on blockchain" : "Account does not exist yet"
      );
    } catch (error) {
      Alert.alert("Error", `Failed to check account: ${error}`);
    }
  };

  const handleGetFaucetInfo = () => {
    const faucetInfo = getFaucetInfo();
    if (faucetInfo) {
      Alert.alert(
        "Faucet Information",
        `URL: ${faucetInfo.faucetUrl}\n\nInstructions: ${faucetInfo.instructions}`
      );
    } else {
      Alert.alert("Faucet", "No faucet available for mainnet");
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        NEAR Wallet Example
      </Text>

      {/* Network Status */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Network: {currentNetwork}
        </Text>
        <Text style={{ fontSize: 16 }}>
          Connected: {walletState.isConnected ? "Yes" : "No"}
        </Text>
        {walletState.account && (
          <Text style={{ fontSize: 16 }}>
            Account: {walletState.account.accountId}
          </Text>
        )}
        {loading && <Text style={{ color: "blue" }}>Loading...</Text>}
        {error && <Text style={{ color: "red" }}>Error: {error}</Text>}
      </View>

      {/* Network Switching */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          Network
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: currentNetwork === "testnet" ? "green" : "gray",
            padding: 10,
            borderRadius: 5,
            marginBottom: 5,
          }}
          onPress={() => handleSwitchNetwork("testnet")}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Switch to Testnet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: currentNetwork === "mainnet" ? "green" : "gray",
            padding: 10,
            borderRadius: 5,
          }}
          onPress={() => handleSwitchNetwork("mainnet")}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Switch to Mainnet
          </Text>
        </TouchableOpacity>
      </View>

      {/* Wallet Operations */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          Wallet Operations
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            padding: 10,
            borderRadius: 5,
            marginBottom: 5,
          }}
          onPress={handleCreateWallet}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Create Wallet
          </Text>
        </TouchableOpacity>

        {createdWallet && (
          <TouchableOpacity
            style={{
              backgroundColor: "orange",
              padding: 10,
              borderRadius: 5,
              marginBottom: 5,
            }}
            onPress={handleCheckAccountExists}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Check Account Exists
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={{
            backgroundColor: "purple",
            padding: 10,
            borderRadius: 5,
            marginBottom: 5,
          }}
          onPress={handleGetFaucetInfo}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Get Faucet Info
          </Text>
        </TouchableOpacity>

        {walletState.account && (
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              padding: 10,
              borderRadius: 5,
              marginBottom: 5,
            }}
            onPress={handleGetBalance}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Get Balance
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Created Wallet Info */}
      {createdWallet && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Created Wallet
          </Text>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>
            Account ID: {createdWallet.accountId}
          </Text>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>
            Public Key: {createdWallet.publicKey.substring(0, 20)}...
          </Text>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>
            Private Key: {createdWallet.privateKey.substring(0, 20)}...
          </Text>
          {createdWallet.faucetInfo && (
            <Text style={{ fontSize: 14, color: "blue" }}>
              Faucet URL: {createdWallet.faucetInfo.faucetUrl}
            </Text>
          )}
        </View>
      )}

      {/* Connected Account Info */}
      {walletState.account && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Connected Account
          </Text>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>
            Account ID: {walletState.account.accountId}
          </Text>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>
            Balance: {formatNearAmount(walletState.account.balance)} NEAR
          </Text>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>
            Created: {walletState.account.isCreated ? "Yes" : "No"}
          </Text>
        </View>
      )}

      {/* Utility Links */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          Utility Links
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "gray",
            padding: 10,
            borderRadius: 5,
            marginBottom: 5,
          }}
          onPress={() => Alert.alert("Wallet URL", getWalletUrl())}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Get Wallet URL
          </Text>
        </TouchableOpacity>
        {walletState.account && (
          <TouchableOpacity
            style={{ backgroundColor: "gray", padding: 10, borderRadius: 5 }}
            onPress={() =>
              Alert.alert(
                "Explorer URL",
                getAccountExplorerUrl(walletState.account!.accountId)
              )
            }
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Get Explorer URL
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};
