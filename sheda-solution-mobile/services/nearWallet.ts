import { Account } from "@near-js/accounts";
import { JsonRpcProvider } from "@near-js/providers";
import { KeyPairSigner } from "@near-js/signers";
import { KeyPair, KeyPairString } from "@near-js/crypto";
import { InMemoryKeyStore } from "@near-js/keystores";
import { NEAR } from "@near-js/tokens";
import * as bip39 from "bip39";
import { sha256 } from "@noble/hashes/sha256";
import { hmac } from "@noble/hashes/hmac";
import bs58 from "bs58";
import secureStorageService from "./secureStorage";

// NEAR Network Configurations
const NETWORK_CONFIGS = {
  testnet: {
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
    contractName: "testnet",
  },
  mainnet: {
    networkId: "mainnet",
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://wallet.near.org",
    helperUrl: "https://helper.near.org",
    explorerUrl: "https://explorer.near.org",
    contractName: "near",
  },
};

export type NetworkType = "testnet" | "mainnet";

export interface WalletAccount {
  accountId: string;
  publicKey: string;
  privateKey?: string;
  balance: string;
  isCreated: boolean;
  createdAt?: Date;
}

export interface WalletState {
  isConnected: boolean;
  account: WalletAccount | null;
}

export interface FaucetInfo {
  faucetUrl: string;
  instructions: string;
  requirements: string[];
}

export interface CreateWalletResult {
  accountId: string;
  seedPhrase: string;
  publicKey: string;
  faucetInfo?: FaucetInfo;
}

export interface CreateSubAccountResult {
  accountId: string;
  publicKey: string;
  isCreated: boolean;
}

export interface ImportWalletResult {
  accountId: string;
  publicKey: string;
  isCreated: boolean;
}

class NearWalletService {
  private provider: JsonRpcProvider | null = null;
  private keyStore: InMemoryKeyStore;
  private accounts: Map<string, WalletAccount> = new Map();
  private currentNetwork: NetworkType = "testnet";
  private userCounter: number = 1; // Counter for generating usernames
  private mainAccountPrivateKey: string | null = null; // Store the main account private key

  constructor() {
    // Use InMemoryKeyStore for React Native compatibility
    this.keyStore = new InMemoryKeyStore();

    // Set the main account private key for sheda.testnet
    this.mainAccountPrivateKey =
      "ed25519:2qGTZJGXggyXBWjMXojQetMmJk7G4srcRXqtd7MKKTNHXs4tPhzLMawVPmG9uPTSKf6tLqLzpAiQD9oPpceuZd2T";
    console.log(
      "NearWalletService: Main account private key set in constructor"
    );
  }

  // Method to set the main account private key
  setMainAccountPrivateKey(privateKey: string): void {
    this.mainAccountPrivateKey = privateKey;
    console.log("NearWalletService: Main account private key set");
  }

  // Helper function to generate random username
  private generateUsername(): string {
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substr(2, 6);
    const username = `shedauser${timestamp}${randomSuffix}`;
    return username;
  }

  // Helper function to generate seed phrase
  private generateSeedPhrase(): string {
    return bip39.generateMnemonic(128); // 12 words
  }

  // Helper function to derive ED25519 key pair from seed phrase
  private deriveKeyPairFromSeedPhrase(seedPhrase: string): KeyPair {
    // Validate seed phrase
    if (!bip39.validateMnemonic(seedPhrase)) {
      throw new Error("Invalid seed phrase");
    }

    // Convert mnemonic to seed using bip39
    const seed = bip39.mnemonicToSeedSync(seedPhrase);

    // For NEAR compatibility with standard wallets like Meteor,
    // we'll use a simple approach: take the first 32 bytes of the seed
    // This is compatible with most NEAR wallet implementations
    const secretKey = seed.slice(0, 32);

    // Convert to base58 format that NEAR expects
    const secretKeyBase58 = bs58.encode(secretKey);

    // Create key pair from the secret key in the correct format
    const keyPair = KeyPair.fromString(`ed25519:${secretKeyBase58}`);

    return keyPair;
  }

  // Helper function to get private key from seed phrase (for wallet import)
  private getPrivateKeyFromSeedPhrase(seedPhrase: string): string {
    // Validate seed phrase
    if (!bip39.validateMnemonic(seedPhrase)) {
      throw new Error("Invalid seed phrase");
    }

    // Convert mnemonic to seed using bip39
    const seed = bip39.mnemonicToSeedSync(seedPhrase);

    // Take the first 32 bytes of the seed for the private key
    const secretKey = seed.slice(0, 32);

    // Convert to base58 format that NEAR expects
    const secretKeyBase58 = bs58.encode(secretKey);

    // Return in the format expected by NEAR wallets
    return `ed25519:${secretKeyBase58}`;
  }

  // Network management
  setNetwork(network: NetworkType): void {
    this.currentNetwork = network;
    console.log(`NearWalletService: Network switched to ${network}`);
  }

  getCurrentNetwork(): NetworkType {
    return this.currentNetwork;
  }

  getNetworkConfig() {
    return NETWORK_CONFIGS[this.currentNetwork];
  }

  async initialize(): Promise<void> {
    try {
      const config = this.getNetworkConfig();
      console.log(
        `NearWalletService: Initializing NEAR ${this.currentNetwork} connection...`
      );

      this.provider = new JsonRpcProvider({ url: config.nodeUrl });

      console.log(
        `NearWalletService: NEAR ${this.currentNetwork} connection established`
      );
    } catch (error) {
      console.error(
        `NearWalletService: Failed to initialize NEAR ${this.currentNetwork}:`,
        error
      );
      throw new Error(
        `Failed to initialize NEAR ${this.currentNetwork} connection: ${error}`
      );
    }
  }

  // mansion tissue volume rather goddess lobster camera crop cancel language load real

  async createWallet(email?: string): Promise<CreateWalletResult> {
    try {
      console.log(
        `NearWalletService: Creating ${this.currentNetwork} NEAR sub-account...`
      );

      // Initialize NEAR if not already done
      if (!this.provider) {
        await this.initialize();
      }

      // spike wolf wet reflect usage denial outside leader wire valley where mean

      // Check if main account private key is set
      // if (!this.mainAccountPrivateKey) {
      //   throw new Error(
      //     "Main account private key not set. Please set it first."
      //   );
      // }

      // Generate username from email or random
      let username: string;
      if (email && email.includes("@")) {
        // Extract username from email (before @)
        const emailUsername = email.split("@")[0];
        // Clean the username to only allow alphanumeric characters and dots
        username = emailUsername.replace(/[^a-zA-Z0-9.]/g, "").toLowerCase();
        // Ensure it's not empty and add a random suffix if needed
        if (!username) {
          username = this.generateUsername();
        }
      } else {
        username = this.generateUsername();
      }
      const subAccountId = `${username}.sheda.testnet`;

      console.log("NearWalletService: Sub-account ID generated:", subAccountId);

      // Check if account already exists
      const accountExists = await this.accountExists(subAccountId);
      if (accountExists) {
        throw new Error(
          `Sub-account ${subAccountId} already exists. Please try again.`
        );
      }

      // Generate a new seed phrase for the sub-account
      const seedPhrase = this.generateSeedPhrase();
      console.log("NearWalletService: Seed phrase generated for sub-account");

      // Derive key pair from seed phrase for the sub-account
      const subAccountKeyPair = this.deriveKeyPairFromSeedPhrase(seedPhrase);
      const subAccountPublicKey = subAccountKeyPair.getPublicKey().toString();

      console.log(
        "NearWalletService: Sub-account key pair derived from seed phrase"
      );

      // Create the main account keypair from the private key (for signing)
      const mainAccountKeyPair = KeyPair.fromString(
        "ed25519:2qGTZJGXggyXBWjMXojQetMmJk7G4srcRXqtd7MKKTNHXs4tPhzLMawVPmG9uPTSKf6tLqLzpAiQD9oPpceuZd2T"
      );

      // Create the main account object for NEAR operations
      if (!this.provider) {
        throw new Error("Provider not initialized");
      }
      const account = new Account(
        "sheda.testnet",
        this.provider,
        new KeyPairSigner(mainAccountKeyPair)
      );

      // Create the sub-account on the blockchain using the derived keypair
      await account.createAccount(
        subAccountId,
        subAccountKeyPair.getPublicKey(),
        // attaches 1.234 NEAR tokens that will become
        // an initial balance of the sub-account
        NEAR.toUnits("0.00234")
      );

      // Store the sub-account key in the key store
      const config = this.getNetworkConfig();
      await this.keyStore.setKey(
        config.networkId,
        subAccountId,
        subAccountKeyPair
      );

      // Create account object
      const walletAccount: WalletAccount = {
        accountId: subAccountId,
        publicKey: subAccountPublicKey,
        balance: "1.234",
        isCreated: true, // Account is created on blockchain
        createdAt: new Date(),
      };

      // Store the account locally
      this.accounts.set(subAccountId, walletAccount);

      // Save seed phrase securely
      try {
        await secureStorageService.saveSeedPhrase(subAccountId, seedPhrase);
        console.log("NearWalletService: Seed phrase saved securely");
      } catch (error) {
        console.error(
          "NearWalletService: Failed to save seed phrase securely:",
          error
        );
        // Continue even if secure storage fails - user can still use the seed phrase
      }

      console.log("NearWalletService: Sub-account stored locally");

      const result: CreateWalletResult = {
        accountId: subAccountId,
        seedPhrase,
        publicKey: subAccountPublicKey,
      };

      // Add faucet info for testnet
      if (this.currentNetwork === "testnet") {
        result.faucetInfo = {
          faucetUrl: config.walletUrl,
          instructions: `To fund your ${this.currentNetwork} sub-account, visit ${config.walletUrl} and create an account with the ID: ${subAccountId}`,
          requirements: [
            "Visit the NEAR Testnet Wallet",
            `Create account with ID: ${subAccountId}`,
            "Use the provided seed phrase to import your wallet",
            "Request testnet NEAR tokens from the faucet",
          ],
        };
      }

      console.log("NearWalletService: Returning result:", result);
      return result;
    } catch (error) {
      console.error(
        `NearWalletService: Failed to create ${this.currentNetwork} sub-account:`,
        error
      );
      throw new Error(
        `Failed to create ${this.currentNetwork} NEAR sub-account: ${error}`
      );
    }
  }

  async createSubAccount(
    mainAccountId: string,
    subAccountName: string,
    initialBalance: string = "1.234"
  ): Promise<CreateSubAccountResult> {
    try {
      console.log(
        `NearWalletService: Creating sub-account ${subAccountName} from main account ${mainAccountId}...`
      );

      // Initialize NEAR if not already done
      if (!this.provider) {
        await this.initialize();
      }

      // Check if main account exists and is connected
      const mainAccount = this.accounts.get(mainAccountId);
      if (!mainAccount) {
        throw new Error(
          `Main account ${mainAccountId} not found. Please connect the main wallet first.`
        );
      }

      // Get the main account's key pair from key store
      const config = this.getNetworkConfig();
      const mainKeyPair = await this.keyStore.getKey(
        config.networkId,
        mainAccountId
      );
      if (!mainKeyPair) {
        throw new Error(
          `Main account ${mainAccountId} key not found in key store.`
        );
      }

      // Create the main account object for NEAR operations
      if (!this.provider) {
        throw new Error("Provider not initialized");
      }
      const mainAccountObj = new Account(
        mainAccountId,
        this.provider,
        new KeyPairSigner(mainKeyPair)
      );

      // Generate a new key pair for the sub-account
      const subAccountKeyPair = KeyPair.fromRandom("ed25519");
      const subAccountPublicKey = subAccountKeyPair.getPublicKey().toString();

      // Create the sub-account ID
      const subAccountId = `${subAccountName}.${mainAccountId}`;

      console.log(
        "NearWalletService: Creating sub-account on blockchain:",
        subAccountId
      );

      // Create the sub-account on the blockchain
      await mainAccountObj.createAccount(
        subAccountId,
        subAccountKeyPair.getPublicKey(),
        NEAR.toUnits(initialBalance)
      );

      console.log("NearWalletService: Sub-account created on blockchain");

      // Store the sub-account key in the key store
      await this.keyStore.setKey(
        config.networkId,
        subAccountId,
        subAccountKeyPair
      );

      // Create sub-account object
      const subAccount: WalletAccount = {
        accountId: subAccountId,
        publicKey: subAccountPublicKey,
        balance: initialBalance,
        isCreated: true, // Account is created on blockchain
        createdAt: new Date(),
      };

      // Store the sub-account locally
      this.accounts.set(subAccountId, subAccount);

      console.log("NearWalletService: Sub-account stored locally");

      const result: CreateSubAccountResult = {
        accountId: subAccountId,
        publicKey: subAccountPublicKey,
        isCreated: true,
      };

      console.log("NearWalletService: Sub-account creation result:", result);
      return result;
    } catch (error) {
      console.error(`NearWalletService: Failed to create sub-account:`, error);
      throw new Error(`Failed to create sub-account: ${error}`);
    }
  }

  async importWallet(
    seedPhrase: string,
    accountId?: string
  ): Promise<ImportWalletResult> {
    try {
      console.log(
        `NearWalletService: Importing ${this.currentNetwork} wallet...`
      );

      // Initialize NEAR if not already done
      if (!this.provider) {
        await this.initialize();
      }

      // Derive key pair from seed phrase
      const keyPair = this.deriveKeyPairFromSeedPhrase(seedPhrase);
      const publicKey = keyPair.getPublicKey().toString();

      // Use provided account ID or generate one
      const finalAccountId =
        accountId ||
        `imported_${Date.now()}.${
          this.currentNetwork === "testnet" ? "testnet" : "near"
        }`;

      // Store the key in the key store
      const config = this.getNetworkConfig();
      await this.keyStore.setKey(config.networkId, finalAccountId, keyPair);

      // Check if account exists on blockchain
      const isCreated = await this.accountExists(finalAccountId);

      // Create account object
      const account: WalletAccount = {
        accountId: finalAccountId,
        publicKey,
        balance: isCreated ? "0" : "0", // Will be updated when we fetch real balance
        isCreated,
        createdAt: new Date(),
      };

      // Store the account locally
      this.accounts.set(finalAccountId, account);

      // Save seed phrase securely
      try {
        await secureStorageService.saveSeedPhrase(finalAccountId, seedPhrase);
        console.log(
          "NearWalletService: Seed phrase saved securely during import"
        );
      } catch (error) {
        console.error(
          "NearWalletService: Failed to save seed phrase securely during import:",
          error
        );
        // Continue even if secure storage fails
      }

      console.log(
        `NearWalletService: Import successful, account exists: ${isCreated}`
      );

      return {
        accountId: finalAccountId,
        publicKey,
        isCreated,
      };
    } catch (error) {
      console.error(
        `NearWalletService: Failed to import ${this.currentNetwork} wallet:`,
        error
      );
      throw new Error(
        `Failed to import ${this.currentNetwork} NEAR wallet: ${error}`
      );
    }
  }

  async connectWallet(accountId: string): Promise<WalletAccount> {
    try {
      console.log(
        `NearWalletService: Connecting ${this.currentNetwork} wallet...`
      );

      // Initialize NEAR if not already done
      if (!this.provider) {
        await this.initialize();
      }

      if (!this.provider) {
        throw new Error("Failed to initialize NEAR connection");
      }

      // Check if account exists on blockchain
      const isCreated = await this.accountExists(accountId);

      if (!isCreated) {
        console.log(
          `NearWalletService: Account does not exist on ${this.currentNetwork} blockchain yet`
        );

        // Get the public key from key store
        const config = this.getNetworkConfig();
        const publicKey = await this.keyStore.getKey(
          config.networkId,
          accountId
        );

        const walletAccount: WalletAccount = {
          accountId,
          publicKey: publicKey ? publicKey.getPublicKey().toString() : "",
          balance: "0",
          isCreated: false,
        };

        // Update local storage
        this.accounts.set(accountId, walletAccount);

        return walletAccount;
      }

      // Get the account from NEAR
      const account = new Account(accountId, this.provider);

      // Get account state
      const state = await account.state();

      // Get the public key from key store
      const config = this.getNetworkConfig();
      const publicKey = await this.keyStore.getKey(config.networkId, accountId);

      const walletAccount: WalletAccount = {
        accountId,
        publicKey: publicKey ? publicKey.getPublicKey().toString() : "",
        balance: state.amount.toString(),
        isCreated: true,
      };

      // Update local storage
      this.accounts.set(accountId, walletAccount);

      console.log(`NearWalletService: ${this.currentNetwork} wallet connected`);
      return walletAccount;
    } catch (error) {
      console.error(
        `NearWalletService: Failed to connect ${this.currentNetwork} wallet:`,
        error
      );
      throw new Error(
        `Failed to connect ${this.currentNetwork} NEAR wallet: ${error}`
      );
    }
  }

  async signIn(accountId: string): Promise<WalletAccount> {
    try {
      console.log(`NearWalletService: Signing in to ${this.currentNetwork}...`);

      const account = await this.connectWallet(accountId);

      console.log(
        `NearWalletService: Sign in to ${this.currentNetwork} successful`
      );
      return account;
    } catch (error) {
      console.error(
        `NearWalletService: Failed to sign in to ${this.currentNetwork}:`,
        error
      );
      throw new Error(
        `Failed to sign in to ${this.currentNetwork} NEAR wallet: ${error}`
      );
    }
  }

  async signOut(): Promise<void> {
    try {
      console.log(
        `NearWalletService: Signing out from ${this.currentNetwork}...`
      );
      // Clear current session
      console.log(
        `NearWalletService: Signed out from ${this.currentNetwork} successfully`
      );
    } catch (error) {
      console.error(
        `NearWalletService: Failed to sign out from ${this.currentNetwork}:`,
        error
      );
      throw new Error(
        `Failed to sign out from ${this.currentNetwork} NEAR wallet: ${error}`
      );
    }
  }

  async getAccountBalance(accountId: string): Promise<string> {
    try {
      console.log(
        `NearWalletService: Getting balance for account ${accountId}...`
      );

      // Initialize NEAR if not already done
      if (!this.provider) {
        await this.initialize();
      }

      if (!this.provider) {
        throw new Error("Failed to initialize NEAR provider");
      }

      // Get account state
      const accountState = await this.provider.query({
        request_type: "view_account",
        finality: "final",
        account_id: accountId,
      });

      const balance = (accountState as any).amount || "0";

      console.log(`NearWalletService: Account balance retrieved: ${balance}`);

      return balance;
    } catch (error) {
      console.error(
        `NearWalletService: Failed to get account balance for ${accountId}:`,
        error
      );
      throw new Error(
        `Failed to get account balance for ${accountId}: ${error}`
      );
    }
  }

  // Get token balances for major NEAR tokens
  async getTokenBalances(accountId: string): Promise<any[]> {
    try {
      console.log(
        `NearWalletService: Getting token balances for account ${accountId}...`
      );

      // Initialize NEAR if not already done
      if (!this.provider) {
        await this.initialize();
      }

      if (!this.provider) {
        throw new Error("Failed to initialize NEAR provider");
      }

      const tokens = [
        { contract: "usn.testnet", symbol: "USN", name: "USN" },
        { contract: "aurora", symbol: "AURORA", name: "Aurora" },
        {
          contract: "ref-finance-101.testnet",
          symbol: "REF",
          name: "Ref Finance",
        },
        { contract: "oct.beta", symbol: "OCT", name: "Octopus Network" },
      ];

      const tokenBalances = [];

      // Get NEAR balance first
      const nearBalance = await this.getAccountBalance(accountId);
      const nearAmount = parseFloat(NEAR.toDecimal(nearBalance));

      tokenBalances.push({
        id: "1",
        name: "NEAR Protocol",
        symbol: "NEAR",
        price: 7.85,
        amount: nearAmount,
        totalValue: nearAmount * 7.85,
        iconColor: "#00C08B",
        contractAddress: "near",
      });

      // Try to get other token balances
      for (const token of tokens) {
        try {
          const response = await this.provider.query({
            request_type: "call_function",
            finality: "final",
            account_id: token.contract,
            method_name: "ft_balance_of",
            args_base64: Buffer.from(
              JSON.stringify({ account_id: accountId })
            ).toString("base64"),
          });

          if (response && (response as any).result) {
            const balance = JSON.parse(
              Buffer.from((response as any).result, "base64").toString()
            );
            const amount = parseFloat(balance) / Math.pow(10, 24); // Assuming 24 decimals like NEAR

            // Mock prices for demo (in real app, fetch from price API)
            const prices = {
              USN: 1.0,
              AURORA: 0.45,
              REF: 0.12,
              OCT: 0.08,
            };

            tokenBalances.push({
              id: tokenBalances.length + 1,
              name: token.name,
              symbol: token.symbol,
              price: prices[token.symbol as keyof typeof prices] || 0,
              amount: amount,
              totalValue:
                amount * (prices[token.symbol as keyof typeof prices] || 0),
              iconColor: this.getTokenColor(token.symbol),
              contractAddress: token.contract,
            });
          }
        } catch (error) {
          console.log(
            `NearWalletService: Failed to get ${token.symbol} balance:`,
            error
          );
          // Add mock balance for demo
          const mockAmounts = { USN: 2500, AURORA: 500, REF: 1000, OCT: 2000 };
          const prices = { USN: 1.0, AURORA: 0.45, REF: 0.12, OCT: 0.08 };

          tokenBalances.push({
            id: tokenBalances.length + 1,
            name: token.name,
            symbol: token.symbol,
            price: prices[token.symbol as keyof typeof prices] || 0,
            amount: mockAmounts[token.symbol as keyof typeof mockAmounts] || 0,
            totalValue:
              (mockAmounts[token.symbol as keyof typeof mockAmounts] || 0) *
              (prices[token.symbol as keyof typeof prices] || 0),
            iconColor: this.getTokenColor(token.symbol),
            contractAddress: token.contract,
          });
        }
      }

      console.log(
        `NearWalletService: Retrieved ${tokenBalances.length} token balances`
      );

      return tokenBalances;
    } catch (error) {
      console.error(
        `NearWalletService: Failed to get token balances for ${accountId}:`,
        error
      );
      // Return mock data as fallback
      return [
        {
          id: "1",
          name: "NEAR Protocol",
          symbol: "NEAR",
          price: 7.85,
          amount: 125.5,
          totalValue: 985.18,
          iconColor: "#00C08B",
          contractAddress: "near",
        },
        {
          id: "2",
          name: "USN",
          symbol: "USN",
          price: 1.0,
          amount: 2500,
          totalValue: 2500,
          iconColor: "#2775CA",
          contractAddress: "usn.testnet",
        },
        {
          id: "3",
          name: "Aurora",
          symbol: "AURORA",
          price: 0.45,
          amount: 500,
          totalValue: 225,
          iconColor: "#78D64B",
          contractAddress: "aurora",
        },
        {
          id: "4",
          name: "Ref Finance",
          symbol: "REF",
          price: 0.12,
          amount: 1000,
          totalValue: 120,
          iconColor: "#F7931E",
          contractAddress: "ref-finance-101.testnet",
        },
        {
          id: "5",
          name: "Octopus Network",
          symbol: "OCT",
          price: 0.08,
          amount: 2000,
          totalValue: 160,
          iconColor: "#FF6B35",
          contractAddress: "oct.beta",
        },
      ];
    }
  }

  // Helper method to get token colors
  private getTokenColor(symbol: string): string {
    const colors = {
      NEAR: "#00C08B",
      USN: "#2775CA",
      AURORA: "#78D64B",
      REF: "#F7931E",
      OCT: "#FF6B35",
    };
    return colors[symbol as keyof typeof colors] || "#666666";
  }

  async getAccountTransactions(
    accountId: string,
    limit: number = 10
  ): Promise<any[]> {
    try {
      console.log(
        `NearWalletService: Getting transactions for account ${accountId}...`
      );

      // Initialize NEAR if not already done
      if (!this.provider) {
        await this.initialize();
      }

      if (!this.provider) {
        throw new Error("Failed to initialize NEAR provider");
      }

      // Try to get real transactions from NEAR RPC
      try {
        const response = await this.provider.query({
          request_type: "EXPERIMENTAL_tx_status",
          finality: "final",
          account_id: accountId,
          limit: limit,
        });

        // Parse real transaction data
        if (response && (response as any).transactions) {
          const realTransactions = (response as any).transactions
            .filter((tx: any) => tx && tx.hash) // Filter out invalid transactions
            .map((tx: any, index: number) => {
              const transactionType = this.getTransactionType(tx);
              const direction = this.getTransactionDirection(tx, accountId);
              const amount = this.getTransactionAmount(tx);
              const currency = this.getTransactionCurrency(tx);

              return {
                id: tx.hash || `tx_${index}`,
                type: transactionType,
                direction: direction,
                from: tx.signer_id || "unknown",
                to: tx.receiver_id || "unknown",
                amount: amount,
                currency: currency,
                value: this.getTransactionValue(tx, currency),
                date: new Date(tx.block_timestamp / 1000000)
                  .toISOString()
                  .split("T")[0],
                hash: tx.hash || "",
                status: this.getTransactionStatus(tx),
              };
            })
            .filter((tx: any) => tx.amount > 0); // Only show transactions with amounts

          console.log(
            `NearWalletService: Retrieved ${realTransactions.length} real transactions for ${accountId}`
          );

          if (realTransactions.length > 0) {
            return realTransactions;
          }
        }
      } catch (rpcError) {
        console.log(
          "NearWalletService: RPC transaction query failed, using mock data",
          rpcError
        );
      }

      // Fallback to mock transactions if RPC fails or no real transactions found
      const mockTransactions = [
        {
          id: "1",
          type: "Transfer",
          direction: "incoming" as const,
          from: "alice.testnet",
          to: accountId,
          amount: 50,
          currency: "NEAR",
          value: 392.5,
          date: new Date().toISOString().split("T")[0],
          hash: "abc123def456...",
          status: "completed" as const,
        },
        {
          id: "2",
          type: "Transfer",
          direction: "outgoing" as const,
          from: accountId,
          to: "bob.testnet",
          amount: 25,
          currency: "NEAR",
          value: 196.25,
          date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
          hash: "def456ghi789...",
          status: "completed" as const,
        },
        {
          id: "3",
          type: "Token Transfer",
          direction: "incoming" as const,
          from: "ref-finance-101.testnet",
          to: accountId,
          amount: 500,
          currency: "REF",
          value: 60,
          date: new Date(Date.now() - 172800000).toISOString().split("T")[0],
          hash: "ghi789jkl012...",
          status: "completed" as const,
        },
        {
          id: "4",
          type: "Swap",
          direction: "outgoing" as const,
          from: accountId,
          to: "ref-finance-101.testnet",
          amount: 10,
          currency: "NEAR",
          value: 78.5,
          date: new Date(Date.now() - 259200000).toISOString().split("T")[0],
          hash: "jkl012mno345...",
          status: "completed" as const,
        },
      ];

      console.log(
        `NearWalletService: Using ${mockTransactions.length} mock transactions for ${accountId}`
      );

      return mockTransactions;
    } catch (error) {
      console.error(
        `NearWalletService: Failed to get transactions for ${accountId}:`,
        error
      );
      // Return empty array instead of throwing to avoid breaking the UI
      return [];
    }
  }

  // Helper method to determine transaction type
  private getTransactionType(tx: any): string {
    if (tx.actions && tx.actions.length > 0) {
      const action = tx.actions[0];
      if (action.Transfer) return "Transfer";
      if (action.FunctionCall) {
        const methodName = action.FunctionCall.method_name;
        if (methodName === "ft_transfer" || methodName === "ft_transfer_call") {
          return "Token Transfer";
        }
        if (methodName === "swap" || methodName === "exchange") {
          return "Swap";
        }
        if (methodName === "stake" || methodName === "unstake") {
          return "Staking";
        }
        return "Function Call";
      }
      if (action.CreateAccount) return "Create Account";
      if (action.DeployContract) return "Deploy Contract";
      if (action.Stake) return "Staking";
      if (action.AddKey) return "Add Key";
      if (action.DeleteKey) return "Delete Key";
    }
    return "Unknown";
  }

  // Helper method to determine transaction direction
  private getTransactionDirection(
    tx: any,
    accountId: string
  ): "incoming" | "outgoing" {
    if (tx.signer_id === accountId) return "outgoing";
    if (tx.receiver_id === accountId) return "incoming";
    return "incoming"; // Default fallback
  }

  // Helper method to get transaction amount
  private getTransactionAmount(tx: any): number {
    if (tx.actions && tx.actions.length > 0) {
      const action = tx.actions[0];
      if (action.Transfer && action.Transfer.deposit) {
        return parseFloat(NEAR.toDecimal(action.Transfer.deposit));
      }
      if (action.FunctionCall) {
        // For token transfers, try to parse the args
        try {
          const args = action.FunctionCall.args;
          if (args) {
            const decodedArgs = JSON.parse(
              Buffer.from(args, "base64").toString()
            );
            if (decodedArgs.amount) {
              // Convert from yocto units to regular units
              return parseFloat(decodedArgs.amount) / 1e24;
            }
          }
        } catch (error) {
          // If parsing fails, return 0
          console.log("Failed to parse function call args:", error);
        }
      }
    }
    return 0;
  }

  // Helper method to get transaction currency
  private getTransactionCurrency(tx: any): string {
    if (tx.actions && tx.actions.length > 0) {
      const action = tx.actions[0];
      if (action.FunctionCall) {
        // Check if it's a token transfer
        if (
          action.FunctionCall.method_name === "ft_transfer" ||
          action.FunctionCall.method_name === "ft_transfer_call"
        ) {
          // Try to determine token from receiver_id
          const receiverId = tx.receiver_id;
          if (receiverId.includes("usn")) return "USN";
          if (receiverId.includes("aurora")) return "AURORA";
          if (receiverId.includes("ref")) return "REF";
          if (receiverId.includes("oct")) return "OCT";
        }
      }
    }
    return "NEAR"; // Default to NEAR
  }

  // Helper method to get transaction status
  private getTransactionStatus(tx: any): "completed" | "failed" | "pending" {
    if (tx.status?.SuccessValue !== undefined) return "completed";
    if (tx.status?.Failure) return "failed";
    return "pending";
  }

  // Helper method to get transaction value
  private getTransactionValue(tx: any, currency: string = "NEAR"): number {
    const amount = this.getTransactionAmount(tx);

    // Token prices (in a real app, these would come from price feeds)
    const prices: { [key: string]: number } = {
      NEAR: 7.85,
      USN: 1.0,
      AURORA: 0.12,
      REF: 0.12,
      OCT: 0.08,
    };

    return amount * (prices[currency] || 1.0);
  }

  async sendTransaction(
    accountId: string,
    receiverId: string,
    amount: string
  ): Promise<string> {
    try {
      console.log(
        `NearWalletService: Sending ${this.currentNetwork} transaction...`
      );

      // Initialize NEAR if not already done
      if (!this.provider) {
        await this.initialize();
      }

      if (!this.provider) {
        throw new Error("Failed to initialize NEAR connection");
      }

      const account = new Account(accountId, this.provider);

      // Convert amount to yoctoNEAR
      const amountInYocto = NEAR.toUnits(amount);

      const result = await account.sendMoney(receiverId, BigInt(amountInYocto));

      console.log(
        `NearWalletService: ${this.currentNetwork} transaction sent:`,
        result.transaction.hash
      );
      return result.transaction.hash;
    } catch (error) {
      console.error(
        `NearWalletService: Failed to send ${this.currentNetwork} transaction:`,
        error
      );
      throw new Error(
        `Failed to send ${this.currentNetwork} transaction: ${error}`
      );
    }
  }

  // Helper method to check if account exists on blockchain
  async accountExists(accountId: string): Promise<boolean> {
    try {
      if (!this.provider) {
        await this.initialize();
      }

      if (!this.provider) {
        return false;
      }

      const account = new Account(accountId, this.provider);
      await account.state();
      return true;
    } catch (error) {
      return false;
    }
  }

  // Helper method to get faucet information
  getFaucetInfo(): FaucetInfo | null {
    if (this.currentNetwork === "testnet") {
      const config = this.getNetworkConfig();
      return {
        faucetUrl: config.walletUrl,
        instructions: `Visit the NEAR ${this.currentNetwork} Wallet to create an account and get ${this.currentNetwork} NEAR tokens`,
        requirements: [
          `Visit ${config.walletUrl}`,
          "Create a new account",
          "Use the provided private key to import your wallet",
          `Request ${this.currentNetwork} NEAR tokens from the faucet`,
        ],
      };
    }
    return null; // No faucet for mainnet
  }

  // Helper method to get explorer URL for an account
  getAccountExplorerUrl(accountId: string): string {
    const config = this.getNetworkConfig();
    return `${config.explorerUrl}/accounts/${accountId}`;
  }

  // Helper method to get wallet URL
  getWalletUrl(): string {
    const config = this.getNetworkConfig();
    return config.walletUrl;
  }

  // Helper method to format NEAR amount for display
  formatNearAmount(amount: string): string {
    return NEAR.toDecimal(amount);
  }

  // Helper method to parse NEAR amount from user input
  parseNearAmount(amount: string): string {
    return NEAR.toUnits(amount).toString();
  }

  isSignedIn(): boolean {
    return this.accounts.size > 0;
  }

  getAccountId(): string | null {
    const firstAccount = Array.from(this.accounts.keys())[0];
    return firstAccount || null;
  }

  getAccounts(): WalletAccount[] {
    return Array.from(this.accounts.values());
  }

  clearAccounts(): void {
    this.accounts.clear();
  }

  // Secure storage methods
  async getStoredSeedPhrase(accountId: string): Promise<string | null> {
    try {
      return await secureStorageService.getSeedPhrase(accountId);
    } catch (error) {
      console.error(
        "NearWalletService: Failed to retrieve stored seed phrase:",
        error
      );
      return null;
    }
  }

  async deleteStoredSeedPhrase(accountId: string): Promise<void> {
    try {
      await secureStorageService.deleteSeedPhrase(accountId);
      console.log("NearWalletService: Stored seed phrase deleted");
    } catch (error) {
      console.error(
        "NearWalletService: Failed to delete stored seed phrase:",
        error
      );
      throw new Error(`Failed to delete stored seed phrase: ${error}`);
    }
  }

  async isBiometricAvailable(): Promise<boolean> {
    return await secureStorageService.isBiometricAvailable();
  }

  async getSupportedBiometryType(): Promise<string | null> {
    return await secureStorageService.getSupportedBiometryType();
  }

  // Method to get private key from stored seed phrase (for wallet import)
  async getPrivateKeyFromStoredSeedPhrase(
    accountId: string
  ): Promise<string | null> {
    try {
      const seedPhrase = await this.getStoredSeedPhrase(accountId);
      if (!seedPhrase) {
        return null;
      }

      return this.getPrivateKeyFromSeedPhrase(seedPhrase);
    } catch (error) {
      console.error(
        "NearWalletService: Failed to get private key from stored seed phrase:",
        error
      );
      return null;
    }
  }
}

// Create a singleton instance
const nearWalletService = new NearWalletService();

export default nearWalletService;
