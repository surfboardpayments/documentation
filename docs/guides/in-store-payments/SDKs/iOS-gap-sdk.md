# Surfboard Tap to Pay on iPhone SDK (XCFramework)

> Integration guide for Surfboard’s `tap_to_pay_apple` SDK when delivered as a **prebuilt `.xcframework`**, using the modern `Gap(logger:credentials:)` API and a Surfboard **connection blob** for configuration.

This guide focuses on **iOS**. For a high-level overview of both Android and iOS SDKs, see [SoftPOS SDKs Overview](/guides/in-store-payments/SDKs/softpos-sdks-overview). For Android integration, see the [Android SoftPOS SDK Integration Guide](/guides/in-store-payments/SDKs/android-gap-sdk). For SDK setup and distribution on iOS, see [Tap to Pay Apple SDK Setup and Distribution](/guides/in-store-payments/SDKs/setup-ios).

This document is intended for **external integrators** who receive `tap_to_pay_apple.xcframework` from Surfboard and want to embed Tap to Pay on iPhone into their own iOS apps.

---

## 1. High‑Level Architecture

-   **SDK binary**: `tap_to_pay_apple.xcframework` (module name: `tap_to_pay_apple`).
-   **Main entry point**: `Gap` class.
-   **Configuration**: `GapCredentials`, built from values provided by Surfboard and your backend.
-   **Network details** (Director URL, certificates, etc.) are **embedded in the Surfboard connection blob** and are **not configured manually** in your app.
-   **Backend responsibilities**:
    -   Obtain auth tokens from Surfboard’s auth API.
    -   Create orders for each payment.
    -   Optionally record completion events.

Your iOS app is responsible for:

-   Initializing the SDK with credentials.
-   Registering the terminal.
-   Starting and cancelling transactions.
-   Handling SDK events and updating the UI.

---

## 2. Prerequisites

-   Active **Apple Developer account** with permission to enable Tap to Pay on iPhone.
-   Access to **Surfboard** to obtain integration values:
    -   `CONNECTION_BLOB` – opaque string that encodes Director URLs, certificates, and related parameters (shared with you by Surfboard, for example via integrations support or the portal).
    -   `TMS_PUBLIC_KEY` – public key for configuration management, retrieved from the Surfboard Developer Portal after you register your iOS SDK app under **Console → SDK Apps** and complete the questionnaire.
-   Merchant and store identifiers from your own onboarding:
    -   `MERCHANT_ID` – merchant identifier created during Surfboard merchant onboarding (for example via the Merchants API or portal).
    -   `STORE_ID` – store identifier under that merchant.
-   Surfboard-issued **auth provider details** on your backend side to call the Client Auth Tokens API:
    -   `providerId`
    -   `providerCertificate`
-   Your own backend that:
    -   Calls Surfboard’s **Client Auth Tokens API** (`/api/auth`) to obtain short‑lived `authToken`s.
    -   Exposes an endpoint the iOS app can call to fetch a current `authToken`.
-   **Device / tooling**:
    -   iOS **17.4+** (device) for real Tap to Pay on iPhone.
    -   Xcode **15+**.
    -   Physical iPhone with NFC for real payments (simulator is fine for UI only).

---

## 3. Apple Developer Portal & Entitlement Setup

Follow Apple’s official documentation for Tap to Pay on iPhone:

-   https://developer.apple.com/documentation/proximityreader/setting-up-the-entitlement-for-tap-to-pay-on-iphone

### 3.1. App ID and Bundle Identifier

1. Go to **Certificates, Identifiers & Profiles → Identifiers**.
2. Create a **new App ID** or select an **existing** one.
3. Make a note of the **Bundle ID** (e.g. `com.yourcompany.yourapp`).
4. Use this **same bundle ID** for:
    - Test / internal builds.
    - Release / production builds.

> The Surfboard SDK does **not** use different bundle IDs for environments. Environments are controlled by the **connection blob + backend URLs**, not by the bundle ID.

### 3.2. Enable Tap to Pay on iPhone

1. Edit the App ID.
2. In **Capabilities**, enable **Tap to Pay on iPhone**.
3. Save the changes.

Apple may require additional contracts/enrollment steps before the capability is available.

### 3.3. Update provisioning profiles

1. Go to **Certificates, Identifiers & Profiles → Profiles**.
2. Re‑create or update your **development** and **distribution** profiles for this App ID.
3. Download and install them in Xcode.

### 3.4. Configure Signing & Capabilities in Xcode

1. Open your app in Xcode.
2. Select your **app target → Signing & Capabilities**.
3. Ensure the correct **Team** and **Bundle Identifier** are set (the one with Tap to Pay enabled).
4. Click **“+ Capability”** and add **Tap to Pay on iPhone**.

Xcode will create/update your entitlements file (e.g. `YourApp.entitlements`) with the correct key.

### 3.5. Info.plist usage descriptions

Check the latest `ProximityReader` documentation for any required `Info.plist` usage descriptions (e.g. NFC or Tap to Pay related messaging) and add user‑friendly description strings.

---

## 4. Adding the `tap_to_pay_apple.xcframework`

You receive `tap_to_pay_apple.xcframework` from Surfboard (for example via an internal distribution channel).

### 4.1. Copy into your repository

Choose a location in your app repo, for example:

-   `YourApp/SDKs/tap_to_pay_apple/tap_to_pay_apple.xcframework`

Commit this directory so your CI and teammates share the same binary.

### 4.2. Link the XCFramework to your target

1. In Xcode, select your **app target → General**.
2. Under **Frameworks, Libraries, and Embedded Content**, click **“+” → “Add Other…” → “Add Files…”**.
3. Select `tap_to_pay_apple.xcframework` from your repo.
4. When prompted for embedding, choose **“Do Not Embed”** (the SDK is delivered as a static framework).
5. Build the app to verify linking.

### 4.3. Import in Swift code

In Swift files where you use the SDK:

```swift
import tap_to_pay_apple
```

---

## 5. Core SDK Concepts

-   **Gap** – main façade class you interact with.
-   **GapCredentials** – configuration object built from your Surfboard credentials and connection blob.
-   **Terminal** – logical payment terminal on the Surfboard side (registered once per device or per install).
-   **Order** – created on your backend, representing an amount + currency + terminal.
-   **Transaction** – payment initiated through the SDK for a given order.
-   **Events** – SDK emits events (status, errors, transaction lifecycle) that your app can subscribe to.

The canonical reference implementation is the **Gap Example App for iOS** (`gap_example_app_ios`), which you can use for a deeper dive into flows and UI patterns. You can find it at:

-   [Surfboard iOS GAP Example](https://github.com/surfboardpayments/ios-gap-example)

---

## 6. Credentials & SDK Initialization

### 6.1. Implementing `GapLogger`

Your app must provide a logger that conforms to `GapLogger` (part of the SDK). A typical pattern is to forward logs to `os.Logger`:

```swift
import os
import tap_to_pay_apple

final class ExampleGapLogger: GapLogger {
    private let logger: Logger = Logger(subsystem: "YourApp", category: "TapToPay")

    func addLog(logText: String) {
        logger.log("\(logText, privacy: .public)")
    }

    func addErrorLog(logText: String) {
        logger.error("\(logText, privacy: .public)")
    }

    func addDebugLog(logText: String) {
        logger.debug("\(logText, privacy: .public)")
    }
}
```

You can adapt the internals to your own logging stack.

### 6.2. Building `GapCredentials`

You receive from Surfboard:

-   `connectionBlob` (String)
-   `tmsPublicKey` (String)
-   `merchantId` (String)
-   `storeId` (String)

You also know:

-   `applicationBundleId` – usually `Bundle.main.bundleIdentifier`.
-   `versionNumber` – your app or integration version (e.g. from `Info.plist`).

You then build `GapCredentials` **once**, typically on app startup:

```swift
import tap_to_pay_apple

let logger: ExampleGapLogger = ExampleGapLogger()

let appBundleId: String = Bundle.main.bundleIdentifier ?? ""
let appVersion: String = (Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String) ?? "1.0.0"

let credentials: GapCredentials = GapCredentials(
    connectionBlob: connectionBlob,   // provided by Surfboard
    versionNumber: appVersion,
    tmsPublicKey: tmsPublicKey,       // provided by Surfboard
    merchantId: merchantId,           // provided by Surfboard
    storeId: storeId,                 // provided by Surfboard
    applicationBundleId: appBundleId
)
```

You do **not** edit or generate these values yourself. Surfboard provides the `connectionBlob` and `tmsPublicKey`, while `merchantId` and `storeId` come from the merchant and store you created. If initialization or registration fails, first confirm that:

-   You are using the correct `connectionBlob` and `tmsPublicKey` from Surfboard.
-   The `merchantId` and `storeId` you pass in exist and are active in the Surfboard environment your backend is calling (for example test vs production).
-   You are using the correct bundle identifier for the app that Surfboard expects.

If you are unsure which values to use, contact Surfboard integrations support (for example via `integrations@surfboard.se` or your Slack channel).

### 6.3. Creating and initializing `Gap`

Create a single long‑lived `Gap` instance:

```swift
let gap: Gap = try Gap(
    logger: logger,
    credentials: credentials
)
```

Subscribe to SDK events (see section 9 for details):

```swift
gap.subscribeToPublicEvents { wrapper in
    // Inspect wrapper.event and wrapper.data
}
```

Then initialize the SDK and set the auth token:

```swift
// Called once, typically on app start or when showing the Tap to Pay screen
try await gap.initializeSdk()

// Fetch authToken from your backend (which in turn calls Surfboard’s Client Auth Tokens API)
let authToken: String = try await fetchAuthTokenFromBackend()
gap.setAuthToken(authToken: authToken)
```

Notes:

-   The **auth token must not be created directly in the app**; it should be issued by your backend.
-   Tokens are short‑lived (see Surfboard docs). Refresh them before expiry (e.g. a few seconds before TTL) and call `setAuthToken(authToken:)` again with a fresh value.

On the backend side you will use Surfboard-issued `providerId` and `providerCertificate` when calling the Client Auth Tokens API. The iOS app itself should never embed `API-KEY`, `API-SECRET`, `providerId`, or `providerCertificate`; it only receives the short‑lived `authToken` from your backend.

For details on these provider credentials and how to request them, refer to the **Client Auth Tokens API** documentation at `/api/auth`. That page documents `providerId` and `providerCertificate` and includes instructions on how to obtain them from Surfboard.

---

## 7. Terminal Lifecycle

Once the SDK is initialized and an auth token is set, you can register and manage a terminal.

### 7.1. Registering the terminal

```swift
let result: Result<Void, GapException> = await gap.registerTerminal()

switch result {
case .success:
    print("Terminal registered with ID: \(gap.terminalId)")
case .failure(let error):
    print("Terminal registration failed: \(error.code.details.message)")
}
```

-   On success, `gap.terminalId` exposes the terminal identifier.
-   Registration is typically done **once per device / installation**, but you can expose a “Re‑register terminal” action if needed.

On the **first run** on a device (or after reinstalling / changing environment), the usual order is:

1. Build `GapCredentials` using the correct SoftPOS credential set (`connectionBlob`, `tmsPublicKey`, `merchantId`, `storeId`).
2. Create the `Gap` instance.
3. Call `initializeSdk()`.
4. Obtain an `authToken` from your backend and call `setAuthToken(authToken:)`.
5. Call `registerTerminal()` and confirm that `gap.terminalId` is set.

### 7.2. Opening a terminal session and initializing the reader

Depending on your flow you may call the following, usually after registration:

-   `openTerminal()` – open a logical terminal session.
-   `initializeReader()` – prepare the device for Tap to Pay.
-   `getReadyForTransaction()` – ensure all prerequisites are ready before starting a transaction.

Example:

```swift
// Open terminal session
let openResult: Result<Void, GapException> = await gap.openTerminal()

// Initialize reader
let readerResult: Result<Bool, GapException> = await gap.initializeReader()

// Get ready for transaction (may be a no‑op on some versions)
try await gap.getReadyForTransaction()
```

You can also expose an explicit **“Initialize Reader”** button for troubleshooting, as demonstrated in the example app.

On **subsequent app launches** on the same device you normally:

-   Rebuild `GapCredentials` with the same Surfboard values.
-   Create the `Gap` instance.
-   Call `initializeSdk()` and set a fresh `authToken`.
-   Skip `registerTerminal()` unless you explicitly want to re-register.
-   Call `openTerminal()`, `initializeReader()`, and `getReadyForTransaction()` before starting payments.

### 7.3. Cleaning and disposing

For troubleshooting or logout flows:

-   `disposeTerminal()` – close terminal session.
-   `clean()` – clear SDK state (terminal registration, cached data, etc.).

Use these sparingly, as you will typically need to **re‑register** the terminal after cleaning.

---

## 8. Payment Flow (End‑to‑End)

The canonical flow mirrors the example app:

1. **Initialize SDK** and **set auth token**.
2. **Register terminal** (once per device).
3. For each payment:
    - Create an **order** via your backend.
    - Start a **transaction** with `Gap` using that order.
    - Optionally send a **completion event**.

### 8.1. Step 1 – Create an order on your backend

From the iOS app, call your backend:

-   Amount is provided in **minor units** (e.g. `1000` for 10.00 SEK).
-   Use `gap.terminalId` as the terminal identifier.
-   Use ISO numeric currency code (e.g. `"752"` for SEK).

Your backend calls Surfboard’s APIs to create the order and returns (at minimum) an `orderId`.

### 8.2. Step 2 – Start transaction via SDK

Using the `orderId` and the same amount/currency, build `GapPaymentParameters` and call `startTransaction(parameters:)`:

```swift
let parameters: GapPaymentParameters = GapPaymentParameters(
    amount: NSNumber(value: amountInMinorUnits), // e.g. 1000 for 10.00
    type: "PURCHASE",
    currency: "SEK",                            // ISO alpha code
    orderId: orderId,
    aidPreference: nil
)

let paymentId: String = try await gap.startTransaction(parameters: parameters)
```

-   `paymentId` is the identifier for the payment/transaction.
-   The SDK will then manage Tap to Pay on iPhone UI and card reading via Apple’s `ProximityReader` framework.

During the transaction, you receive **events** (see section 9) that you can use to update your UI (“Present card”, “Processing…”, “Approved”, “Declined”, etc.).

### 8.3. Step 3 – Completion and cancellation

Once the transaction outcome is known (via events and/or backend response), you can:

-   Notify Surfboard via a **completion event**:

```swift
gap.sendCompletedEvent(paymentId: paymentId, approved: true)
```

-   Or **cancel** an in‑progress transaction:

```swift
let cancelResult: Result<Void, GapException> = await gap.cancelTransaction(paymentId: paymentId)
```

Handle success/failure of cancellation to update your UI accordingly.

---

## 9. Events, Status & Monitoring

### 9.1. Subscribing to public events

The SDK exposes a public event stream. In the example app this is done via:

```swift
gap.subscribeToPublicEvents { wrapper in
    switch wrapper.event {
    case .INITIALIZED:
        print("SDK initialized")
    case .TERMINAL_CREATED:
        print("Terminal created")
    case .TERMINAL_CREATION_ERROR:
        print("Terminal registration failed")
    case .TRANSACTION_COMPLETED:
        print("Transaction completed")
    case .TRANSACTION_FAILED:
        print("Transaction failed")
    default:
        break
    }
}
```

You can map these events to your own UI states, logs, or analytics.

### 9.2. Key properties

The SDK exposes properties you can use to quickly inspect status:

-   `gap.isInitialized` – whether the SDK has completed initialization.
-   `gap.terminalId` – terminal ID if registration was successful.
-   `gap.isReadyForTransactions` (or equivalent) – whether terminal/reader are ready.
-   `gap.canMakePayments()` – whether this device supports Tap to Pay on iPhone and is in a usable state.

These are useful for health checks and to enable/disable payment UI.

---

## 10. Testing & Troubleshooting

### 10.1. Simulator vs device

-   **Simulator**:
    -   SDK initialization and terminal registration flows can be exercised.
    -   No real NFC / Tap to Pay; card presentation is simulated.
-   **Physical device** (iOS 17.4+ with NFC):
    -   Required for real payments and end‑to‑end validation.

### 10.2. Common issues

-   **SDK not initializing**:

    -   Check that credentials (connection blob, keys, IDs) are correct.
    -   Confirm network connectivity.
    -   Inspect logs from your `GapLogger` implementation.

-   **Terminal registration fails**:

    -   Ensure `initializeSdk()` has completed successfully.
    -   Confirm a valid `authToken` is set (`setAuthToken(authToken:)`).
    -   Verify `merchantId` / `storeId` are correct for the environment.

-   **Payments fail**:
    -   Make sure the terminal is registered and `gap.terminalId` is non‑empty.
    -   Confirm order creation succeeds on your backend.
    -   Verify amount and currency (minor units and ISO numeric/alpha codes).
    -   Check transaction‑related events to distinguish declines vs technical errors.

---

## 11. Release Checklist

Before shipping an app that uses Surfboard Tap to Pay on iPhone:

-   **Apple configuration**

    -   App ID has **Tap to Pay on iPhone** capability enabled.
    -   Updated **provisioning profiles** are installed.
    -   Required `Info.plist` usage descriptions are present.

-   **Surfboard configuration**

    -   You are using the `connectionBlob` and `tmsPublicKey` provided by Surfboard, and the correct `merchantId` / `storeId` for the target environment.
    -   Your backend is calling the correct **Surfboard endpoints** (staging vs production) for auth tokens and order creation.

-   **SDK wiring**

    -   `tap_to_pay_apple.xcframework` is correctly linked to your app target.
    -   `Gap` is initialized once and reused (no repeated instantiation per transaction).
    -   Tokens are refreshed in time and set via `setAuthToken(authToken:)`.

-   **Functional checks**
    -   SDK initializes and reports `isInitialized == true`.
    -   Terminal registration succeeds and `terminalId` is visible.
    -   At least one full transaction completes successfully on a real device.
    -   Event stream behaves as expected (INITIALIZED, TERMINAL_CREATED, TRANSACTION_COMPLETED / FAILED, etc.).

---

## 12. Reference Example

-   **Example TTP-SDK**: [Surfboard iOS GAP Example](https://github.com/surfboardpayments/ios-gap-example/blob/master/README.md)
