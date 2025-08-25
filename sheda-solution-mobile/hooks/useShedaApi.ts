import { useState, useCallback, useEffect, useRef } from "react";
import { useApi } from "../contexts/ApiContext";
import {
  UserCreate,
  UserUpdate,
  PropertyBase,
  PropertyUpdate,
  AppointmentSchema,
  AccountInfoBase,
  AgentAvailabilitySchema,
  ContractCreate,
  PropertyShow,
  AppointmentShow,
  AccountInfoShow,
  AvailabilityShow,
  ContractResponse,
  AgentFeed,
  FileShow,
  Token,
} from "../services/api";

// Hook return types
interface UseAuthReturn {
  isAuthenticated: boolean;
  user: any;
  isLoading: boolean;
  isInitializing: boolean;
  error: string | null;
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
  getMe: () => Promise<void>;
  refreshUserData: () => Promise<void>;
  isUserAuthenticated: () => Promise<boolean>;
  updateMe: (userData: UserUpdate) => Promise<void>;
  deleteAccount: () => Promise<void>;
  clearError: () => void;
}

interface UsePropertiesReturn {
  properties: PropertyShow[];
  myListings: PropertyShow[];
  propertyFeed: any;
  isLoading: boolean;
  error: string | null;
  getProperties: (limit?: number, cursor?: number) => Promise<void>;
  getMyListings: () => Promise<void>;
  listProperty: (propertyData: PropertyBase) => Promise<void>;
  updateProperty: (
    propertyId: number,
    propertyData: PropertyUpdate
  ) => Promise<void>;
  deleteProperty: (propertyId: number) => Promise<void>;
  getAgentProfile: (agentId: number) => Promise<AgentFeed>;
  clearError: () => void;
}

interface UseAppointmentsReturn {
  appointments: AppointmentShow[];
  isLoading: boolean;
  error: string | null;
  bookAppointment: (appointmentData: AppointmentSchema) => Promise<void>;
  cancelAppointment: (appointmentId: number) => Promise<void>;
  clearError: () => void;
}

interface UsePaymentReturn {
  paymentInfo: AccountInfoShow[];
  isLoading: boolean;
  error: string | null;
  createPaymentInfo: (accountInfo: AccountInfoBase) => Promise<void>;
  getPaymentInfo: (userId?: number) => Promise<void>;
  updatePaymentInfo: (
    accountInfoId: number,
    accountInfo: AccountInfoBase
  ) => Promise<void>;
  deleteAccountInfo: (accountInfoId: number) => Promise<void>;
  clearError: () => void;
}

interface UseScheduleReturn {
  schedule: AvailabilityShow[];
  isLoading: boolean;
  error: string | null;
  createAvailableTime: (availability: AgentAvailabilitySchema) => Promise<void>;
  getSchedule: () => Promise<void>;
  updateSchedule: (
    scheduleId: number,
    availability: AgentAvailabilitySchema
  ) => Promise<void>;
  clearError: () => void;
}

interface UseContractsReturn {
  isLoading: boolean;
  error: string | null;
  createContract: (contractData: ContractCreate) => Promise<ContractResponse>;
  confirmPayment: (contractId: number) => Promise<void>;
  approvePayment: (contractId: number) => Promise<void>;
  clearError: () => void;
}

interface UseMediaReturn {
  isLoading: boolean;
  error: string | null;
  uploadFile: (type: "profile" | "property", file: any) => Promise<FileShow>;
  getFiles: (type: "profile" | "property") => Promise<FileShow[]>;
  clearError: () => void;
}

interface UseChatReturn {
  chatHistory: any[];
  isLoading: boolean;
  error: string | null;
  getChatHistory: () => Promise<void>;
  clearError: () => void;
}

// Authentication hook
export function useAuth(): UseAuthReturn {
  const api = useApi();

  return {
    isAuthenticated: api.isAuthenticated,
    user: api.user,
    isLoading: api.isLoading,
    isInitializing: api.isInitializing,
    error: api.error,
    signup: api.signup,
    login: api.login,
    logout: api.logout,
    verifyAccount: api.verifyAccount,
    resetPassword: api.resetPassword,
    sendOtp: api.sendOtp,
    verifyOtp: api.verifyOtp,
    refreshToken: api.refreshToken,
    switchAccount: api.switchAccount,
    getMe: api.getMe,
    refreshUserData: api.refreshUserData,
    isUserAuthenticated: api.isUserAuthenticated,
    updateMe: api.updateMe,
    deleteAccount: api.deleteAccount,
    clearError: api.clearError,
  };
}

// Properties hook
export function useProperties(): UsePropertiesReturn {
  const api = useApi();

  return {
    properties: api.properties,
    myListings: api.myListings,
    propertyFeed: api.propertyFeed,
    isLoading: api.isLoading,
    error: api.error,
    getProperties: api.getProperties,
    getMyListings: api.getMyListings,
    listProperty: api.listProperty,
    updateProperty: api.updateProperty,
    deleteProperty: api.deleteProperty,
    getAgentProfile: api.getAgentProfile,
    clearError: api.clearError,
  };
}

// Appointments hook
export function useAppointments(): UseAppointmentsReturn {
  const api = useApi();

  return {
    appointments: api.appointments,
    isLoading: api.isLoading,
    error: api.error,
    bookAppointment: api.bookAppointment,
    cancelAppointment: api.cancelAppointment,
    clearError: api.clearError,
  };
}

// Payment hook
export function usePayment(): UsePaymentReturn {
  const api = useApi();

  return {
    paymentInfo: api.paymentInfo,
    isLoading: api.isLoading,
    error: api.error,
    createPaymentInfo: api.createPaymentInfo,
    getPaymentInfo: api.getPaymentInfo,
    updatePaymentInfo: api.updatePaymentInfo,
    deleteAccountInfo: api.deleteAccountInfo,
    clearError: api.clearError,
  };
}

// Schedule hook
export function useSchedule(): UseScheduleReturn {
  const api = useApi();

  return {
    schedule: api.schedule,
    isLoading: api.isLoading,
    error: api.error,
    createAvailableTime: api.createAvailableTime,
    getSchedule: api.getSchedule,
    updateSchedule: api.updateSchedule,
    clearError: api.clearError,
  };
}

// Contracts hook
export function useContracts(): UseContractsReturn {
  const api = useApi();

  return {
    isLoading: api.isLoading,
    error: api.error,
    createContract: api.createContract,
    confirmPayment: api.confirmPayment,
    approvePayment: api.approvePayment,
    clearError: api.clearError,
  };
}

// Media hook
export function useMedia(): UseMediaReturn {
  const api = useApi();

  return {
    isLoading: api.isLoading,
    error: api.error,
    uploadFile: api.uploadFile,
    getFiles: api.getFiles,
    clearError: api.clearError,
  };
}

// Chat hook
export function useChat(): UseChatReturn {
  const api = useApi();

  return {
    chatHistory: api.chatHistory,
    isLoading: api.isLoading,
    error: api.error,
    getChatHistory: api.getChatHistory,
    clearError: api.clearError,
  };
}

// Advanced hooks with additional features

// Hook for optimistic updates
export function useOptimisticUpdate<T>(
  initialData: T[],
  updateFn: (id: number, data: Partial<T>) => Promise<void>,
  deleteFn: (id: number) => Promise<void>
) {
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const optimisticUpdate = useCallback(
    async (id: number, updates: Partial<T>) => {
      setIsLoading(true);
      setError(null);

      // Optimistic update
      setData((prev) =>
        prev.map((item) =>
          (item as any).id === id ? { ...item, ...updates } : item
        )
      );

      try {
        await updateFn(id, updates);
      } catch (err) {
        // Revert on error
        setData(initialData);
        setError(err instanceof Error ? err.message : "Update failed");
      } finally {
        setIsLoading(false);
      }
    },
    [initialData, updateFn]
  );

  const optimisticDelete = useCallback(
    async (id: number) => {
      setIsLoading(true);
      setError(null);

      // Optimistic delete
      const originalData = [...data];
      setData((prev) => prev.filter((item) => (item as any).id !== id));

      try {
        await deleteFn(id);
      } catch (err) {
        // Revert on error
        setData(originalData);
        setError(err instanceof Error ? err.message : "Delete failed");
      } finally {
        setIsLoading(false);
      }
    },
    [data, deleteFn]
  );

  return {
    data,
    setData,
    isLoading,
    error,
    optimisticUpdate,
    optimisticDelete,
  };
}

// Hook for pagination
export function usePagination<T>(
  fetchFn: (
    limit: number,
    cursor: number
  ) => Promise<{ data: T[]; next_cursor?: number }>,
  initialLimit: number = 20
) {
  const [data, setData] = useState<T[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const loadInitial = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchFn(initialLimit, 1);
      setData(result.data);
      setNextCursor(result.next_cursor || null);
      setHasMore(!!result.next_cursor);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, initialLimit, isLoading]);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore || !nextCursor) return;

    setIsLoadingMore(true);
    setError(null);

    try {
      const result = await fetchFn(initialLimit, nextCursor);
      setData((prev) => [...prev, ...result.data]);
      setNextCursor(result.next_cursor || null);
      setHasMore(!!result.next_cursor);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load more data");
    } finally {
      setIsLoadingMore(false);
    }
  }, [fetchFn, initialLimit, isLoadingMore, hasMore, nextCursor]);

  const refresh = useCallback(async () => {
    setData([]);
    setNextCursor(1);
    setHasMore(true);
    await loadInitial();
  }, [loadInitial]);

  return {
    data,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadInitial,
    loadMore,
    refresh,
  };
}

// Hook for real-time data with polling
export function usePolling<T>(
  fetchFn: () => Promise<T>,
  interval: number = 30000, // 30 seconds
  enabled: boolean = true
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, isLoading]);

  useEffect(() => {
    if (!enabled) return;

    // Initial fetch
    fetchData();

    // Set up polling
    intervalRef.current = setInterval(fetchData, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchData, interval, enabled]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startPolling = useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(fetchData, interval);
    }
  }, [fetchData, interval]);

  return {
    data,
    isLoading,
    error,
    fetchData,
    stopPolling,
    startPolling,
  };
}

// Hook for form submission with validation
export function useFormSubmit<T>(
  submitFn: (data: T) => Promise<void>,
  onSuccess?: () => void,
  onError?: (error: string) => void
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (data: T) => {
      setIsSubmitting(true);
      setError(null);

      try {
        await submitFn(data);
        onSuccess?.();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Submission failed";
        setError(errorMessage);
        onError?.(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
    [submitFn, onSuccess, onError]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isSubmitting,
    error,
    submit,
    clearError,
  };
}

// Hook for search with debouncing
export function useSearch<T>(
  searchFn: (query: string) => Promise<T[]>,
  debounceMs: number = 500
) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<T[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const performSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setIsSearching(true);
      setError(null);

      try {
        const searchResults = await searchFn(searchQuery);
        setResults(searchResults);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Search failed");
      } finally {
        setIsSearching(false);
      }
    },
    [searchFn]
  );

  const handleSearch = useCallback(
    (searchQuery: string) => {
      setQuery(searchQuery);

      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout for debounced search
      timeoutRef.current = setTimeout(() => {
        performSearch(searchQuery);
      }, debounceMs);
    },
    [performSearch, debounceMs]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    query,
    results,
    isSearching,
    error,
    handleSearch,
    setQuery,
  };
}

// Hook for file upload with progress
export function useFileUpload(
  uploadFn: (file: any) => Promise<FileShow>,
  onProgress?: (progress: number) => void
) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<FileShow | null>(null);

  const upload = useCallback(
    async (file: any) => {
      setIsUploading(true);
      setProgress(0);
      setError(null);
      setUploadedFile(null);

      try {
        const result = await uploadFn(file);
        setUploadedFile(result);
        setProgress(100);
        onProgress?.(100);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setIsUploading(false);
      }
    },
    [uploadFn, onProgress]
  );

  const reset = useCallback(() => {
    setIsUploading(false);
    setProgress(0);
    setError(null);
    setUploadedFile(null);
  }, []);

  return {
    isUploading,
    progress,
    error,
    uploadedFile,
    upload,
    reset,
  };
}
