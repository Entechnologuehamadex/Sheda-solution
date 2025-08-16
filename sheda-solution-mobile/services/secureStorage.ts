import * as Keychain from "react-native-keychain";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export interface SecureStorageService {
  saveSeedPhrase: (accountId: string, seedPhrase: string) => Promise<void>;
  getSeedPhrase: (accountId: string) => Promise<string | null>;
  deleteSeedPhrase: (accountId: string) => Promise<void>;
  savePrivateKey: (accountId: string, privateKey: string) => Promise<void>;
  getPrivateKey: (accountId: string) => Promise<string | null>;
  deletePrivateKey: (accountId: string) => Promise<void>;
  clearAllData: () => Promise<void>;
  isBiometricAvailable: () => Promise<boolean>;
  getSupportedBiometryType: () => Promise<string | null>;
}

class SecureStorageServiceImpl implements SecureStorageService {
  private readonly SEED_PHRASE_PREFIX = "seed_phrase_";
  private readonly PRIVATE_KEY_PREFIX = "private_key_";
  private readonly isWeb = Platform.OS === "web";

  /**
   * Save seed phrase securely using device keychain or AsyncStorage for web
   */
  async saveSeedPhrase(accountId: string, seedPhrase: string): Promise<void> {
    try {
      const key = `${this.SEED_PHRASE_PREFIX}${accountId}`;
      
      if (this.isWeb) {
        // Use AsyncStorage for web platform
        await AsyncStorage.setItem(key, seedPhrase);
      } else {
        // Use Keychain for mobile platforms
        const options: Keychain.SetOptions = {
          accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
          accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
          securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
        };

        await Keychain.setInternetCredentials(
          key,
          accountId,
          seedPhrase,
          options
        );
      }
      
      console.log(`SecureStorage: Seed phrase saved for account ${accountId}`);
    } catch (error) {
      console.error("SecureStorage: Failed to save seed phrase:", error);
      throw new Error(`Failed to save seed phrase: ${error}`);
    }
  }

  /**
   * Retrieve seed phrase from secure storage
   */
  async getSeedPhrase(accountId: string): Promise<string | null> {
    try {
      const key = `${this.SEED_PHRASE_PREFIX}${accountId}`;
      
      if (this.isWeb) {
        // Use AsyncStorage for web platform
        return await AsyncStorage.getItem(key);
      } else {
        // Use Keychain for mobile platforms
        const credentials = await Keychain.getInternetCredentials(key);

        if (credentials && credentials.password) {
          console.log(
            `SecureStorage: Seed phrase retrieved for account ${accountId}`
          );
          return credentials.password;
        }
      }

      return null;
    } catch (error) {
      console.error("SecureStorage: Failed to retrieve seed phrase:", error);
      return null;
    }
  }

  /**
   * Delete seed phrase from secure storage
   */
  async deleteSeedPhrase(accountId: string): Promise<void> {
    try {
      const key = `${this.SEED_PHRASE_PREFIX}${accountId}`;
      
      if (this.isWeb) {
        // Use AsyncStorage for web platform
        await AsyncStorage.removeItem(key);
      } else {
        // Use Keychain for mobile platforms
        await Keychain.resetInternetCredentials({ server: key });
      }
      
      console.log(
        `SecureStorage: Seed phrase deleted for account ${accountId}`
      );
    } catch (error) {
      console.error("SecureStorage: Failed to delete seed phrase:", error);
      throw new Error(`Failed to delete seed phrase: ${error}`);
    }
  }

  /**
   * Save private key securely using device keychain or AsyncStorage for web
   */
  async savePrivateKey(accountId: string, privateKey: string): Promise<void> {
    try {
      const key = `${this.PRIVATE_KEY_PREFIX}${accountId}`;
      
      if (this.isWeb) {
        // Use AsyncStorage for web platform
        await AsyncStorage.setItem(key, privateKey);
      } else {
        // Use Keychain for mobile platforms
        const options: Keychain.SetOptions = {
          accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
          accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
          securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
        };

        await Keychain.setInternetCredentials(
          key,
          accountId,
          privateKey,
          options
        );
      }
      
      console.log(`SecureStorage: Private key saved for account ${accountId}`);
    } catch (error) {
      console.error("SecureStorage: Failed to save private key:", error);
      throw new Error(`Failed to save private key: ${error}`);
    }
  }

  /**
   * Get private key from secure storage
   */
  async getPrivateKey(accountId: string): Promise<string | null> {
    try {
      const key = `${this.PRIVATE_KEY_PREFIX}${accountId}`;
      
      if (this.isWeb) {
        // Use AsyncStorage for web platform
        return await AsyncStorage.getItem(key);
      } else {
        // Use Keychain for mobile platforms
        const credentials = await Keychain.getInternetCredentials(key);
        if (credentials) {
          console.log(
            `SecureStorage: Private key retrieved for account ${accountId}`
          );
          return credentials.password;
        }
      }
      
      return null;
    } catch (error) {
      console.error("SecureStorage: Failed to retrieve private key:", error);
      return null;
    }
  }

  /**
   * Delete private key from secure storage
   */
  async deletePrivateKey(accountId: string): Promise<void> {
    try {
      const key = `${this.PRIVATE_KEY_PREFIX}${accountId}`;
      
      if (this.isWeb) {
        // Use AsyncStorage for web platform
        await AsyncStorage.removeItem(key);
      } else {
        // Use Keychain for mobile platforms
        await Keychain.resetInternetCredentials({ server: key });
      }
      
      console.log(
        `SecureStorage: Private key deleted for account ${accountId}`
      );
    } catch (error) {
      console.error("SecureStorage: Failed to delete private key:", error);
      throw new Error(`Failed to delete private key: ${error}`);
    }
  }

  /**
   * Clear all stored data
   */
  async clearAllData(): Promise<void> {
    try {
      if (this.isWeb) {
        // Use AsyncStorage for web platform
        await AsyncStorage.clear();
      } else {
        // Use Keychain for mobile platforms
        await Keychain.resetInternetCredentials({ server: "" });
      }
      
      console.log("SecureStorage: All data cleared");
    } catch (error) {
      console.error("SecureStorage: Failed to clear all data:", error);
      throw new Error(`Failed to clear all data: ${error}`);
    }
  }

  /**
   * Check if biometric authentication is available
   */
  async isBiometricAvailable(): Promise<boolean> {
    try {
      if (this.isWeb) {
        // Web doesn't support biometric authentication
        return false;
      }
      
      const biometryType = await Keychain.getSupportedBiometryType();
      return biometryType !== null;
    } catch (error) {
      console.error(
        "SecureStorage: Failed to check biometric availability:",
        error
      );
      return false;
    }
  }

  /**
   * Get supported biometric type
   */
  async getSupportedBiometryType(): Promise<string | null> {
    try {
      if (this.isWeb) {
        // Web doesn't support biometric authentication
        return null;
      }
      
      return await Keychain.getSupportedBiometryType();
    } catch (error) {
      console.error(
        "SecureStorage: Failed to get supported biometry type:",
        error
      );
      return null;
    }
  }
}

// Create singleton instance
const secureStorageService = new SecureStorageServiceImpl();

export default secureStorageService;
