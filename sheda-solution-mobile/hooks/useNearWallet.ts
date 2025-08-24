import { useState, useEffect, useCallback } from "react";
import nearWalletService, {
  NetworkType,
  WalletAccount,
  WalletState,
  CreateWalletResult,
  ImportWalletResult,
  FaucetInfo,
} from "@/services/nearWallet";

export interface UseNearWalletReturn {
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
  importWallet: (
    seedPhrase: string,
    accountId?: string
  ) => Promise<ImportWalletResult>;
  connectWallet: (accountId: string) => Promise<WalletAccount>;
  signIn: (accountId: string) => Promise<WalletAccount>;
  signOut: () => Promise<void>;

  // Account operations
  getAccountBalance: (accountId: string) => Promise<string>;
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
}

export const useNearWallet = (): UseNearWalletReturn => {
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

        // Check if user is already signed in
        if (nearWalletService.isSignedIn()) {
          const accountId = nearWalletService.getAccountId();
          if (accountId) {
            const account = await nearWalletService.connectWallet(accountId);
            setWalletState({
              isConnected: true,
              account,
            });
          }
        }

        // Set current network
        setCurrentNetworkState(nearWalletService.getCurrentNetwork());
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to initialize wallet"
        );
      } finally {
        setLoading(false);
      }
    };

    initializeWallet();
  }, []);

  // Network management
  const setNetwork = useCallback((network: NetworkType) => {
    try {
      nearWalletService.setNetwork(network);
      setCurrentNetworkState(network);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to switch network");
    }
  }, []);

  const getCurrentNetwork = useCallback(() => {
    return nearWalletService.getCurrentNetwork();
  }, []);

  // Wallet operations
  const createWallet = useCallback(async (): Promise<CreateWalletResult> => {
    try {
      setLoading(true);
      setError(null);
      const result = await nearWalletService.createWallet();
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create wallet";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const importWallet = useCallback(
    async (
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
    },
    []
  );

  const connectWallet = useCallback(
    async (accountId: string): Promise<WalletAccount> => {
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
    },
    []
  );

  const signIn = useCallback(
    async (accountId: string): Promise<WalletAccount> => {
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
    },
    []
  );

  const signOut = useCallback(async (): Promise<void> => {
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
  }, []);

  // Account operations
  const getAccountBalance = useCallback(
    async (accountId: string): Promise<string> => {
      try {
        setError(null);
        return await nearWalletService.getAccountBalance(accountId);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to get account balance";
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    []
  );

  const sendTransaction = useCallback(
    async (
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
    },
    []
  );

  const accountExists = useCallback(
    async (accountId: string): Promise<boolean> => {
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
    },
    []
  );

  // Utility methods
  const getFaucetInfo = useCallback((): FaucetInfo | null => {
    return nearWalletService.getFaucetInfo();
  }, []);

  const getAccountExplorerUrl = useCallback((accountId: string): string => {
    return nearWalletService.getAccountExplorerUrl(accountId);
  }, []);

  const getWalletUrl = useCallback((): string => {
    return nearWalletService.getWalletUrl();
  }, []);

  const formatNearAmount = useCallback((amount: string): string => {
    return nearWalletService.formatNearAmount(amount);
  }, []);

  const parseNearAmount = useCallback((amount: string): string => {
    return nearWalletService.parseNearAmount(amount);
  }, []);

  // State checks
  const isSignedIn = useCallback((): boolean => {
    return nearWalletService.isSignedIn();
  }, []);

  const getAccountId = useCallback((): string | null => {
    return nearWalletService.getAccountId();
  }, []);

  const getAccounts = useCallback((): WalletAccount[] => {
    return nearWalletService.getAccounts();
  }, []);

  const clearAccounts = useCallback((): void => {
    nearWalletService.clearAccounts();
    setWalletState({
      isConnected: false,
      account: null,
    });
  }, []);

  return {
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
  };
};
