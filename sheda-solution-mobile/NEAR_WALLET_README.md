# NEAR Wallet Integration

This document describes the NEAR wallet integration implemented in the Sheda mobile app.

## Overview

The NEAR wallet integration provides users with the ability to:

- Create new NEAR wallets
- Import existing wallets using private keys
- Sign in with NEAR accounts
- View wallet balance and account information
- Send NEAR transactions
- Manage wallet connections

## Architecture

### Core Components

1. **NearWalletService** (`services/nearWallet.ts`)

   - Handles all NEAR blockchain interactions
   - Manages wallet connections and key storage
   - Provides methods for creating, importing, and connecting wallets

2. **WalletContext** (`contexts/WalletContext.tsx`)

   - React context for managing wallet state
   - Provides wallet functionality throughout the app
   - Handles loading states and error management

3. **WalletDashboard** (`components/WalletDashboard.tsx`)

   - UI component for displaying wallet information
   - Shows balance, account details, and transaction functionality

4. **NearWalletSignIn** (`components/NearWalletSignIn.tsx`)
   - Sign-in component for NEAR wallet authentication

## Setup Instructions

### 1. Install Dependencies

The NEAR API JS library is already installed:

```bash
npm install near-api-js
```

### 2. Network Configuration

The wallet is configured to use the NEAR testnet by default. To switch to mainnet, update the `NEAR_CONFIG` in `services/nearWallet.ts`:

```typescript
const NEAR_CONFIG = {
  networkId: "mainnet", // Change from 'testnet'
  nodeUrl: "https://rpc.mainnet.near.org",
  walletUrl: "https://wallet.near.org",
  helperUrl: "https://helper.near.org",
  explorerUrl: "https://explorer.near.org",
};
```

### 3. App Configuration

The WalletProvider is already integrated into the main app layout (`app/_layout.tsx`).

## Usage

### Creating a New Wallet

```typescript
import { useWallet } from "@/contexts/WalletContext";

const { createWallet } = useWallet();

const handleCreateWallet = async () => {
  try {
    const wallet = await createWallet();
    console.log("Wallet created:", wallet.accountId);
  } catch (error) {
    console.error("Failed to create wallet:", error);
  }
};
```

### Importing an Existing Wallet

```typescript
import { useWallet } from "@/contexts/WalletContext";

const { importWallet } = useWallet();

const handleImportWallet = async (privateKey: string) => {
  try {
    const wallet = await importWallet(privateKey);
    console.log("Wallet imported:", wallet.accountId);
  } catch (error) {
    console.error("Failed to import wallet:", error);
  }
};
```

### Signing In

```typescript
import { useWallet } from "@/contexts/WalletContext";

const { signIn } = useWallet();

const handleSignIn = async (accountId: string) => {
  try {
    const account = await signIn(accountId);
    console.log("Signed in:", account.accountId);
  } catch (error) {
    console.error("Failed to sign in:", error);
  }
};
```

### Getting Account Balance

```typescript
import { useWallet } from "@/contexts/WalletContext";

const { getAccountBalance } = useWallet();

const handleGetBalance = async (accountId: string) => {
  try {
    const balance = await getAccountBalance(accountId);
    console.log("Balance:", balance);
  } catch (error) {
    console.error("Failed to get balance:", error);
  }
};
```

### Sending Transactions

```typescript
import { useWallet } from "@/contexts/WalletContext";

const { sendTransaction } = useWallet();

const handleSendTransaction = async (
  accountId: string,
  receiverId: string,
  amount: string
) => {
  try {
    const transactionHash = await sendTransaction(
      accountId,
      receiverId,
      amount
    );
    console.log("Transaction hash:", transactionHash);
  } catch (error) {
    console.error("Failed to send transaction:", error);
  }
};
```

## API Reference

### NearWalletService

#### Methods

- `initialize()`: Initialize the NEAR connection
- `createWallet()`: Create a new NEAR wallet
- `importWallet(privateKey)`: Import an existing wallet
- `connectWallet(accountId)`: Connect to a wallet account
- `signIn(accountId)`: Sign in with a NEAR account
- `signOut()`: Sign out from the current wallet
- `getAccountBalance(accountId)`: Get account balance
- `sendTransaction(accountId, receiverId, amount)`: Send NEAR tokens
- `isSignedIn()`: Check if user is signed in
- `getAccountId()`: Get current account ID
- `getWalletConnection()`: Get the wallet connection object

### WalletContext

#### State

- `walletState`: Current wallet state (isConnected, account, walletConnection)
- `loading`: Loading state for async operations
- `error`: Error message if any

#### Methods

All methods from NearWalletService are available through the context.

## UI Components

### WalletDashboard

Displays wallet information and provides transaction functionality.

**Props:**

- `onSignOut?: () => void`: Callback when user signs out

### NearWalletSignIn

Provides a sign-in interface for NEAR wallets.

**Props:**

- `onSuccess?: (accountId: string) => void`: Callback on successful sign-in
- `onCancel?: () => void`: Callback when user cancels

## Security Considerations

1. **Private Key Storage**: Private keys are stored in memory only. For production, consider using secure storage solutions.

2. **Network Selection**: The app uses testnet by default. Ensure proper network selection for production.

3. **Error Handling**: All wallet operations include proper error handling and user feedback.

4. **Transaction Validation**: Implement additional validation for transaction amounts and receiver addresses.

## Testing

### Testnet Usage

1. Create a testnet account at https://wallet.testnet.near.org
2. Get test NEAR tokens from the faucet
3. Test wallet creation and transactions

### Mainnet Usage

1. Create a mainnet account at https://wallet.near.org
2. Ensure you have NEAR tokens for transactions
3. Update network configuration to mainnet

## Troubleshooting

### Common Issues

1. **Connection Errors**: Check network connectivity and NEAR RPC endpoint
2. **Transaction Failures**: Ensure sufficient balance and valid receiver address
3. **Sign-in Issues**: Verify account ID format and network selection

### Debug Mode

Enable debug logging by adding console.log statements in the wallet service methods.

## Future Enhancements

1. **Secure Key Storage**: Implement secure storage for private keys
2. **Multi-account Support**: Support for multiple wallet accounts
3. **Transaction History**: Display transaction history
4. **Token Support**: Support for NEAR tokens (NEP-141)
5. **Contract Interactions**: Support for smart contract interactions
6. **Biometric Authentication**: Add biometric authentication for wallet access

## Dependencies

- `near-api-js`: NEAR blockchain API
- React Native components for UI
- Expo Router for navigation

## License

This implementation follows the same license as the main project.
