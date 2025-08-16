import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import nearWalletService, {
  WalletAccount,
  WalletState,
  NetworkType,
  CreateWalletResult,
  CreateSubAccountResult,
  ImportWalletResult,
  FaucetInfo,
} from "@/services/nearWallet";
import secureStorageService from "@/services/secureStorage";

interface WalletContextType {
  // State
  walletState: WalletState;
  currentNetwork: NetworkType;
  loading: boolean;
  error: string | null;

  // Network management
  setNetwork: (network: NetworkType) => void;
  getCurrentNetwork: () => NetworkType;

  // Wallet operations
  createWallet: () => Promise<CreateWalletResult>;
  createSubAccount: (
    mainAccountId: string,
    subAccountName: string,
    initialBalance?: string
  ) => Promise<CreateSubAccountResult>;
  importWallet: (
    seedPhrase: string,
    accountId?: string
  ) => Promise<ImportWalletResult>;
  connectWallet: (accountId: string) => Promise<WalletAccount>;
  signIn: (accountId: string) => Promise<WalletAccount>;
  signOut: () => Promise<void>;

  // Account operations
  getAccountBalance: (accountId: string) => Promise<string>;
  getAccountTransactions: (accountId: string, limit?: number) => Promise<any[]>;
  getTokenBalances: (accountId: string) => Promise<any[]>;
  sendTransaction: (
    accountId: string,
    receiverId: string,
    amount: string
  ) => Promise<string>;
  accountExists: (accountId: string) => Promise<boolean>;

  // Utility methods
  getFaucetInfo: () => FaucetInfo | null;
  getAccountExplorerUrl: (accountId: string) => string;
  getWalletUrl: () => string;
  formatNearAmount: (amount: string) => string;
  parseNearAmount: (amount: string) => string;

  // State checks
  isSignedIn: () => boolean;
  getAccountId: () => string | null;
  getAccounts: () => WalletAccount[];
  clearAccounts: () => void;

  // Secure storage methods
  getStoredSeedPhrase: (accountId: string) => Promise<string | null>;
  getPrivateKeyFromStoredSeedPhrase: (
    accountId: string
  ) => Promise<string | null>;
  deleteStoredSeedPhrase: (accountId: string) => Promise<void>;
  isBiometricAvailable: () => Promise<boolean>;
  getSupportedBiometryType: () => Promise<string | null>;

  // New methods for persistence
  saveWalletState: (accountId: string, seedPhrase: string) => Promise<void>;
  getStoredAccountId: () => Promise<string | null>;
  hasStoredWallet: () => Promise<boolean>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    account: null,
  });
  const [currentNetwork, setCurrentNetworkState] =
    useState<NetworkType>("testnet");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize wallet service on mount
  useEffect(() => {
    const initializeWallet = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if there's a stored wallet
        const hasStored = await hasStoredWallet();
        if (hasStored) {
          const storedAccountId = await getStoredAccountId();
          if (storedAccountId) {
            console.log(
              "WalletContext: Found stored wallet, attempting to reconnect..."
            );

            // Get the stored seed phrase
            const seedPhrase = await secureStorageService.getSeedPhrase(
              storedAccountId
            );
            if (seedPhrase) {
              // Import the wallet using the stored seed phrase
              const result = await nearWalletService.importWallet(
                seedPhrase,
                storedAccountId
              );
              if (result.isCreated) {
                // Connect to the imported wallet
                const account = await nearWalletService.connectWallet(
                  storedAccountId
                );
                setWalletState({
                  isConnected: true,
                  account: account,
                });
                console.log(
                  "WalletContext: Successfully reconnected to stored wallet"
                );
              }
            }
          }
        }

        // Set current network
        setCurrentNetworkState(nearWalletService.getCurrentNetwork());
      } catch (err) {
        console.error("WalletContext: Failed to initialize wallet:", err);
        setError(
          err instanceof Error ? err.message : "Failed to initialize wallet"
        );
      } finally {
        setLoading(false);
      }
    };

    initializeWallet();
  }, []);

  // New method to save wallet state
  const saveWalletState = async (
    accountId: string,
    seedPhrase: string
  ): Promise<void> => {
    try {
      // Save the seed phrase
      await secureStorageService.saveSeedPhrase(accountId, seedPhrase);

      // Save the account ID for quick retrieval
      await secureStorageService.savePrivateKey("current_account", accountId);

      console.log("WalletContext: Wallet state saved successfully");
    } catch (error) {
      console.error("WalletContext: Failed to save wallet state:", error);
      throw error;
    }
  };

  // New method to get stored account ID
  const getStoredAccountId = async (): Promise<string | null> => {
    try {
      return await secureStorageService.getPrivateKey("current_account");
    } catch (error) {
      console.error("WalletContext: Failed to get stored account ID:", error);
      return null;
    }
  };

  // New method to check if wallet is stored
  const hasStoredWallet = async (): Promise<boolean> => {
    try {
      const accountId = await getStoredAccountId();
      if (!accountId) return false;

      const seedPhrase = await secureStorageService.getSeedPhrase(accountId);
      return seedPhrase !== null;
    } catch (error) {
      console.error("WalletContext: Failed to check stored wallet:", error);
      return false;
    }
  };

  // Network management
  const setNetwork = (network: NetworkType) => {
    try {
      nearWalletService.setNetwork(network);
      setCurrentNetworkState(network);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to switch network");
    }
  };

  const getCurrentNetwork = () => {
    return nearWalletService.getCurrentNetwork();
  };

  // Wallet operations
  const createWallet = async (): Promise<CreateWalletResult> => {
    try {
      setLoading(true);
      setError(null);

      // Check if wallet already exists
      const hasStored = await hasStoredWallet();
      if (hasStored) {
        throw new Error(
          "Wallet already exists. Please import your existing wallet instead."
        );
      }

      const result = await nearWalletService.createWallet();

      // Save the wallet state if creation was successful
      if (result.accountId && result.seedPhrase) {
        await saveWalletState(result.accountId, result.seedPhrase);
      }

      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create wallet";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const createSubAccount = async (
    mainAccountId: string,
    subAccountName: string,
    initialBalance?: string
  ): Promise<CreateSubAccountResult> => {
    try {
      setLoading(true);
      setError(null);
      const result = await nearWalletService.createSubAccount(
        mainAccountId,
        subAccountName,
        initialBalance
      );
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create sub-account";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const importWallet = async (
    seedPhrase: string,
    accountId?: string
  ): Promise<ImportWalletResult> => {
    try {
      setLoading(true);
      setError(null);
      const result = await nearWalletService.importWallet(
        seedPhrase,
        accountId
      );
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to import wallet";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const connectWallet = async (accountId: string): Promise<WalletAccount> => {
    try {
      setLoading(true);
      setError(null);
      const account = await nearWalletService.connectWallet(accountId);

      setWalletState({
        isConnected: true,
        account,
      });

      return account;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to connect wallet";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (accountId: string): Promise<WalletAccount> => {
    try {
      setLoading(true);
      setError(null);
      const account = await nearWalletService.signIn(accountId);

      setWalletState({
        isConnected: true,
        account,
      });

      return account;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to sign in";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await nearWalletService.signOut();

      setWalletState({
        isConnected: false,
        account: null,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to sign out";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Account operations
  const getAccountBalance = async (accountId: string): Promise<string> => {
    try {
      setError(null);
      return await nearWalletService.getAccountBalance(accountId);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to get account balance";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const getAccountTransactions = async (
    accountId: string,
    limit?: number
  ): Promise<any[]> => {
    try {
      setError(null);
      return await nearWalletService.getAccountTransactions(accountId, limit);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to get account transactions";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const getTokenBalances = async (accountId: string): Promise<any[]> => {
    try {
      setError(null);
      return await nearWalletService.getTokenBalances(accountId);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to get token balances";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const sendTransaction = async (
    accountId: string,
    receiverId: string,
    amount: string
  ): Promise<string> => {
    try {
      setLoading(true);
      setError(null);
      return await nearWalletService.sendTransaction(
        accountId,
        receiverId,
        amount
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to send transaction";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const accountExists = async (accountId: string): Promise<boolean> => {
    try {
      setError(null);
      return await nearWalletService.accountExists(accountId);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to check account existence";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Utility methods
  const getFaucetInfo = (): FaucetInfo | null => {
    return nearWalletService.getFaucetInfo();
  };

  const getAccountExplorerUrl = (accountId: string): string => {
    return nearWalletService.getAccountExplorerUrl(accountId);
  };

  const getWalletUrl = (): string => {
    return nearWalletService.getWalletUrl();
  };

  const formatNearAmount = (amount: string): string => {
    return nearWalletService.formatNearAmount(amount);
  };

  const parseNearAmount = (amount: string): string => {
    return nearWalletService.parseNearAmount(amount);
  };

  // State checks
  const isSignedIn = (): boolean => {
    return nearWalletService.isSignedIn();
  };

  const getAccountId = (): string | null => {
    return nearWalletService.getAccountId();
  };

  const getAccounts = (): WalletAccount[] => {
    return nearWalletService.getAccounts();
  };

  const clearAccounts = (): void => {
    nearWalletService.clearAccounts();
    setWalletState({
      isConnected: false,
      account: null,
    });
  };

  // Secure storage methods
  const getStoredSeedPhrase = async (
    accountId: string
  ): Promise<string | null> => {
    try {
      return await nearWalletService.getStoredSeedPhrase(accountId);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to retrieve stored seed phrase";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const getPrivateKeyFromStoredSeedPhrase = async (
    accountId: string
  ): Promise<string | null> => {
    try {
      return await nearWalletService.getPrivateKeyFromStoredSeedPhrase(
        accountId
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to retrieve private key from stored seed phrase";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteStoredSeedPhrase = async (accountId: string): Promise<void> => {
    try {
      await nearWalletService.deleteStoredSeedPhrase(accountId);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to delete stored seed phrase";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const isBiometricAvailable = async (): Promise<boolean> => {
    try {
      return await nearWalletService.isBiometricAvailable();
    } catch (err) {
      console.error("Failed to check biometric availability:", err);
      return false;
    }
  };

  const getSupportedBiometryType = async (): Promise<string | null> => {
    try {
      return await nearWalletService.getSupportedBiometryType();
    } catch (err) {
      console.error("Failed to get supported biometry type:", err);
      return null;
    }
  };

  const value: WalletContextType = {
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
    createSubAccount,
    importWallet,
    connectWallet,
    signIn,
    signOut,

    // Account operations
    getAccountBalance,
    getAccountTransactions,
    getTokenBalances,
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

    // Secure storage methods
    getStoredSeedPhrase,
    getPrivateKeyFromStoredSeedPhrase,
    deleteStoredSeedPhrase,
    isBiometricAvailable,
    getSupportedBiometryType,

    // New methods for persistence
    saveWalletState,
    getStoredAccountId,
    hasStoredWallet,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
