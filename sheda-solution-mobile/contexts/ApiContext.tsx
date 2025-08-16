import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
} from '../services/api';

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
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_INITIALIZING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TOKEN'; payload: string | null }
  | { type: 'SET_USER'; payload: UserShow | null }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'SET_PROPERTIES'; payload: PropertyShow[] }
  | { type: 'SET_MY_LISTINGS'; payload: PropertyShow[] }
  | { type: 'SET_APPOINTMENTS'; payload: AppointmentShow[] }
  | { type: 'SET_PAYMENT_INFO'; payload: AccountInfoShow[] }
  | { type: 'SET_SCHEDULE'; payload: AvailabilityShow[] }
  | { type: 'SET_CHAT_HISTORY'; payload: ChatMessageSchema[] }
  | { type: 'SET_PROPERTY_FEED'; payload: PropertyFeed }
  | { type: 'ADD_PROPERTY'; payload: PropertyShow }
  | { type: 'UPDATE_PROPERTY'; payload: PropertyShow }
  | { type: 'DELETE_PROPERTY'; payload: number }
  | { type: 'ADD_APPOINTMENT'; payload: AppointmentShow }
  | { type: 'UPDATE_APPOINTMENT'; payload: AppointmentShow }
  | { type: 'DELETE_APPOINTMENT'; payload: number }
  | { type: 'ADD_PAYMENT_INFO'; payload: AccountInfoShow }
  | { type: 'UPDATE_PAYMENT_INFO'; payload: AccountInfoShow }
  | { type: 'DELETE_PAYMENT_INFO'; payload: number }
  | { type: 'ADD_AVAILABILITY'; payload: AvailabilityShow }
  | { type: 'UPDATE_AVAILABILITY'; payload: AvailabilityShow }
  | { type: 'RESET_STATE' };

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
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_INITIALIZING':
      return { ...state, isInitializing: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'SET_PROPERTIES':
      return { ...state, properties: action.payload };
    case 'SET_MY_LISTINGS':
      return { ...state, myListings: action.payload };
    case 'SET_APPOINTMENTS':
      return { ...state, appointments: action.payload };
    case 'SET_PAYMENT_INFO':
      return { ...state, paymentInfo: action.payload };
    case 'SET_SCHEDULE':
      return { ...state, schedule: action.payload };
    case 'SET_CHAT_HISTORY':
      return { ...state, chatHistory: action.payload };
    case 'SET_PROPERTY_FEED':
      return { ...state, propertyFeed: action.payload };
    case 'ADD_PROPERTY':
      return { ...state, properties: [...state.properties, action.payload] };
    case 'UPDATE_PROPERTY':
      return {
        ...state,
        properties: state.properties.map(p => p.id === action.payload.id ? action.payload : p),
        myListings: state.myListings.map(p => p.id === action.payload.id ? action.payload : p),
      };
    case 'DELETE_PROPERTY':
      return {
        ...state,
        properties: state.properties.filter(p => p.id !== action.payload),
        myListings: state.myListings.filter(p => p.id !== action.payload),
      };
    case 'ADD_APPOINTMENT':
      return { ...state, appointments: [...state.appointments, action.payload] };
    case 'UPDATE_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.map(a => a.id === action.payload.id ? action.payload : a),
      };
    case 'DELETE_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.filter(a => a.id !== action.payload),
      };
    case 'ADD_PAYMENT_INFO':
      return { ...state, paymentInfo: [...state.paymentInfo, action.payload] };
    case 'UPDATE_PAYMENT_INFO':
      return {
        ...state,
        paymentInfo: state.paymentInfo.map(p => p.id === action.payload.id ? action.payload : p),
      };
    case 'DELETE_PAYMENT_INFO':
      return {
        ...state,
        paymentInfo: state.paymentInfo.filter(p => p.id !== action.payload),
      };
    case 'ADD_AVAILABILITY':
      return { ...state, schedule: [...state.schedule, action.payload] };
    case 'UPDATE_AVAILABILITY':
      return {
        ...state,
        schedule: state.schedule.map(a => a.id === action.payload.id ? action.payload : a),
      };
    case 'RESET_STATE':
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
  switchAccount: (accountType: 'client' | 'agent') => Promise<void>;
  
  // User methods
  getMe: () => Promise<void>;
  updateMe: (userData: UserUpdate) => Promise<void>;
  deleteAccount: () => Promise<void>;
  
  // Property methods
  getProperties: (limit?: number, cursor?: number) => Promise<void>;
  getMyListings: () => Promise<void>;
  listProperty: (propertyData: PropertyBase) => Promise<void>;
  updateProperty: (propertyId: number, propertyData: PropertyUpdate) => Promise<void>;
  deleteProperty: (propertyId: number) => Promise<void>;
  getAgentProfile: (agentId: number) => Promise<AgentFeed>;
  
  // Appointment methods
  bookAppointment: (appointmentData: AppointmentSchema) => Promise<void>;
  cancelAppointment: (appointmentId: number) => Promise<void>;
  
  // Payment methods
  createPaymentInfo: (accountInfo: AccountInfoBase) => Promise<void>;
  getPaymentInfo: (userId?: number) => Promise<void>;
  updatePaymentInfo: (accountInfoId: number, accountInfo: AccountInfoBase) => Promise<void>;
  deleteAccountInfo: (accountInfoId: number) => Promise<void>;
  
  // Schedule methods
  createAvailableTime: (availability: AgentAvailabilitySchema) => Promise<void>;
  getSchedule: () => Promise<void>;
  updateSchedule: (scheduleId: number, availability: AgentAvailabilitySchema) => Promise<void>;
  
  // Contract methods
  createContract: (contractData: ContractCreate) => Promise<ContractResponse>;
  confirmPayment: (contractId: number) => Promise<void>;
  approvePayment: (contractId: number) => Promise<void>;
  
  // Chat methods
  getChatHistory: () => Promise<void>;
  
  // Media methods
  uploadFile: (type: 'profile' | 'property', file: any) => Promise<FileShow>;
  getFiles: (type: 'profile' | 'property') => Promise<FileShow[]>;
  
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
      dispatch({ type: 'SET_INITIALIZING', payload: true });
      
      // Check for existing token
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        dispatch({ type: 'SET_TOKEN', payload: token });
        await apiService.setToken(token);
        
        // Try to get user data
        try {
          const user = await apiService.getMe();
          dispatch({ type: 'SET_USER', payload: user });
          dispatch({ type: 'SET_AUTHENTICATED', payload: true });
        } catch (error) {
          // Token might be expired, clear it
          await apiService.clearToken();
          dispatch({ type: 'SET_TOKEN', payload: null });
          dispatch({ type: 'SET_AUTHENTICATED', payload: false });
        }
      }
    } catch (error) {
      console.error('Failed to initialize app:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to initialize app' });
    } finally {
      dispatch({ type: 'SET_INITIALIZING', payload: false });
    }
  };

  // Wrapper for API calls with error handling
  const apiCall = async <T>(
    apiMethod: () => Promise<T>,
    successAction?: (data: T) => void
  ): Promise<T> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const result = await apiMethod();
      
      if (successAction) {
        successAction(result);
      }
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Authentication methods
  const signup = async (userData: UserCreate) => {
    await apiCall(() => apiService.signup(userData));
  };

  const login = async (username: string, password: string) => {
    const token = await apiCall(() => apiService.login(username, password));
    await apiService.setToken(token.access_token);
    dispatch({ type: 'SET_TOKEN', payload: token.access_token });
    dispatch({ type: 'SET_AUTHENTICATED', payload: true });
    
    // Get user data
    await getMe();
  };

  const logout = async () => {
    await apiCall(() => apiService.logout());
    dispatch({ type: 'RESET_STATE' });
  };

  const verifyAccount = async () => {
    const token = await apiCall(() => apiService.verifyAccount());
    await apiService.setToken(token.access_token);
    dispatch({ type: 'SET_TOKEN', payload: token.access_token });
    dispatch({ type: 'SET_AUTHENTICATED', payload: true });
  };

  const resetPassword = async (password: string) => {
    const token = await apiCall(() => apiService.resetPassword(password));
    await apiService.setToken(token.access_token);
    dispatch({ type: 'SET_TOKEN', payload: token.access_token });
  };

  const sendOtp = async (email: string) => {
    await apiCall(() => apiService.sendOtp(email));
  };

  const verifyOtp = async (email: string, otp: string | number) => {
    const token = await apiCall(() => apiService.verifyOtp(email, otp));
    await apiService.setToken(token.access_token);
    dispatch({ type: 'SET_TOKEN', payload: token.access_token });
  };

  const refreshToken = async () => {
    const token = await apiCall(() => apiService.refreshToken());
    await apiService.setToken(token.access_token);
    dispatch({ type: 'SET_TOKEN', payload: token.access_token });
  };

  const switchAccount = async (accountType: 'client' | 'agent') => {
    const token = await apiCall(() => apiService.switchAccount(accountType));
    await apiService.setToken(token.access_token);
    dispatch({ type: 'SET_TOKEN', payload: token.access_token });
    
    // Refresh user data
    await getMe();
  };

  // User methods
  const getMe = async () => {
    const user = await apiCall(() => apiService.getMe());
    dispatch({ type: 'SET_USER', payload: user });
  };

  const updateMe = async (userData: UserUpdate) => {
    await apiCall(() => apiService.updateMe(userData));
    // Refresh user data
    await getMe();
  };

  const deleteAccount = async () => {
    await apiCall(() => apiService.deleteAccount());
    dispatch({ type: 'RESET_STATE' });
  };

  // Property methods
  const getProperties = async (limit = 20, cursor = 1) => {
    const feed = await apiCall(() => apiService.getProperties(limit, cursor));
    dispatch({ type: 'SET_PROPERTY_FEED', payload: feed });
    dispatch({ type: 'SET_PROPERTIES', payload: feed.data });
  };

  const getMyListings = async () => {
    const listings = await apiCall(() => apiService.getMyListings());
    dispatch({ type: 'SET_MY_LISTINGS', payload: listings });
  };

  const listProperty = async (propertyData: PropertyBase) => {
    const property = await apiCall(() => apiService.listProperty(propertyData));
    dispatch({ type: 'ADD_PROPERTY', payload: property });
  };

  const updateProperty = async (propertyId: number, propertyData: PropertyUpdate) => {
    const property = await apiCall(() => apiService.updateProperty(propertyId, propertyData));
    dispatch({ type: 'UPDATE_PROPERTY', payload: property });
  };

  const deleteProperty = async (propertyId: number) => {
    await apiCall(() => apiService.deleteProperty(propertyId));
    dispatch({ type: 'DELETE_PROPERTY', payload: propertyId });
  };

  const getAgentProfile = async (agentId: number) => {
    return await apiCall(() => apiService.getAgentProfile(agentId));
  };

  // Appointment methods
  const bookAppointment = async (appointmentData: AppointmentSchema) => {
    const appointment = await apiCall(() => apiService.bookAppointment(appointmentData));
    dispatch({ type: 'ADD_APPOINTMENT', payload: appointment });
  };

  const cancelAppointment = async (appointmentId: number) => {
    await apiCall(() => apiService.cancelAppointment(appointmentId));
    dispatch({ type: 'DELETE_APPOINTMENT', payload: appointmentId });
  };

  // Payment methods
  const createPaymentInfo = async (accountInfo: AccountInfoBase) => {
    const paymentInfo = await apiCall(() => apiService.createPaymentInfo(accountInfo));
    dispatch({ type: 'ADD_PAYMENT_INFO', payload: paymentInfo });
  };

  const getPaymentInfo = async (userId?: number) => {
    const paymentInfo = await apiCall(() => apiService.getPaymentInfo(userId));
    dispatch({ type: 'SET_PAYMENT_INFO', payload: paymentInfo });
  };

  const updatePaymentInfo = async (accountInfoId: number, accountInfo: AccountInfoBase) => {
    const paymentInfo = await apiCall(() => apiService.updatePaymentInfo(accountInfoId, accountInfo));
    dispatch({ type: 'UPDATE_PAYMENT_INFO', payload: paymentInfo });
  };

  const deleteAccountInfo = async (accountInfoId: number) => {
    await apiCall(() => apiService.deleteAccountInfo(accountInfoId));
    dispatch({ type: 'DELETE_PAYMENT_INFO', payload: accountInfoId });
  };

  // Schedule methods
  const createAvailableTime = async (availability: AgentAvailabilitySchema) => {
    const newAvailability = await apiCall(() => apiService.createAvailableTime(availability));
    dispatch({ type: 'ADD_AVAILABILITY', payload: newAvailability });
  };

  const getSchedule = async () => {
    const schedule = await apiCall(() => apiService.getSchedule());
    dispatch({ type: 'SET_SCHEDULE', payload: schedule });
  };

  const updateSchedule = async (scheduleId: number, availability: AgentAvailabilitySchema) => {
    const updatedAvailability = await apiCall(() => apiService.updateSchedule(scheduleId, availability));
    dispatch({ type: 'UPDATE_AVAILABILITY', payload: updatedAvailability });
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
    dispatch({ type: 'SET_CHAT_HISTORY', payload: chatHistory });
  };

  // Media methods
  const uploadFile = async (type: 'profile' | 'property', file: any) => {
    return await apiCall(() => apiService.uploadFile(type, file));
  };

  const getFiles = async (type: 'profile' | 'property') => {
    return await apiCall(() => apiService.getFiles(type));
  };

  // Utility methods
  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
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
    <ApiContext.Provider value={contextValue}>
      {children}
    </ApiContext.Provider>
  );
}

// Custom hook to use the API context
export function useApi() {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
}
