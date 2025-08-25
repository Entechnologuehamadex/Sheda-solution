import AsyncStorage from "@react-native-async-storage/async-storage";

// Base API configuration
const API_BASE_URL = "https://sheda-backend-production.up.railway.app";
const LOCAL_API_URL = "http://localhost:8000";

// Types based on OpenAPI specification
export interface UserCreate {
  username?: string;
  email?: string;
  password: string;
}

export interface UserUpdate {
  profile_pic?: string;
  username?: string;
  email?: string;
  phone_number?: string;
  account_type: "client" | "agent"; // Required field according to API spec
  fullname?: string;
  location?: string;
  agency_name?: string;
  kyc_status?: "pending" | "verified" | "rejected";
  rating?: number;
}

export interface UserShow {
  profile_pic?: string;
  username?: string;
  email?: string;
  phone_number?: string;
  account_type?: "client" | "agent";
  fullname?: string;
  location?: string;
  agency_name?: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  verified: boolean;
  kyc_status: "pending" | "verified" | "rejected";
  listing?: PropertyShow[];
  appointments?: AppointmentShow[];
  account_info?: AccountInfoShow[];
  availabilities?: AvailabilityShow[];
}

export interface Token {
  access_token: string;
  token_type?: string;
}

export interface OtpSend {
  email: string;
}

export interface OtpSchema {
  email: string;
  otp: string | number;
}

export interface PasswordReset {
  password: string;
}

export interface SwitchAccountType {
  switch_to: "client" | "agent";
}

export interface PropertyBase {
  title: string;
  description: string;
  location: string;
  price: number;
  property_type: "apartment" | "land" | "shortlet" | "shared apartment";
  listing_type: "rent" | "sale";
  status: "sold" | "rented" | "available";
  furnished: boolean;
  is_active: boolean;
  bathroom: number;
  bedroom: number;
  air_condition: boolean;
  pop_ceiling: boolean;
  floor_tiles: boolean;
  running_water: boolean;
  furniture: boolean;
  prepaid_meter: boolean;
  wifi: boolean;
  is_negotiable: boolean;
  images: PropertyImage[];
}

export interface PropertyUpdate {
  title?: string;
  description?: string;
  location?: string;
  price?: number;
  property_type?: "apartment" | "land" | "shortlet" | "shared apartment";
  listing_type?: "rent" | "sale";
  status?: "sold" | "rented" | "available";
  furnished?: boolean;
  is_active?: boolean;
  bathroom?: number;
  bedroom?: number;
  air_condition?: boolean;
  pop_ceiling?: boolean;
  floor_tiles?: boolean;
  running_water?: boolean;
  furniture?: boolean;
  prepaid_meter?: boolean;
  wifi?: boolean;
  is_negotiable?: boolean;
  images?: PropertyImage[];
}

export interface PropertyShow extends PropertyBase {
  id: number;
  agent_id: number;
}

export interface PropertyImage {
  image_url: string;
  is_primary?: boolean;
}

export interface PropertyFeed {
  data: PropertyShow[];
  next_coursor?: number;
}

export interface AgentFeed {
  profile_pic?: string;
  username: string;
  email: string;
  phone_number: string;
  agency_name: string;
  location: string;
  kyc_status: "pending" | "verified" | "rejected";
  last_seen: string;
  rating: number;
  listing: PropertyShow[];
  availbilities: AvailabilityShow[];
}

export interface AppointmentSchema {
  agent_id: number;
  property_id: number;
  requested_time: string;
}

export interface AppointmentShow {
  id: number;
  client_id: number;
  agent_id: number;
  property_id: number;
  scheduled_at: string;
  status: "pending" | "confirmed" | "canceled";
  created_at: string;
  updated_at: string;
}

export interface AccountInfoBase {
  account_name?: string;
  bank_name?: string;
  acount_number?: string;
}

export interface AccountInfoShow extends AccountInfoBase {
  id: number;
  user_id: number;
}

export interface AgentAvailabilitySchema {
  weekday: string;
  start_time: string;
  end_time: string;
}

export interface AvailabilityShow extends AgentAvailabilitySchema {
  id: number;
  agent_id: number;
  is_booked: boolean;
}

export interface ContractCreate {
  property_id: number;
  amount: number;
  rental_period_months?: number;
  is_payment_made: boolean;
}

export interface ContractResponse {
  contract_id: number;
  property_id: number;
  contract_type: "rent" | "sale";
  amount: number;
  start_date: string;
  end_date?: string;
  is_active: boolean;
}

export interface ChatMessageSchema {
  sender_id: number;
  receiver_id: number;
  message: string;
  timestamp?: string;
  property_id?: number;
}

export interface FileShow {
  file_url: string;
}

export interface DeleteProperty {
  message: string;
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  detail: ValidationError[];
}

// API Service Class
class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  // Token management
  async setToken(token: string) {
    this.token = token;
    await AsyncStorage.setItem("auth_token", token);
  }

  async getToken(): Promise<string | null> {
    if (!this.token) {
      this.token = await AsyncStorage.getItem("auth_token");
    }
    return this.token;
  }

  async clearToken() {
    this.token = null;
    await AsyncStorage.removeItem("auth_token");
  }

  // Request helper
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await this.getToken();
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    console.log(`🌐 API Request: ${options.method || "GET"} ${url}`);
    console.log("📤 Request config:", config);

    try {
      const response = await fetch(url, config);

      console.log(
        `📥 Response status: ${response.status} ${response.statusText}`
      );
      console.log(
        "📥 Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("❌ API Error Response:", errorData);

        // Create a structured error object
        const error = new Error();
        (error as any).response = {
          status: response.status,
          data: errorData,
        };

        // Set error message
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            error.message = errorData.detail
              .map((err: any) => err.msg || err.message)
              .join(", ");
          } else {
            error.message = errorData.detail;
          }
        } else if (errorData.message) {
          error.message = errorData.message;
        } else {
          error.message = `HTTP ${response.status}`;
        }

        throw error;
      }

      const data = await response.json();
      console.log("✅ API Success Response:", data);
      return data;
    } catch (error) {
      console.error("❌ API Request failed:", error);
      throw error;
    }
  }

  // Test API connectivity
  async testConnection(): Promise<boolean> {
    try {
      console.log("🔍 Testing API connection...");
      const response = await fetch(`${this.baseURL}/api/v1/health`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(
        "🔍 Health check response:",
        response.status,
        response.statusText
      );
      return response.ok;
    } catch (error) {
      console.error("🔍 API connection test failed:", error);
      return false;
    }
  }

  // Auth endpoints
  async signup(userData: UserCreate): Promise<UserShow> {
    // For signup, we don't need Authorization header since user isn't authenticated yet
    const url = `${this.baseURL}/api/v1/auth/signup`;

    console.log(`🌐 Signup Request: POST ${url}`);
    console.log("📤 Signup data:", userData);

    const config: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    try {
      const response = await fetch(url, config);

      console.log(
        `📥 Signup Response status: ${response.status} ${response.statusText}`
      );
      console.log(
        "📥 Signup Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("❌ Signup Error Response:", errorData);

        // Create a structured error object
        const error = new Error();
        (error as any).response = {
          status: response.status,
          data: errorData,
        };

        // Set error message
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            error.message = errorData.detail
              .map((err: any) => err.msg || err.message)
              .join(", ");
          } else {
            error.message = errorData.detail;
          }
        } else if (errorData.message) {
          error.message = errorData.message;
        } else {
          error.message = `HTTP ${response.status}`;
        }

        throw error;
      }

      const data = await response.json();
      console.log("✅ Signup Success Response:", data);
      return data;
    } catch (error) {
      console.error("❌ Signup Request failed:", error);
      throw error;
    }
  }

  async verifyAccount(): Promise<Token> {
    return this.request<Token>("/api/v1/auth/verify-account", {
      method: "POST",
    });
  }

  async login(username: string, password: string): Promise<Token> {
    // For login, we don't need Authorization header since user isn't authenticated yet
    const url = `${this.baseURL}/api/v1/auth/login`;

    console.log(`🌐 Login Request: POST ${url}`);
    console.log("📤 Login data:", { username });

    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const config: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    };

    try {
      const response = await fetch(url, config);

      console.log(
        `📥 Login Response status: ${response.status} ${response.statusText}`
      );
      console.log(
        "📥 Login Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("❌ Login Error Response:", errorData);

        // Create a structured error object
        const error = new Error();
        (error as any).response = {
          status: response.status,
          data: errorData,
        };

        // Set error message
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            error.message = errorData.detail
              .map((err: any) => err.msg || err.message)
              .join(", ");
          } else {
            error.message = errorData.detail;
          }
        } else if (errorData.message) {
          error.message = errorData.message;
        } else {
          error.message = `HTTP ${response.status}`;
        }

        throw error;
      }

      const data = await response.json();
      console.log("✅ Login Success Response:", data);
      return data;
    } catch (error) {
      console.error("❌ Login Request failed:", error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    await this.request("/api/v1/auth/logout", {
      method: "POST",
    });
    await this.clearToken();
  }

  async resetPassword(
    password: string,
    otpCode: string,
    email?: string
  ): Promise<Token> {
    // According to API spec, only password is needed in body
    const requestBody = { password };

    // For password reset, we need to use OTP token in Authorization header
    const url = `${this.baseURL}/api/v1/auth/reset-password`;

    console.log(`🌐 Reset Password Request: PUT ${url}`);
    console.log("📤 Reset Password data:", requestBody);
    console.log("🔑 Using OTP token:", otpCode);

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${otpCode}`, // OTP token as Bearer token
      },
      body: JSON.stringify(requestBody),
    });

    console.log(
      `📥 Response status: ${response.status} ${response.statusText}`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ Reset Password Error Response:", errorData);

      const error = new Error();
      (error as any).response = {
        status: response.status,
        data: errorData,
      };

      if (errorData.detail) {
        if (Array.isArray(errorData.detail)) {
          error.message = errorData.detail
            .map((err: any) => err.msg || err.message)
            .join(", ");
        } else {
          error.message = errorData.detail;
        }
      } else if (errorData.message) {
        error.message = errorData.message;
      } else {
        error.message = `HTTP ${response.status}`;
      }

      throw error;
    }

    const data = await response.json();
    console.log("✅ Reset Password Success Response:", data);
    return data;
  }

  async sendOtp(email: string): Promise<void> {
    return this.request("/api/v1/auth/send-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async verifyOtp(email: string, otp: string | number): Promise<Token> {
    return this.request<Token>("/api/v1/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });
  }

  async refreshToken(): Promise<Token> {
    return this.request<Token>("/api/v1/auth/refresh-token", {
      method: "PUT",
    });
  }

  async switchAccount(accountType: "client" | "agent"): Promise<Token> {
    return this.request<Token>("/api/v1/auth/switch-account", {
      method: "POST",
      body: JSON.stringify({ switch_to: accountType }),
    });
  }

  // User endpoints
  async getMe(): Promise<UserShow> {
    return this.request<UserShow>("/api/v1/user/me");
  }

  async updateMe(userData: UserUpdate): Promise<UserUpdate> {
    return this.request<UserUpdate>("/api/v1/user/update/me", {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  }

  async deleteAccount(): Promise<void> {
    return this.request("/api/v1/user/delete-accnt", {
      method: "DELETE",
    });
  }

  async bookAppointment(
    appointmentData: AppointmentSchema
  ): Promise<AppointmentShow> {
    return this.request<AppointmentShow>("/api/v1/user/book-appointment", {
      method: "POST",
      body: JSON.stringify(appointmentData),
    });
  }

  async cancelAppointment(appointmentId: number): Promise<void> {
    return this.request(`/api/v1/user/cancel-appointment/${appointmentId}`, {
      method: "DELETE",
    });
  }

  async createPaymentInfo(
    accountInfo: AccountInfoBase
  ): Promise<AccountInfoShow> {
    return this.request<AccountInfoShow>("/api/v1/user/create-payment-info", {
      method: "POST",
      body: JSON.stringify(accountInfo),
    });
  }

  async getPaymentInfo(userId?: number): Promise<AccountInfoShow[]> {
    const params = userId ? `?user_id=${userId}` : "";
    return this.request<AccountInfoShow[]>(
      `/api/v1/user/payment-info${params}`
    );
  }

  async updatePaymentInfo(
    accountInfoId: number,
    accountInfo: AccountInfoBase
  ): Promise<AccountInfoShow> {
    return this.request<AccountInfoShow>(
      `/api/v1/user/update-account-info/${accountInfoId}`,
      {
        method: "PUT",
        body: JSON.stringify(accountInfo),
      }
    );
  }

  async deleteAccountInfo(accountInfoId: number): Promise<void> {
    return this.request(`/api/v1/user/delete-accnt-info/${accountInfoId}`, {
      method: "DELETE",
    });
  }

  async getPaymentInfoByContract(contractId: number): Promise<AccountInfoBase> {
    return this.request<AccountInfoBase>(
      `/api/v1/user/payment-info/${contractId}`
    );
  }

  async createAvailableTime(
    availability: AgentAvailabilitySchema
  ): Promise<AvailabilityShow> {
    return this.request<AvailabilityShow>(
      "/api/v1/user/create-available-time",
      {
        method: "POST",
        body: JSON.stringify(availability),
      }
    );
  }

  async getSchedule(): Promise<AvailabilityShow[]> {
    return this.request<AvailabilityShow[]>("/api/v1/user/get-schedule/me");
  }

  async updateSchedule(
    scheduleId: number,
    availability: AgentAvailabilitySchema
  ): Promise<AvailabilityShow> {
    return this.request<AvailabilityShow>(
      `/api/v1/user/update-schedule/${scheduleId}`,
      {
        method: "PUT",
        body: JSON.stringify(availability),
      }
    );
  }

  async confirmPayment(contractId: number): Promise<void> {
    return this.request(`/api/v1/user/confirm-payment/${contractId}`, {
      method: "POST",
    });
  }

  async approvePayment(contractId: number): Promise<void> {
    return this.request(`/api/v1/user/approve-payment/${contractId}`, {
      method: "POST",
    });
  }

  async createContract(
    contractData: ContractCreate
  ): Promise<ContractResponse> {
    return this.request<ContractResponse>("/api/v1/user/contracts/", {
      method: "POST",
      body: JSON.stringify(contractData),
    });
  }

  // Property endpoints
  async listProperty(propertyData: PropertyBase): Promise<PropertyShow> {
    return this.request<PropertyShow>("/api/v1/property/list-property", {
      method: "POST",
      body: JSON.stringify(propertyData),
    });
  }

  async getMyListings(): Promise<PropertyShow[]> {
    return this.request<PropertyShow[]>("/api/v1/property/me");
  }

  async updateProperty(
    propertyId: number,
    propertyData: PropertyUpdate
  ): Promise<PropertyShow> {
    return this.request<PropertyShow>(`/api/v1/property/update/${propertyId}`, {
      method: "PUT",
      body: JSON.stringify(propertyData),
    });
  }

  async getProperties(
    limit: number = 20,
    cursor: number = 1
  ): Promise<PropertyFeed> {
    return this.request<PropertyFeed>(
      `/api/v1/property/get-properties?limit=${limit}&cursor=${cursor}`
    );
  }

  async getAgentProfile(agentId: number): Promise<AgentFeed> {
    return this.request<AgentFeed>(`/api/v1/property/agent-profile/${agentId}`);
  }

  async getPropertyById(propertyId: number): Promise<PropertyShow> {
    return this.request<PropertyShow>(`/api/v1/property/${propertyId}`);
  }

  async deleteProperty(propertyId: number): Promise<DeleteProperty> {
    return this.request<DeleteProperty>(
      `/api/v1/property/delete/${propertyId}`,
      {
        method: "DELETE",
      }
    );
  }

  // Chat endpoints
  async getChatHistory(): Promise<ChatMessageSchema[]> {
    return this.request<ChatMessageSchema[]>("/api/v1/chat/chat-history");
  }

  // Media endpoints
  async uploadFile(type: "profile" | "property", file: any): Promise<FileShow> {
    const formData = new FormData();
    formData.append("file", file);

    return this.request<FileShow>(`/api/v1/media/file-upload/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  }

  async getFiles(type: "profile" | "property"): Promise<FileShow[]> {
    return this.request<FileShow[]>(`/api/v1/media/file-upload/${type}`);
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
