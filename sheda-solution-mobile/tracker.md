# Sheda Mobile Solution - API Integration Tracking Guide

## �� Table of Contents

1. [Project Overview](#project-overview)
2. [Authentication System](#authentication-system)
3. [User Management](#user-management)
4. [Property Management](#property-management)
5. [Appointment System](#appointment-system)
6. [Payment & Financial](#payment--financial)
7. [Schedule Management](#schedule-management)
8. [Contract Management](#contract-management)
9. [Chat System](#chat-system)
10. [Media & File Management](#media--file-management)
11. [NEAR Wallet Integration](#near-wallet-integration)
12. [Testing Strategy](#testing-strategy)
13. [Error Handling](#error-handling)
14. [State Management](#state-management)
15. [Security Considerations](#security-considerations)

---

## 🏗️ Project Overview

### 📊 Current Implementation Status

| System                     | Status                       | Progress |
| -------------------------- | ---------------------------- | -------- |
| 🔐 Authentication          | ✅ **FULLY IMPLEMENTED**     | 100%     |
| 👤 User Management         | ✅ **INTEGRATED**            | 90%      |
| 🏠 Property Management     | ✅ **INTEGRATED**            | 85%      |
| 📅 Appointment System      | ✅ **INTEGRATED**            | 80%      |
| 💰 Payment & Financial     | ✅ **INTEGRATED**            | 85%      |
| 📋 Schedule Management     | ✅ **INTEGRATED**            | 60%      |
| 📄 Contract Management     | ✅ **INTEGRATED**            | 70%      |
| 💬 Chat System             | ✅ **INTEGRATED**            | 70%      |
| 📁 Media & File Management | ✅ **INTEGRATED**            | 70%      |
| 🔗 NEAR Wallet Integration | 🔄 **PARTIALLY IMPLEMENTED** | 80%      |

**Legend:**

- ✅ **FULLY IMPLEMENTED**: Complete with UI integration
- 🔄 **PARTIALLY IMPLEMENTED**: Core features working, some UI pending
- 🔄 **API READY - UI PENDING**: Backend methods ready, frontend integration needed

### Tech Stack

- **Framework**: React Native with Expo Router
- **Language**: TypeScript
- **State Management**: React Context + useReducer
- **Styling**: NativeWind (Tailwind CSS)
- **Storage**: AsyncStorage + React Native Keychain
- **Blockchain**: NEAR Protocol Integration
- **API Base URL**: `https://sheda-backend-production.up.railway.app`

### Core Architecture

- **Context Layer**: `ApiContext.tsx` - Central state management
- **Service Layer**: `api.ts` - API service class
- **Hook Layer**: `useShedaApi.ts` - Custom hooks for different features
- **Component Layer**: React components using hooks

### 🚨 **CRITICAL INTEGRATION RULE**

**DO NOT EDIT THE UI DESIGN - ONLY ADD API INTEGRATION**

- ✅ **ALLOWED**: Connect API calls to existing UI elements
- ✅ **ALLOWED**: Add loading states, error handling
- ✅ **ALLOWED**: Update data display with API responses
- ❌ **FORBIDDEN**: Change UI layout, styling, or design
- ❌ **FORBIDDEN**: Add new UI components
- ❌ **FORBIDDEN**: Modify existing component structure

**Goal**: Make existing UI functional with real API data

---

## 🔐 Authentication System

### ✅ Implemented Features

- [x] User Registration (Signup)
- [x] User Login (Email/Password)
- [x] Account Verification
- [x] Password Reset
- [x] OTP Verification
- [x] Token Refresh
- [x] Account Type Switching (Client/Agent)
- [x] Logout
- [x] Auto-login with stored tokens
- [x] Token expiration handling

### 📁 Files

- `contexts/ApiContext.tsx` (lines 416-500)
- `services/api.ts` (lines 200-350)
- `hooks/useShedaApi.ts` (lines 1-50)
- `components/AuthGuard.tsx`
- `components/InitialRouter.tsx`

### 🔗 API Endpoints

```typescript
POST /api/v1/auth/signup
POST /api/v1/auth/login
POST /api/v1/auth/verify-account
PUT /api/v1/auth/reset-password
POST /api/v1/auth/send-otp
POST /api/v1/auth/verify-otp
PUT /api/v1/auth/refresh-token
POST /api/v1/auth/switch-account
POST /api/v1/auth/logout
```

### �� Testing Checklist

- [ ] Signup with valid data
- [ ] Signup with invalid data (validation)
- [ ] Login with correct credentials
- [ ] Login with incorrect credentials
- [ ] Token refresh on expiration
- [ ] Auto-login on app restart
- [ ] Logout and state cleanup
- [ ] OTP verification flow
- [ ] Password reset flow
- [ ] Account type switching

---

## 👤 User Management

### 🔄 Partially Implemented Features

- [x] Get current user profile
- [x] Update user profile
- [x] Delete account
- [ ] Profile picture upload
- [ ] KYC status tracking
- [ ] User ratings
- [ ] Account type management

### 📁 Files

- `contexts/ApiContext.tsx` (lines 500-550)
- `services/api.ts` (lines 350-400)
- `hooks/useShedaApi.ts` (lines 50-100)

### 🔗 API Endpoints

```typescript
GET / api / v1 / user / me;
PUT / api / v1 / user / update / me;
DELETE / api / v1 / user / delete -accnt;
```

### �� Testing Checklist

- [ ] Fetch user profile
- [ ] Update profile information
- [ ] Upload profile picture
- [ ] Delete account
- [ ] KYC status updates
- [ ] Rating system

---

## 🏠 Property Management

### 🔄 API Ready - UI Integration Pending

- [x] List new property (API method ready)
- [x] Get all properties (with pagination) (API method ready)
- [x] Get user's listings (API method ready)
- [x] Update property details (API method ready)
- [x] Delete property (API method ready)
- [x] Get agent profiles (API method ready)
- [ ] Property images management (API method ready, UI pending)
- [ ] Property filtering and search (UI implementation needed)

### 📁 Files

- `contexts/ApiContext.tsx` (lines 550-650)
- `services/api.ts` (lines 500-600)
- `hooks/useShedaApi.ts` (lines 100-200)
- `components/HouseList/`
- `components/HouseCard/`

### 🔗 API Endpoints

```typescript
POST /api/v1/property/list-property
GET /api/v1/property/get-properties
GET /api/v1/property/me
PUT /api/v1/property/update/{id}
DELETE /api/v1/property/delete/{id}
GET /api/v1/property/agent-profile/{id}
```

### �� Testing Checklist

- [ ] Create new property listing
- [ ] Fetch property feed with pagination
- [ ] Update property details
- [ ] Delete property
- [ ] Get agent profiles
- [ ] Property image upload
- [ ] Property search and filtering

---

## �� Appointment System

### 🔄 API Ready - UI Integration Pending

- [x] Book appointment with agent (API method ready)
- [x] Cancel appointment (API method ready)
- [ ] View appointment history (API method ready, UI pending)
- [ ] Appointment status tracking (UI implementation needed)

### 📁 Files

- `contexts/ApiContext.tsx` (lines 650-700)
- `services/api.ts` (lines 400-450)
- `hooks/useShedaApi.ts` (lines 200-250)
- `app/book-appointment/`
- `app/appointment-successful/`

### 🔗 API Endpoints

```typescript
POST / api / v1 / user / book - appointment;
DELETE / api / v1 / user / cancel - appointment / { id };
```

### �� Testing Checklist

- [ ] Book appointment with valid data
- [ ] Cancel existing appointment
- [ ] View appointment history
- [ ] Appointment status updates
- [ ] Conflict handling

---

## 💰 Payment & Financial

### 🔄 API Ready - UI Integration Pending

- [x] Create payment information (API method ready)
- [x] Get payment information (API method ready)
- [x] Update payment details (API method ready)
- [x] Delete payment information (API method ready)
- [x] Payment confirmation (API method ready)
- [x] Payment approval (API method ready)

### 📁 Files

- `contexts/ApiContext.tsx` (lines 700-750)
- `services/api.ts` (lines 450-500)
- `hooks/useShedaApi.ts` (lines 250-300)
- `app/payment-successful/`
- `app/payment-pin/`

### 🔗 API Endpoints

```typescript
POST / api / v1 / user / create - payment - info;
GET / api / v1 / user / payment - info;
PUT / api / v1 / user / update - account - info / { id };
DELETE / api / v1 / user / delete -accnt - info / { id };
GET / api / v1 / user / payment - info / { contractId };
POST / api / v1 / user / confirm - payment / { contractId };
POST / api / v1 / user / approve - payment / { contractId };
```

### �� Testing Checklist

- [ ] Create payment information
- [ ] Fetch payment details
- [ ] Update payment information
- [ ] Delete payment information
- [ ] Payment confirmation flow
- [ ] Payment approval process

---

## 📋 Schedule Management

### 🔄 API Ready - UI Integration Pending

- [x] Create available time slots (API method ready)
- [x] Get agent schedule (API method ready)
- [x] Update schedule (API method ready)
- [ ] Availability tracking (UI implementation needed)

### 📁 Files

- `contexts/ApiContext.tsx` (lines 750-800)
- `services/api.ts` (lines 500-550)
- `hooks/useShedaApi.ts` (lines 300-350)

### 🔗 API Endpoints

```typescript
POST / api / v1 / user / create - available - time;
GET / api / v1 / user / get - schedule / me;
PUT / api / v1 / user / update - schedule / { id };
```

### �� Testing Checklist

- [ ] Create availability slots
- [ ] Fetch agent schedule
- [ ] Update schedule
- [ ] Conflict detection
- [ ] Timezone handling

---

## 📄 Contract Management

### 🔄 API Ready - UI Integration Pending

- [x] Create contracts (API method ready)
- [x] Contract confirmation (API method ready)
- [ ] Payment tracking (UI implementation needed)
- [ ] Contract status management (UI implementation needed)

### 📁 Files

- `contexts/ApiContext.tsx` (lines 800-850)
- `services/api.ts` (lines 550-600)
- `hooks/useShedaApi.ts` (lines 350-400)
- `app/property-agreement/`

### 🔗 API Endpoints

```typescript
POST /api/v1/user/contracts/
```

### �� Testing Checklist

- [ ] Create new contract
- [ ] Contract confirmation
- [ ] Payment integration
- [ ] Contract status updates

---

## �� Chat System

### 🔄 API Ready - UI Integration Pending

- [x] Get chat history (API method ready)
- [ ] Message tracking (UI implementation needed)
- [ ] Property-specific chats (UI implementation needed)

### 📁 Files

- `contexts/ApiContext.tsx` (lines 850-900)
- `services/api.ts` (lines 600-650)
- `hooks/useShedaApi.ts` (lines 400-450)
- `app/chat/`
- `app/inbox/`

### 🔗 API Endpoints

```typescript
GET / api / v1 / chat / chat - history;
```

### �� Testing Checklist

- [ ] Fetch chat history
- [ ] Real-time messaging
- [ ] Property-specific conversations
- [ ] Message persistence

---

## 📁 Media & File Management

### 🔄 API Ready - UI Integration Pending

- [x] File upload (profile/property) (API method ready)
- [x] Get uploaded files (API method ready)
- [ ] Image management (UI implementation needed)

### 📁 Files

- `contexts/ApiContext.tsx` (lines 900-950)
- `services/api.ts` (lines 650-658)
- `hooks/useShedaApi.ts` (lines 450-500)
- `utilities/ImagePicker.ts`

### 🔗 API Endpoints

```typescript
POST / api / v1 / media / file - upload / { type };
GET / api / v1 / media / file - upload / { type };
```

### �� Testing Checklist

- [ ] Upload profile images
- [ ] Upload property images
- [ ] File type validation
- [ ] File size limits
- [ ] Image compression

---

## 🔗 NEAR Wallet Integration

### 🔄 Partially Implemented Features

- [x] NEAR wallet setup
- [x] Wallet recovery
- [x] Transaction signing
- [x] Balance checking
- [x] Secure key storage

### 📁 Files

- `services/nearWallet.ts`
- `services/secureStorage.ts`
- `hooks/useNearWallet.ts`
- `components/WalletDashboard.tsx`
- `components/NearWalletSignIn.tsx`
- `app/wallet-recovery/`

### �� Testing Checklist

- [ ] Wallet creation
- [ ] Wallet recovery
- [ ] Transaction signing
- [ ] Balance updates
- [ ] Key security

---

## �� Testing Strategy

### Unit Testing

- [ ] API service methods
- [ ] Context reducers
- [ ] Custom hooks
- [ ] Utility functions

### Integration Testing

- [ ] Authentication flow
- [ ] Property management flow
- [ ] Payment processing
- [ ] Appointment booking

### E2E Testing

- [ ] Complete user journeys
- [ ] Cross-platform compatibility
- [ ] Performance testing
- [ ] Error scenarios

### Test Files Structure

```
__tests__/
├── services/
│   ├── api.test.ts
│   └── nearWallet.test.ts
├── contexts/
│   └── ApiContext.test.ts
├── hooks/
│   ├── useShedaApi.test.ts
│   └── useNearWallet.test.ts
└── components/
    └── AuthGuard.test.ts
```

---

## ⚠️ Error Handling

### Global Error Handling

- [x] API request error catching
- [x] Network error handling
- [x] Token expiration handling
- [x] Validation error display
- [x] User-friendly error messages

### Error Types

```typescript
interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

interface HTTPValidationError {
  detail: ValidationError[];
}
```

### Error Recovery

- [x] Automatic retry for network errors
- [x] Token refresh on 401 errors
- [x] Graceful degradation
- [x] Offline mode handling

---

## �� State Management

### Context Structure

```typescript
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
```

### Action Types

- [x] Authentication actions
- [x] Data loading actions
- [x] CRUD operations
- [x] Error handling actions
- [x] State reset actions

---

## 🔒 Security Considerations

### Data Protection

- [x] Token-based authentication
- [x] Secure token storage
- [x] HTTPS API communication
- [x] Input validation
- [x] XSS prevention

### NEAR Wallet Security

- [x] Private key encryption
- [x] Secure key storage
- [x] Transaction signing
- [x] Wallet recovery phrases

### Best Practices

- [x] No sensitive data in logs
- [x] Proper error handling
- [x] Input sanitization
- [x] Rate limiting awareness

---

## 📊 Performance Monitoring

### Metrics to Track

- [ ] API response times
- [ ] App startup time
- [ ] Memory usage
- [ ] Network usage
- [ ] Error rates
- [ ] User engagement

### Optimization Areas

- [ ] Image compression
- [ ] Lazy loading
- [ ] Caching strategies
- [ ] Bundle size optimization

---

## 🚀 Deployment Checklist

### Pre-deployment

- [ ] All tests passing
- [ ] API endpoints verified
- [ ] Error handling tested
- [ ] Performance optimized
- [ ] Security audit completed

### Production Environment

- [ ] Environment variables configured
- [ ] API base URL updated
- [ ] NEAR network configured
- [ ] Monitoring tools setup
- [ ] Backup strategies in place

---

## 📝 Documentation Status

### ✅ Completed

- [x] API integration tracking
- [x] Code structure documentation
- [x] Testing strategies
- [x] Security considerations

### 🔄 In Progress

- [ ] API endpoint documentation
- [ ] Component documentation
- [ ] Deployment guides
- [ ] Troubleshooting guides

### 📋 TODO

- [ ] User manual
- [ ] Developer onboarding guide
- [ ] API versioning strategy
- [ ] Performance benchmarks

---

## 🔄 Maintenance Schedule

### Daily

- [ ] Error log monitoring
- [ ] Performance metrics review
- [ ] User feedback collection

### Weekly

- [ ] Security updates
- [ ] Dependency updates
- [ ] Performance optimization

### Monthly

- [ ] Full security audit
- [ ] Performance benchmarking
- [ ] User experience review
- [ ] API usage analytics

---

_Last Updated: [Current Date]_
_Version: 1.0.0_
_Maintainer: Development Team_
