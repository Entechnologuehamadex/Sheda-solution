## Sheda Mobile – Feature Test Plan

This document lists the core features integrated in the mobile app and provides a clear, sequential plan to test each one manually, plus guidance for automation where applicable.

### Prerequisites

- Test account credentials for both roles: client and agent.
- Backend reachable: `https://sheda-backend-production.up.railway.app` (default in `services/api.ts`).
- Device/emulator with photo library access for image tests.
- Expo environment up and running.

Run the app:

```bash
yarn
expo start
```

### Conventions

- Screens/flows mentioned reference files in `app/` and components in `components/`.
- API interactions are provided by `contexts/ApiContext.tsx` and `services/api.ts`.

---

## 1) Authentication

Features:

- Signup, Login, Logout
- Verify account, OTP flow: send OTP, verify OTP, reset password
- Refresh token, Switch account (client/agent)

Manual test steps:

1. Signup
   - Open app, navigate to Signup.
   - Provide valid email/password; submit.
   - Expect: token saved, user data persisted, routed to app.
2. Login/Logout
   - Logout from menu.
   - Login with the same credentials.
   - Expect: token present, `getMe()` loads profile and related data without errors.
3. Password reset via OTP
   - Trigger “Forgot password”, send OTP to your email.
   - Enter OTP and new password; submit.
   - Expect: success, then login with new password works.
4. Switch account
   - With an agent-capable account, trigger switch to `agent` then back to `client`.
   - Expect: token refreshes, `getMe()` called, UI role changes without errors.

Automation tips:

- Unit/integration: mock `apiService` methods in `contexts/ApiContext.tsx` and assert state transitions.
- E2E: Cover login and logout as smoke tests.

---

## 2) Profile Management

Features:

- View current profile (`getMe`), edit profile fields, upload profile image, delete account

Manual test steps:

1. Load profile info
   - Navigate to `personal-info` screen.
   - Expect: fields populated from `useApi().user`.
2. Update text fields
   - Change Full name, Agency name, Phone, Location.
   - Tap Save; expect success toast/alert; navigate back.
   - Re-open screen; expect persisted values.
3. Upload profile photo
   - Tap pencil icon → choose image from library.
   - Expect: upload via `uploadFile("profile", file)` succeeds; avatar updates.
4. Invalid phone
   - Enter a phone not matching `^\+\d{10,15}$` and Save.
   - Expect: validation alert, no API call.

Automation tips:

- Unit: mock `expo-image-picker` to return `{ uri, type, name }` and assert `uploadFile` called with file-like object.
- Contract: mock `fetch` to ensure multipart/form-data is used by `apiService.uploadFile`.

---

## 3) Media Uploads (Profile & Property)

Features:

- `uploadFile(type, file)` for `profile` and `property` media.

Manual test steps:

1. Profile upload (covered above).
2. Property upload (seller flow below) ensures `file_url` is added to photos list.

Automation tips:

- Unit: inject a fake file object and assert endpoint `/api/v1/media/file-upload/{type}` is called.

---

## 4) Seller Property Listing Flow

UI components:

- `components/seller/PropertyListingForm.tsx` (multi-step)
- `components/seller/PhotoUpload.tsx` (image grid and add-more)

Manual test steps (sequential):

1. Start flow
   - Navigate to listing flow; tap “Get started”.
   - Expect: progress bar, step changes.
2. Property details
   - Select property type, status, location, furnishing, beds/baths; Next.
3. Extras
   - Tick some amenities; Next.
4. Photos (critical)
   - Tap a plus slot → choose an image.
   - Expect: permission prompt (first run), image picker opens.
   - On selection: `uploadFile("property", { uri, type, name })` called; image previews in grid.
   - Add at least 4 photos; tap “Add more” works too.
5. Description & price
   - Enter description, price, toggle negotiable; Next.
6. Confirm & list
   - Tap “Confirm and list”. Expect success state or API call when backend endpoint is wired.

Automation tips:

- Unit: mock ImagePicker and `uploadFile` and assert `onPhotosChange` updates list with `file_url`.
- E2E: abstract the picker behind a module; return a fake asset during tests to avoid native UI.

---

## 5) Property APIs

Features:

- Feed (`getProperties`), My listings, Create (`listProperty`), Update, Delete, Get by ID, Agent profile

Manual test steps:

1. Feed
   - Visit Home/Lists; expect properties populated.
2. My Listings
   - As agent, open History/My Listings; expect your items shown.
3. Create/Update/Delete
   - After seller flow, verify the new listing appears; edit an item; delete an item.
4. Get by ID
   - Open a property details page; expect details arrive via API by id.

Automation tips:

- Unit: mock each `apiService` method and assert reducer actions dispatch updates to state.

---

## 6) Appointments

Features:

- Book and cancel appointments

Manual test steps:

1. Book
   - From property details, choose a time and book.
   - Expect appointment in list; status `pending`.
2. Cancel
   - Cancel the appointment; expect it disappears or shows `canceled`.

Automation tips:

- Unit: mock endpoints and assert state updates in `ApiContext`.

---

## 7) Payment Information

Features:

- Create, get, update, delete payment info

Manual test steps:

1. Add payment info
   - Navigate to payment settings; create a record.
   - Expect: appears in list.
2. Update and delete
   - Update record values; delete the record; expect list reflects changes.

Automation tips:

- Unit: mock CRUD endpoints; verify reducer changes.

---

## 8) Schedule (Agent Availability)

Features:

- Create availability, get schedule, update availability

Manual test steps:

1. Create
   - Add a new availability slot; expect appears in schedule.
2. Update
   - Change time; expect updated slot.

Automation tips:

- Unit: mock endpoints and assert `schedule` in state updates accordingly.

---

## 9) Contracts and Payments

Features:

- Create contract, Confirm payment, Approve payment

Manual test steps:

1. Create contract
   - From a property transaction flow, create a contract.
   - Expect server returns contract details.
2. Confirm/Approve payment
   - Trigger confirm/approve endpoints; expect success responses and any related UI updates.

Automation tips:

- Unit: mock endpoints, assert no unhandled errors; verify calls made.

---

## 10) Chat History

Features:

- Fetch chat history for current user

Manual test steps:

1. Open Inbox
   - Expect chat list populated if messages exist.

Automation tips:

- Unit: mock `getChatHistory` and assert dispatch to store the list.

---

## 11) Wallet (NEAR) – UI Sanity

Features:

- Wallet screens and hooks under `hooks/useNearWallet.ts`, UI components for tokens and transactions

Manual test steps:

1. Navigate to Wallet tab
   - Expect UI renders without runtime errors; static lists show.
2. Optional: connect flow if configured for the environment; otherwise keep as UI smoke test.

Automation tips:

- Unit/UI: render wallet components and assert visible labels/icons without depending on network.

---

## Automation Stack

### Unit/Integration (Jest)

- Install: `yarn add -D jest jest-expo @testing-library/react-native @testing-library/jest-native @types/jest`
- `package.json` Jest config:

```json
{
  "preset": "jest-expo",
  "setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"]
}
```

- Example target: `__tests__/PhotoUpload.test.tsx` mocks `expo-image-picker` and asserts `uploadFile` receives `{ uri, name, type }`.

### E2E (Maestro or Detox)

- Abstract image picker into a small module and swap in a fake implementation in E2E builds to avoid native picker UI.
- Write flows for: Login → Seller listing (add photos) → Confirm; Profile photo update; Basic navigation.

### CI (GitHub Actions)

`.github/workflows/mobile-tests.yml`

```yaml
name: mobile-tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: sheda-solution-mobile
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: yarn install --frozen-lockfile
      - run: yarn test --ci --runInBand
```

---

## Sequential Manual Test Checklist

- [ ] Auth: Signup → Logout → Login
- [ ] OTP: Send OTP → Verify → Reset Password → Login
- [ ] Profile: Edit fields → Save persists → Upload profile photo
- [ ] Seller flow: Details → Extras → Photos (≥4) → Description/Price → Confirm
- [ ] Properties: Feed loads → My Listings show → Update/Delete → Details by ID
- [ ] Appointments: Book → Cancel
- [ ] Payment Info: Create → Update → Delete
- [ ] Schedule: Create availability → Update
- [ ] Contracts: Create → Confirm Payment → Approve Payment
- [ ] Chat: Inbox loads messages
- [ ] Wallet: UI renders without errors
