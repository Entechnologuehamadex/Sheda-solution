import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiService, {
  UserShow,
  Token,
  UserCreate,
  UserUpdate,
  PropertyShow,
  PropertyBase,
  PropertyUpdate,
  AppointmentSchema,
  AppointmentShow,
  AccountInfoBase,
  AccountInfoShow,
  AgentAvailabilitySchema,
  AvailabilityShow,
  ContractCreate,
  ContractResponse,
  PropertyFeed,
  AgentFeed,
  ChatMessageSchema,
  FileShow,
} from "../services/api";

// State interface
interface ApiState {
  // Authentication
  isAuthenticated: boolean;
  token: string | null;
  user: UserShow | null;

  // Loading states
  isLoading: boolean;
  isInitializing: boolean;

  // Data states
  properties: PropertyShow[];
  myListings: PropertyShow[];
  appointments: AppointmentShow[];
  paymentInfo: AccountInfoShow[];
  schedule: AvailabilityShow[];
  chatHistory: ChatMessageSchema[];

  // Pagination
  propertyFeed: PropertyFeed | null;

  // Error handling
  error: string | null;
}

// Action types
type ApiAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_INITIALIZING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_TOKEN"; payload: string | null }
  | { type: "SET_USER"; payload: UserShow | null }
  | { type: "SET_AUTHENTICATED"; payload: boolean }
  | { type: "SET_PROPERTIES"; payload: PropertyShow[] }
  | { type: "SET_MY_LISTINGS"; payload: PropertyShow[] }
  | { type: "SET_APPOINTMENTS"; payload: AppointmentShow[] }
  | { type: "SET_PAYMENT_INFO"; payload: AccountInfoShow[] }
  | { type: "SET_SCHEDULE"; payload: AvailabilityShow[] }
  | { type: "SET_CHAT_HISTORY"; payload: ChatMessageSchema[] }
  | { type: "SET_PROPERTY_FEED"; payload: PropertyFeed }
  | { type: "ADD_PROPERTY"; payload: PropertyShow }
  | { type: "UPDATE_PROPERTY"; payload: PropertyShow }
  | { type: "DELETE_PROPERTY"; payload: number }
  | { type: "ADD_APPOINTMENT"; payload: AppointmentShow }
  | { type: "UPDATE_APPOINTMENT"; payload: AppointmentShow }
  | { type: "DELETE_APPOINTMENT"; payload: number }
  | { type: "ADD_PAYMENT_INFO"; payload: AccountInfoShow }
  | { type: "UPDATE_PAYMENT_INFO"; payload: AccountInfoShow }
  | { type: "DELETE_PAYMENT_INFO"; payload: number }
  | { type: "ADD_AVAILABILITY"; payload: AvailabilityShow }
  | { type: "UPDATE_AVAILABILITY"; payload: AvailabilityShow }
  | { type: "RESET_STATE" };

// Initial state
const initialState: ApiState = {
  isAuthenticated: false,
  token: null,
  user: null,
  isLoading: false,
  isInitializing: true,
  properties: [],
  myListings: [],
  appointments: [],
  paymentInfo: [],
  schedule: [],
  chatHistory: [],
  propertyFeed: null,
  error: null,
};

// Reducer
function apiReducer(state: ApiState, action: ApiAction): ApiState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_INITIALIZING":
      return { ...state, isInitializing: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_AUTHENTICATED":
      return { ...state, isAuthenticated: action.payload };
    case "SET_PROPERTIES":
      return { ...state, properties: action.payload };
    case "SET_MY_LISTINGS":
      return { ...state, myListings: action.payload };
    case "SET_APPOINTMENTS":
      return { ...state, appointments: action.payload };
    case "SET_PAYMENT_INFO":
      return { ...state, paymentInfo: action.payload };
    case "SET_SCHEDULE":
      return { ...state, schedule: action.payload };
    case "SET_CHAT_HISTORY":
      return { ...state, chatHistory: action.payload };
    case "SET_PROPERTY_FEED":
      return { ...state, propertyFeed: action.payload };
    case "ADD_PROPERTY":
      return { ...state, properties: [...state.properties, action.payload] };
    case "UPDATE_PROPERTY":
      return {
        ...state,
        properties: state.properties.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
        myListings: state.myListings.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case "DELETE_PROPERTY":
      return {
        ...state,
        properties: state.properties.filter((p) => p.id !== action.payload),
        myListings: state.myListings.filter((p) => p.id !== action.payload),
      };
    case "ADD_APPOINTMENT":
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
      };
    case "UPDATE_APPOINTMENT":
      return {
        ...state,
        appointments: state.appointments.map((a) =>
          a.id === action.payload.id ? action.payload : a
        ),
      };
    case "DELETE_APPOINTMENT":
      return {
        ...state,
        appointments: state.appointments.filter((a) => a.id !== action.payload),
      };
    case "ADD_PAYMENT_INFO":
      return { ...state, paymentInfo: [...state.paymentInfo, action.payload] };
    case "UPDATE_PAYMENT_INFO":
      return {
        ...state,
        paymentInfo: state.paymentInfo.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case "DELETE_PAYMENT_INFO":
      return {
        ...state,
        paymentInfo: state.paymentInfo.filter((p) => p.id !== action.payload),
      };
    case "ADD_AVAILABILITY":
      return { ...state, schedule: [...state.schedule, action.payload] };
    case "UPDATE_AVAILABILITY":
      return {
        ...state,
        schedule: state.schedule.map((a) =>
          a.id === action.payload.id ? action.payload : a
        ),
      };
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
}

// Context interface
interface ApiContextType extends ApiState {
  // Authentication methods
  signup: (userData: UserCreate) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyAccount: () => Promise<void>;
  resetPassword: (
    password: string,
    otpCode: string,
    email?: string
  ) => Promise<void>;
  sendOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string | number) => Promise<Token>;
  refreshToken: () => Promise<void>;
  switchAccount: (accountType: "client" | "agent") => Promise<void>;

  // User methods
  getMe: () => Promise<void>;
  refreshUserData: () => Promise<void>;
  isUserAuthenticated: () => Promise<boolean>;
  updateMe: (userData: UserUpdate) => Promise<void>;
  deleteAccount: () => Promise<void>;

  // Property methods
  getProperties: (limit?: number, cursor?: number) => Promise<void>;
  getMyListings: () => Promise<void>;
  listProperty: (propertyData: PropertyBase) => Promise<void>;
  updateProperty: (
    propertyId: number,
    propertyData: PropertyUpdate
  ) => Promise<void>;
  deleteProperty: (propertyId: number) => Promise<void>;
  getAgentProfile: (agentId: number) => Promise<AgentFeed>;
  getPropertyById: (propertyId: number) => Promise<PropertyShow>;

  // Appointment methods
  bookAppointment: (appointmentData: AppointmentSchema) => Promise<void>;
  cancelAppointment: (appointmentId: number) => Promise<void>;

  // Payment methods
  createPaymentInfo: (accountInfo: AccountInfoBase) => Promise<void>;
  getPaymentInfo: (userId?: number) => Promise<void>;
  updatePaymentInfo: (
    accountInfoId: number,
    accountInfo: AccountInfoBase
  ) => Promise<void>;
  deleteAccountInfo: (accountInfoId: number) => Promise<void>;

  // Schedule methods
  createAvailableTime: (availability: AgentAvailabilitySchema) => Promise<void>;
  getSchedule: () => Promise<void>;
  updateSchedule: (
    scheduleId: number,
    availability: AgentAvailabilitySchema
  ) => Promise<void>;

  // Contract methods
  createContract: (contractData: ContractCreate) => Promise<ContractResponse>;
  confirmPayment: (contractId: number) => Promise<void>;
  approvePayment: (contractId: number) => Promise<void>;

  // Chat methods
  getChatHistory: () => Promise<void>;

  // Media methods
  uploadFile: (type: "profile" | "property", file: any) => Promise<FileShow>;
  getFiles: (type: "profile" | "property") => Promise<FileShow[]>;

  // Utility methods
  clearError: () => void;
}

// Create context
const ApiContext = createContext<ApiContextType | undefined>(undefined);

// Provider component
interface ApiProviderProps {
  children: ReactNode;
}

export function ApiProvider({ children }: ApiProviderProps) {
  const [state, dispatch] = useReducer(apiReducer, initialState);

  // Initialize app
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      dispatch({ type: "SET_INITIALIZING", payload: true });
      console.log("🔄 Initializing app...");

      // Check for existing token and user data
      const [token, userDataString] = await Promise.all([
        AsyncStorage.getItem("auth_token"),
        AsyncStorage.getItem("user_data"),
      ]);

      console.log("📱 Stored data found:", {
        hasToken: !!token,
        hasUserData: !!userDataString,
      });

      if (token && userDataString) {
        try {
          console.log("🔐 Attempting auto-login with stored data...");

          // Set token in API service
          await apiService.setToken(token);

          // Parse user data
          const userData = JSON.parse(userDataString);
          console.log("👤 Stored user data:", userData);

          // First, try to restore from stored data immediately for better UX
          dispatch({ type: "SET_TOKEN", payload: token });
          dispatch({ type: "SET_USER", payload: userData });
          dispatch({ type: "SET_AUTHENTICATED", payload: true });

          // Extract and store related data from stored user data
          if (userData.listing) {
            dispatch({ type: "SET_MY_LISTINGS", payload: userData.listing });
          }
          if (userData.appointments) {
            dispatch({
              type: "SET_APPOINTMENTS",
              payload: userData.appointments,
            });
          }
          if (userData.account_info) {
            dispatch({
              type: "SET_PAYMENT_INFO",
              payload: userData.account_info,
            });
          }
          if (userData.availabilities) {
            dispatch({
              type: "SET_SCHEDULE",
              payload: userData.availabilities,
            });
          }

          console.log("✅ Restored user session from stored data");

          // Then verify token is still valid by making a test API call in background
          try {
            const freshUser = await apiService.getMe();
            console.log("✅ Token is valid, updating with fresh data");

            // Update with fresh data
            dispatch({ type: "SET_USER", payload: freshUser });

            // Update stored user data with fresh data from API
            await AsyncStorage.setItem("user_data", JSON.stringify(freshUser));
            console.log("💾 Updated stored user data with fresh data");

            // Extract and store fresh related data
            if (freshUser.listing) {
              dispatch({ type: "SET_MY_LISTINGS", payload: freshUser.listing });
            }
            if (freshUser.appointments) {
              dispatch({
                type: "SET_APPOINTMENTS",
                payload: freshUser.appointments,
              });
            }
            if (freshUser.account_info) {
              dispatch({
                type: "SET_PAYMENT_INFO",
                payload: freshUser.account_info,
              });
            }
            if (freshUser.availabilities) {
              dispatch({
                type: "SET_SCHEDULE",
                payload: freshUser.availabilities,
              });
            }
          } catch (tokenError) {
            console.log(
              "⚠️ Token verification failed, clearing stored data:",
              tokenError
            );
            // Clear stored data since token is invalid
            await AsyncStorage.multiRemove(["auth_token", "user_data"]);
            await apiService.clearToken();
            dispatch({ type: "SET_TOKEN", payload: null });
            dispatch({ type: "SET_USER", payload: null });
            dispatch({ type: "SET_AUTHENTICATED", payload: false });
            console.log("🔑 Cleared invalid authentication data");
          }
        } catch (error) {
          console.log("❌ Failed to restore session:", error);
          // Only clear data if we can't even restore from stored data
          await AsyncStorage.multiRemove(["auth_token", "user_data"]);
          await apiService.clearToken();
          dispatch({ type: "SET_TOKEN", payload: null });
          dispatch({ type: "SET_USER", payload: null });
          dispatch({ type: "SET_AUTHENTICATED", payload: false });
        }
      } else {
        // No stored data, ensure clean state
        console.log("📱 No stored authentication data found");
        dispatch({ type: "SET_TOKEN", payload: null });
        dispatch({ type: "SET_USER", payload: null });
        dispatch({ type: "SET_AUTHENTICATED", payload: false });
      }
    } catch (error) {
      console.error("❌ Failed to initialize app:", error);
      dispatch({ type: "SET_ERROR", payload: "Failed to initialize app" });
    } finally {
      dispatch({ type: "SET_INITIALIZING", payload: false });
      console.log("✅ App initialization completed");
    }
  };

  // Wrapper for API calls with error handling
  const apiCall = async (
    apiMethod: () => Promise<any>,
    successAction?: (data: any) => void
  ): Promise<any> => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      const result = await apiMethod();

      if (successAction) {
        successAction(result);
      }

      return result;
    } catch (error: any) {
      console.error("❌ API Call Error:", error);

      // Handle different types of errors
      let errorMessage = "An error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      } else if (error?.response) {
        // Handle HTTP response errors
        const status = error.response.status;
        const data = error.response.data;

        if (data?.detail) {
          // Handle FastAPI validation errors
          if (Array.isArray(data.detail)) {
            errorMessage = data.detail
              .map((err: any) => err.msg || err.message)
              .join(", ");
          } else {
            errorMessage = data.detail;
          }
        } else if (data?.message) {
          errorMessage = data.message;
        } else {
          // Generic HTTP error messages
          switch (status) {
            case 400:
              errorMessage = "Bad request. Please check your input.";
              break;
            case 401:
              errorMessage = "Authentication failed. Please login again.";
              // Handle token expiration gracefully
              console.log("🔑 Token expired, attempting to refresh...");
              try {
                await refreshToken();
                console.log("✅ Token refreshed successfully");
                // Retry the original request
                return await apiMethod();
              } catch (refreshError) {
                console.log("❌ Token refresh failed, logging out user");
                // Token refresh failed, log out the user
                await logout();
                errorMessage = "Session expired. Please login again.";
              }
              break;
            case 403:
              errorMessage =
                "Access denied. You don't have permission for this action.";
              break;
            case 404:
              errorMessage = "Resource not found.";
              break;
            case 422:
              errorMessage = "Validation error. Please check your input.";
              break;
            case 500:
              errorMessage = "Server error. Please try again later.";
              break;
            default:
              errorMessage = `Request failed (${status})`;
          }
        }
      } else if (error?.message) {
        errorMessage = error.message;
      }

      console.error("📝 Final Error Message:", errorMessage);
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      throw new Error(errorMessage);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // User methods (defined first to avoid hoisting issues)
  /**
   * Fetches all user data including profile, listings, appointments, payment info, and schedule
   * This function is called after login and stores all related data in the global state
   * so individual pages don't need to make separate API calls
   */
  const getMe = async () => {
    console.log("🔄 Fetching all user data...");
    const user = await apiCall(() => apiService.getMe());
    console.log("📥 Raw user data from API:", user);
    console.log("📥 User account_type:", user?.account_type);
    console.log("📥 User account_type type:", typeof user?.account_type);
    console.log("📥 Full user data JSON:", JSON.stringify(user, null, 2));

    dispatch({ type: "SET_USER", payload: user });

    // Extract and store all related data from the user response
    if (user.listing) {
      console.log(`📋 Found ${user.listing.length} listings, storing in state`);
      dispatch({ type: "SET_MY_LISTINGS", payload: user.listing });
    }

    if (user.appointments) {
      console.log(
        `📅 Found ${user.appointments.length} appointments, storing in state`
      );
      dispatch({ type: "SET_APPOINTMENTS", payload: user.appointments });
    }

    if (user.account_info) {
      console.log(
        `💳 Found ${user.account_info.length} payment info items, storing in state`
      );
      dispatch({ type: "SET_PAYMENT_INFO", payload: user.account_info });
    }

    if (user.availabilities) {
      console.log(
        `⏰ Found ${user.availabilities.length} availability slots, storing in state`
      );
      dispatch({ type: "SET_SCHEDULE", payload: user.availabilities });
    }

    console.log("✅ All user data fetched and stored successfully");

    // Save user data to AsyncStorage
    await AsyncStorage.setItem("user_data", JSON.stringify(user));
  };

  /**
   * Refreshes all user data by calling getMe()
   * Useful when data might be stale or when you need to sync with the server
   */
  const refreshUserData = async () => {
    console.log("🔄 Refreshing all user data...");
    await getMe();
  };

  /**
   * Checks if user is already authenticated by checking stored token
   * Returns true if user has valid stored authentication data
   */
  const isUserAuthenticated = async (): Promise<boolean> => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      const userData = await AsyncStorage.getItem("user_data");
      return !!(token && userData);
    } catch (error) {
      console.error("Error checking authentication status:", error);
      return false;
    }
  };

  // Authentication methods
  const signup = async (userData: UserCreate) => {
    console.log("🚀 Starting signup process...", userData);

    // Get the signup response which should include user data and token
    const signupResponse = await apiCall(() => apiService.signup(userData));
    console.log("✅ Signup response:", signupResponse);

    // Handle the new response structure: { token: { access_token }, user_data: {...} }
    if (signupResponse.token?.access_token) {
      const accessToken = signupResponse.token.access_token;
      await apiService.setToken(accessToken);
      await AsyncStorage.setItem("auth_token", accessToken);
      console.log("💾 Token saved to AsyncStorage");

      dispatch({ type: "SET_TOKEN", payload: accessToken });
      dispatch({ type: "SET_AUTHENTICATED", payload: true });

      // Set user data from the response
      if (signupResponse.user_data) {
        dispatch({ type: "SET_USER", payload: signupResponse.user_data });
        await AsyncStorage.setItem(
          "user_data",
          JSON.stringify(signupResponse.user_data)
        );
        console.log(
          "💾 User data saved to AsyncStorage:",
          signupResponse.user_data
        );
      }
    }

    console.log("✅ Signup completed successfully");
  };

  const login = async (username: string, password: string) => {
    console.log("🔐 Starting login process...", { username });

    const token = await apiCall(() => apiService.login(username, password));
    console.log("✅ Login response:", token);

    await apiService.setToken(token.access_token);

    // Save token to AsyncStorage
    await AsyncStorage.setItem("auth_token", token.access_token);
    console.log("💾 Token saved to AsyncStorage");

    dispatch({ type: "SET_TOKEN", payload: token.access_token });
    dispatch({ type: "SET_AUTHENTICATED", payload: true });

    // Get user data
    try {
      await getMe();
      console.log("✅ Login completed successfully");
    } catch (error) {
      console.error("Failed to get user data after login:", error);
      // Don't fail the login process if getMe fails
    }
  };

  const logout = async () => {
    console.log("🚪 Starting logout process...");

    try {
      await apiCall(() => apiService.logout());
      console.log("✅ Logout API call successful");
    } catch (error) {
      console.log(
        "⚠️ Logout API call failed, but continuing with local cleanup:",
        error
      );
    }

    // Clear AsyncStorage
    try {
      await AsyncStorage.multiRemove(["auth_token", "user_data"]);
      console.log("🗑️ Cleared AsyncStorage data");
    } catch (storageError) {
      console.error("❌ Failed to clear AsyncStorage:", storageError);
    }

    try {
      await apiService.clearToken();
      console.log("🗑️ Cleared API service token");
    } catch (tokenError) {
      console.error("❌ Failed to clear API service token:", tokenError);
    }

    try {
      dispatch({ type: "RESET_STATE" });
      console.log("🔄 Reset application state");
    } catch (dispatchError) {
      console.error("❌ Failed to reset state:", dispatchError);
    }

    console.log("✅ Logout completed successfully");

    // Ensure authentication state is properly reset
    dispatch({ type: "SET_AUTHENTICATED", payload: false });
    dispatch({ type: "SET_USER", payload: null });
    dispatch({ type: "SET_TOKEN", payload: null });

    console.log("🔑 Authentication state reset to false");

    // The AuthGuard will automatically redirect to login page
    // since the user is no longer authenticated
  };

  const verifyAccount = async () => {
    const token = await apiCall(() => apiService.verifyAccount());
    await apiService.setToken(token.access_token);
    dispatch({ type: "SET_TOKEN", payload: token.access_token });
  };

  const resetPassword = async (
    password: string,
    otpCode: string,
    email?: string
  ) => {
    console.log("🔐 Starting password reset...");

    const token = await apiCall(() =>
      apiService.resetPassword(password, otpCode, email)
    );
    console.log("✅ Password reset successful, token received:", token);

    await apiService.setToken(token.access_token);
    console.log("🔑 Token set in API service");

    // Save token to AsyncStorage
    await AsyncStorage.setItem("auth_token", token.access_token);
    console.log("💾 Token saved to AsyncStorage");

    dispatch({ type: "SET_TOKEN", payload: token.access_token });
    dispatch({ type: "SET_AUTHENTICATED", payload: true });

    // Don't call getMe() here - let the user navigate and fetch data when needed
    console.log("✅ Password reset completed successfully");
  };

  const sendOtp = async (email: string) => {
    await apiCall(() => apiService.sendOtp(email));
  };

  const verifyOtp = async (email: string, otp: string | number) => {
    console.log("🔐 Starting OTP verification...", { email, otp });

    const token = await apiCall(() => apiService.verifyOtp(email, otp));
    console.log("✅ OTP verification successful, token received:", token);

    await apiService.setToken(token.access_token);
    console.log("🔑 Token set in API service");

    // Save token to AsyncStorage
    await AsyncStorage.setItem("auth_token", token.access_token);
    console.log("💾 Token saved to AsyncStorage");

    dispatch({ type: "SET_TOKEN", payload: token.access_token });
    console.log("✅ Authentication state updated");

    // Don't call getMe() here because OTP token has limited scope
    // User data will be fetched after password reset with the new token

    return token; // Return the token
  };

  const refreshToken = async () => {
    const token = await apiCall(() => apiService.refreshToken());
    await apiService.setToken(token.access_token);
    dispatch({ type: "SET_TOKEN", payload: token.access_token });
  };

  const switchAccount = async (accountType: "client" | "agent") => {
    const token = await apiCall(() => apiService.switchAccount(accountType));
    await apiService.setToken(token.access_token);
    dispatch({ type: "SET_TOKEN", payload: token.access_token });

    // Refresh user data
    await getMe();
  };

  const updateMe = async (userData: UserUpdate) => {
    console.log("🔄 Updating user profile with data:", userData);
    try {
      await apiCall(() => apiService.updateMe(userData));
      console.log("✅ User profile updated successfully");
      // Refresh user data
      await getMe();
    } catch (error: any) {
      console.error("❌ Profile update failed:", error);
      console.error("❌ Error response:", error?.response?.data);

      // Check if the error suggests token refresh or account type switch
      if (
        error?.message?.includes("refresh token") ||
        error?.message?.includes("switch to appropriate account type") ||
        error?.message?.includes("Token has been revoked")
      ) {
        console.log("🔄 Token issue detected, attempting to handle...");

        // If token is revoked, force logout
        if (error?.message?.includes("Token has been revoked")) {
          console.log("🔑 Token revoked, forcing logout...");
          await logout();
          throw new Error("Your session has expired. Please login again.");
        }

        // For other token issues, try refresh first
        try {
          console.log("🔄 Attempting to refresh token...");
          await refreshToken();
          console.log("✅ Token refreshed, retrying update...");

          // Retry the update with fresh token
          await apiCall(() => apiService.updateMe(userData));
          console.log(
            "✅ User profile updated successfully after token refresh"
          );

          // Refresh user data
          await getMe();
          return;
        } catch (refreshError) {
          console.error("❌ Token refresh failed:", refreshError);

          // If refresh fails, force logout
          console.log("🔑 Token refresh failed, forcing logout...");
          await logout();
          throw new Error("Your session has expired. Please login again.");
        }
      }

      throw error;
    }
  };

  const deleteAccount = async () => {
    await apiCall(() => apiService.deleteAccount());
    dispatch({ type: "RESET_STATE" });
  };

  // Property methods
  const getProperties = async (limit = 20, cursor = 1) => {
    try {
      const feed = await apiCall(() => apiService.getProperties(limit, cursor));
      dispatch({ type: "SET_PROPERTY_FEED", payload: feed });
      dispatch({ type: "SET_PROPERTIES", payload: feed.data });
    } catch (error: any) {
      console.error("Failed to fetch properties:", error);
      // Don't retry on network errors to prevent infinite loops
      if (error?.message === "Failed to fetch") {
        dispatch({
          type: "SET_ERROR",
          payload: "Network error. Please check your connection.",
        });
      }
    }
  };

  const getMyListings = async () => {
    // Check if we already have listings from user data
    if (state.myListings.length > 0) {
      console.log("📋 Using cached listings data");
      return;
    }

    const listings = await apiCall(() => apiService.getMyListings());
    dispatch({ type: "SET_MY_LISTINGS", payload: listings });
  };

  const listProperty = async (propertyData: PropertyBase) => {
    const property = await apiCall(() => apiService.listProperty(propertyData));
    dispatch({ type: "ADD_PROPERTY", payload: property });
  };

  const updateProperty = async (
    propertyId: number,
    propertyData: PropertyUpdate
  ) => {
    const property = await apiCall(() =>
      apiService.updateProperty(propertyId, propertyData)
    );
    dispatch({ type: "UPDATE_PROPERTY", payload: property });
  };

  const deleteProperty = async (propertyId: number) => {
    await apiCall(() => apiService.deleteProperty(propertyId));
    dispatch({ type: "DELETE_PROPERTY", payload: propertyId });
  };

  const getAgentProfile = async (agentId: number) => {
    return await apiCall(() => apiService.getAgentProfile(agentId));
  };

  const getPropertyById = async (propertyId: number) => {
    return await apiCall(() => apiService.getPropertyById(propertyId));
  };

  // Appointment methods
  const bookAppointment = async (appointmentData: AppointmentSchema) => {
    const appointment = await apiCall(() =>
      apiService.bookAppointment(appointmentData)
    );
    dispatch({ type: "ADD_APPOINTMENT", payload: appointment });
  };

  const cancelAppointment = async (appointmentId: number) => {
    await apiCall(() => apiService.cancelAppointment(appointmentId));
    dispatch({ type: "DELETE_APPOINTMENT", payload: appointmentId });
  };

  // Payment methods
  const createPaymentInfo = async (accountInfo: AccountInfoBase) => {
    const paymentInfo = await apiCall(() =>
      apiService.createPaymentInfo(accountInfo)
    );
    dispatch({ type: "ADD_PAYMENT_INFO", payload: paymentInfo });
  };

  const getPaymentInfo = async (userId?: number) => {
    // Check if we already have payment info from user data
    if (state.paymentInfo.length > 0) {
      console.log("💳 Using cached payment info data");
      return;
    }

    const paymentInfo = await apiCall(() => apiService.getPaymentInfo(userId));
    dispatch({ type: "SET_PAYMENT_INFO", payload: paymentInfo });
  };

  const updatePaymentInfo = async (
    accountInfoId: number,
    accountInfo: AccountInfoBase
  ) => {
    const paymentInfo = await apiCall(() =>
      apiService.updatePaymentInfo(accountInfoId, accountInfo)
    );
    dispatch({ type: "UPDATE_PAYMENT_INFO", payload: paymentInfo });
  };

  const deleteAccountInfo = async (accountInfoId: number) => {
    await apiCall(() => apiService.deleteAccountInfo(accountInfoId));
    dispatch({ type: "DELETE_PAYMENT_INFO", payload: accountInfoId });
  };

  // Schedule methods
  const createAvailableTime = async (availability: AgentAvailabilitySchema) => {
    const newAvailability = await apiCall(() =>
      apiService.createAvailableTime(availability)
    );
    dispatch({ type: "ADD_AVAILABILITY", payload: newAvailability });
  };

  const getSchedule = async () => {
    // Check if we already have schedule from user data
    if (state.schedule.length > 0) {
      console.log("📅 Using cached schedule data");
      return;
    }

    const schedule = await apiCall(() => apiService.getSchedule());
    dispatch({ type: "SET_SCHEDULE", payload: schedule });
  };

  const updateSchedule = async (
    scheduleId: number,
    availability: AgentAvailabilitySchema
  ) => {
    const updatedAvailability = await apiCall(() =>
      apiService.updateSchedule(scheduleId, availability)
    );
    dispatch({ type: "UPDATE_AVAILABILITY", payload: updatedAvailability });
  };

  // Contract methods
  const createContract = async (contractData: ContractCreate) => {
    return await apiCall(() => apiService.createContract(contractData));
  };

  const confirmPayment = async (contractId: number) => {
    await apiCall(() => apiService.confirmPayment(contractId));
  };

  const approvePayment = async (contractId: number) => {
    await apiCall(() => apiService.approvePayment(contractId));
  };

  // Chat methods
  const getChatHistory = async () => {
    const chatHistory = await apiCall(() => apiService.getChatHistory());
    dispatch({ type: "SET_CHAT_HISTORY", payload: chatHistory });
  };

  // Media methods
  const uploadFile = async (type: "profile" | "property", file: any) => {
    return await apiCall(() => apiService.uploadFile(type, file));
  };

  const getFiles = async (type: "profile" | "property") => {
    return await apiCall(() => apiService.getFiles(type));
  };

  // Utility methods
  const clearError = () => {
    dispatch({ type: "SET_ERROR", payload: null });
  };

  const contextValue: ApiContextType = {
    ...state,
    signup,
    login,
    logout,
    verifyAccount,
    resetPassword,
    sendOtp,
    verifyOtp,
    refreshToken,
    switchAccount,
    getMe,
    refreshUserData,
    isUserAuthenticated,
    updateMe,
    deleteAccount,
    getProperties,
    getMyListings,
    listProperty,
    updateProperty,
    deleteProperty,
    getAgentProfile,
    getPropertyById,
    bookAppointment,
    cancelAppointment,
    createPaymentInfo,
    getPaymentInfo,
    updatePaymentInfo,
    deleteAccountInfo,
    createAvailableTime,
    getSchedule,
    updateSchedule,
    createContract,
    confirmPayment,
    approvePayment,
    getChatHistory,
    uploadFile,
    getFiles,
    clearError,
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
}

// Custom hook to use the API context
export function useApi() {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
}
