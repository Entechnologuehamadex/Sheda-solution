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
  resetPassword: (password: string) => Promise<void>;
  sendOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string | number) => Promise<void>;
  refreshToken: () => Promise<void>;
  switchAccount: (accountType: "client" | "agent") => Promise<void>;

  // User methods
  getMe: () => Promise<void>;
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

          // Verify token is still valid by making a test API call
          const user = await apiService.getMe();
          console.log("✅ Token is valid, user data:", user);

          // If successful, set authentication state
          dispatch({ type: "SET_TOKEN", payload: token });
          dispatch({ type: "SET_USER", payload: user });
          dispatch({ type: "SET_AUTHENTICATED", payload: true });

          // Update stored user data with fresh data from API
          await AsyncStorage.setItem("user_data", JSON.stringify(user));
          console.log("💾 Updated stored user data");
        } catch (error) {
          // Token might be expired, clear everything
          console.log(
            "❌ Token expired or invalid, clearing auth data:",
            error
          );
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
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // User methods (defined first to avoid hoisting issues)
  const getMe = async () => {
    const user = await apiCall(() => apiService.getMe());
    dispatch({ type: "SET_USER", payload: user });

    // Save user data to AsyncStorage
    await AsyncStorage.setItem("user_data", JSON.stringify(user));
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
    await AsyncStorage.multiRemove(["auth_token", "user_data"]);
    console.log("🗑️ Cleared AsyncStorage data");

    await apiService.clearToken();
    console.log("🗑️ Cleared API service token");

    dispatch({ type: "RESET_STATE" });
    console.log("🔄 Reset application state");
    console.log("✅ Logout completed successfully");

    // The AuthGuard will automatically redirect to login page
    // since the user is no longer authenticated
  };

  const verifyAccount = async () => {
    const token = await apiCall(() => apiService.verifyAccount());
    await apiService.setToken(token.access_token);
    dispatch({ type: "SET_TOKEN", payload: token.access_token });
  };

  const resetPassword = async (password: string) => {
    console.log("🔐 Starting password reset...");

    const token = await apiCall(() => apiService.resetPassword(password));
    console.log("✅ Password reset successful, token received:", token);

    await apiService.setToken(token.access_token);
    console.log("🔑 Token set in API service");

    // Save token to AsyncStorage
    await AsyncStorage.setItem("auth_token", token.access_token);
    console.log("💾 Token saved to AsyncStorage");

    dispatch({ type: "SET_TOKEN", payload: token.access_token });

    // Get user data
    try {
      await getMe();
      console.log("✅ User data retrieved successfully");
    } catch (error) {
      console.error("❌ Failed to get user data after password reset:", error);
      // Don't fail the password reset if getMe fails
    }
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

    // Get user data
    try {
      await getMe();
      console.log("✅ User data retrieved successfully");
    } catch (error) {
      console.error(
        "❌ Failed to get user data after OTP verification:",
        error
      );
      // Don't fail the OTP verification if getMe fails
    }
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
    await apiCall(() => apiService.updateMe(userData));
    // Refresh user data
    await getMe();
  };

  const deleteAccount = async () => {
    await apiCall(() => apiService.deleteAccount());
    dispatch({ type: "RESET_STATE" });
  };

  // Property methods
  const getProperties = async (limit = 20, cursor = 1) => {
    const feed = await apiCall(() => apiService.getProperties(limit, cursor));
    dispatch({ type: "SET_PROPERTY_FEED", payload: feed });
    dispatch({ type: "SET_PROPERTIES", payload: feed.data });
  };

  const getMyListings = async () => {
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
