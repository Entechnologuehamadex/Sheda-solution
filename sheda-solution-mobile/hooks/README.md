# Sheda Solutions API Hooks & Context

This directory contains a comprehensive API management system for the Sheda Solutions mobile app, including a React Context for state management and custom hooks for easy API integration.

## 📁 File Structure

```
hooks/
├── useShedaApi.ts          # Main custom hooks for API operations
├── useNearWallet.ts        # Existing NEAR wallet integration
└── README.md              # This documentation

contexts/
└── ApiContext.tsx         # React Context for API state management

services/
├── api.ts                 # API service with all endpoints
├── nearWallet.ts          # Existing NEAR wallet service
└── secureStorage.ts       # Secure storage utilities
```

## 🚀 Quick Start

### 1. Setup the API Provider

Wrap your app with the `ApiProvider`:

```tsx
import { ApiProvider } from "./contexts/ApiContext";

export default function App() {
  return <ApiProvider>{/* Your app components */}</ApiProvider>;
}
```

### 2. Use the Hooks

```tsx
import { useAuth, useProperties } from "./hooks/useShedaApi";

function LoginScreen() {
  const { login, isLoading, error } = useAuth();

  const handleLogin = async () => {
    try {
      await login("username", "password");
      // Navigate to main app
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return <View>{/* Your login form */}</View>;
}
```

## 📚 Available Hooks

### 🔐 Authentication (`useAuth`)

Handles all authentication-related operations.

```tsx
const {
  isAuthenticated,
  user,
  isLoading,
  error,
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
  clearError,
} = useAuth();
```

**Example Usage:**

```tsx
function ProfileScreen() {
  const { user, updateMe, isLoading } = useAuth();

  const handleUpdateProfile = async (userData) => {
    await updateMe(userData);
    // Profile updated successfully
  };

  return (
    <View>
      <Text>Welcome, {user?.fullname}</Text>
      {/* Profile form */}
    </View>
  );
}
```

### 🏠 Properties (`useProperties`)

Manages property listings and operations.

```tsx
const {
  properties,
  myListings,
  propertyFeed,
  isLoading,
  error,
  getProperties,
  getMyListings,
  listProperty,
  updateProperty,
  deleteProperty,
  getAgentProfile,
  clearError,
} = useProperties();
```

**Example Usage:**

```tsx
function PropertyListScreen() {
  const { properties, getProperties, isLoading } = useProperties();

  useEffect(() => {
    getProperties(20, 1); // Load first 20 properties
  }, []);

  return (
    <FlatList
      data={properties}
      renderItem={({ item }) => <PropertyCard property={item} />}
      onEndReached={() => getProperties(20, properties.length + 1)}
    />
  );
}
```

### 📅 Appointments (`useAppointments`)

Handles appointment booking and management.

```tsx
const {
  appointments,
  isLoading,
  error,
  bookAppointment,
  cancelAppointment,
  clearError,
} = useAppointments();
```

**Example Usage:**

```tsx
function AppointmentScreen() {
  const { bookAppointment, isLoading } = useAppointments();

  const handleBookAppointment = async (appointmentData) => {
    await bookAppointment({
      agent_id: 1,
      property_id: 123,
      requested_time: new Date().toISOString(),
    });
  };
}
```

### 💳 Payment (`usePayment`)

Manages payment information and account details.

```tsx
const {
  paymentInfo,
  isLoading,
  error,
  createPaymentInfo,
  getPaymentInfo,
  updatePaymentInfo,
  deleteAccountInfo,
  clearError,
} = usePayment();
```

### 📋 Schedule (`useSchedule`)

Handles agent availability and scheduling.

```tsx
const {
  schedule,
  isLoading,
  error,
  createAvailableTime,
  getSchedule,
  updateSchedule,
  clearError,
} = useSchedule();
```

### 📄 Contracts (`useContracts`)

Manages property contracts and payments.

```tsx
const {
  isLoading,
  error,
  createContract,
  confirmPayment,
  approvePayment,
  clearError,
} = useContracts();
```

### 📱 Media (`useMedia`)

Handles file uploads and media management.

```tsx
const { isLoading, error, uploadFile, getFiles, clearError } = useMedia();
```

### 💬 Chat (`useChat`)

Manages chat history and messaging.

```tsx
const { chatHistory, isLoading, error, getChatHistory, clearError } = useChat();
```

## 🔧 Advanced Hooks

### Optimistic Updates (`useOptimisticUpdate`)

Provides optimistic updates for better UX.

```tsx
const { data, setData, isLoading, error, optimisticUpdate, optimisticDelete } =
  useOptimisticUpdate(initialData, updateFunction, deleteFunction);
```

### Pagination (`usePagination`)

Handles paginated data loading.

```tsx
const {
  data,
  isLoading,
  isLoadingMore,
  error,
  hasMore,
  loadInitial,
  loadMore,
  refresh,
} = usePagination(fetchFunction, 20);
```

### Real-time Polling (`usePolling`)

Automatically polls for data updates.

```tsx
const { data, isLoading, error, fetchData, stopPolling, startPolling } =
  usePolling(fetchFunction, 30000, true);
```

### Form Submission (`useFormSubmit`)

Handles form submission with validation.

```tsx
const { isSubmitting, error, submit, clearError } = useFormSubmit(
  submitFunction,
  onSuccess,
  onError
);
```

### Search (`useSearch`)

Provides debounced search functionality.

```tsx
const { query, results, isSearching, error, handleSearch, setQuery } =
  useSearch(searchFunction, 500);
```

### File Upload (`useFileUpload`)

Handles file uploads with progress tracking.

```tsx
const { isUploading, progress, error, uploadedFile, upload, reset } =
  useFileUpload(uploadFunction, onProgress);
```

## 🎯 Best Practices

### 1. Error Handling

Always handle errors in your components:

```tsx
function MyComponent() {
  const { login, error, clearError } = useAuth();

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
      clearError();
    }
  }, [error]);
}
```

### 2. Loading States

Show loading indicators during API calls:

```tsx
function PropertyScreen() {
  const { properties, isLoading } = useProperties();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <PropertyList properties={properties} />;
}
```

### 3. Authentication Checks

Check authentication status before making API calls:

```tsx
function ProtectedScreen() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return <UserDashboard user={user} />;
}
```

### 4. Optimistic Updates

Use optimistic updates for better UX:

```tsx
function PropertyCard({ property }) {
  const { optimisticUpdate } = useOptimisticUpdate(
    [property],
    updateProperty,
    deleteProperty
  );

  const handleLike = () => {
    optimisticUpdate(property.id, { isLiked: !property.isLiked });
  };
}
```

## 🔄 State Management

The API context manages the following state:

- **Authentication**: `isAuthenticated`, `token`, `user`
- **Loading States**: `isLoading`, `isInitializing`
- **Data**: `properties`, `myListings`, `appointments`, `paymentInfo`, `schedule`, `chatHistory`
- **Pagination**: `propertyFeed`
- **Error Handling**: `error`

## 🛠️ Configuration

### Environment Variables

Set up your API endpoints in `services/api.ts`:

```typescript
const API_BASE_URL = "https://sheda-backend-production.up.railway.app";
const LOCAL_API_URL = "http://localhost:8000";
```

### Token Management

The API service automatically handles token storage and retrieval using AsyncStorage.

## 📝 TypeScript Support

All hooks are fully typed with TypeScript interfaces for:

- API request/response types
- Hook return types
- Error handling
- Loading states

## 🧪 Testing

Example test for a hook:

```tsx
import { renderHook, act } from "@testing-library/react-hooks";
import { useAuth } from "./useShedaApi";

test("useAuth should handle login", async () => {
  const { result } = renderHook(() => useAuth());

  await act(async () => {
    await result.current.login("test@example.com", "password");
  });

  expect(result.current.isAuthenticated).toBe(true);
});
```

## 🚨 Error Codes

Common error scenarios and handling:

- **401 Unauthorized**: Token expired or invalid
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource doesn't exist
- **422 Validation Error**: Invalid request data
- **500 Server Error**: Backend error

## 📞 Support

For issues or questions about the API hooks:

1. Check the error messages in the console
2. Verify your API endpoints are correct
3. Ensure you're using the latest version
4. Check the OpenAPI specification for endpoint details

## 🔄 Migration Guide

If you're migrating from a different API solution:

1. Replace direct API calls with hook usage
2. Update your components to use the new state management
3. Remove manual token handling (now handled automatically)
4. Update error handling to use the new error system

## 📈 Performance Tips

1. **Use pagination** for large datasets
2. **Implement caching** for frequently accessed data
3. **Use optimistic updates** for better UX
4. **Debounce search** operations
5. **Poll only when necessary** for real-time updates
