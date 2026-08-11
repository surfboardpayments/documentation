## Overview

The Surfboard Tap to Pay on iPhone SDK turns any compatible iPhone into a payment terminal. The SDK ships as a prebuilt `tap_to_pay_apple.xcframework` that you link into your iOS app.

- **SDK binary:** `tap_to_pay_apple.xcframework` (static framework, module name `tap_to_pay_apple`).
- **Entry point:** The `Gap` class is the single facade your app interacts with.
- **Configuration:** `GapCredentials` encapsulates your Surfboard credentials and connection blob. Network details (Director URLs, certificates) are embedded in the blob -- you do not configure them manually.
- **Backend responsibilities:** Your server handles auth token issuance, order creation, and credential storage. The app never holds long-lived secrets.
- **App responsibilities:** Initialize the SDK, register the terminal, start transactions, and handle events.

> **Note:** The canonical reference implementation is the [Gap Example App for iOS](https://github.com/surfboardpayments/ios-gap-example), which demonstrates the full integration flow.

## Availability

Tap to Pay on iPhone with Surfboard is available in the following countries:

<div class="not-prose my-6">
  <div class="flex flex-wrap gap-2">
    <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-800 text-sm font-medium border border-green-200">🇸🇪 Sweden</span>
    <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-800 text-sm font-medium border border-green-200">🇫🇮 Finland</span>
    <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-800 text-sm font-medium border border-green-200">🇩🇰 Denmark</span>
    <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-800 text-sm font-medium border border-green-200">🇳🇴 Norway</span>
    <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-800 text-sm font-medium border border-green-200">🇬🇧 United Kingdom</span>
    <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-800 text-sm font-medium border border-green-200">🇫🇷 France</span>
    <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-800 text-sm font-medium border border-green-200">🇮🇪 Ireland</span>
    <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-800 text-sm font-medium border border-green-200">🇪🇪 Estonia</span>
    <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-800 text-sm font-medium border border-green-200">🇱🇻 Latvia</span>
    <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-800 text-sm font-medium border border-green-200">🇱🇹 Lithuania</span>
    <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-800 text-sm font-medium border border-green-200">🇵🇱 Poland</span>
    <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-800 text-sm font-medium border border-green-200">🇭🇺 Hungary</span>
  </div>
</div>

> **Note:** Availability depends on Apple enabling Tap to Pay on iPhone in each market and Surfboard's payment processing coverage. Contact Surfboard if you need support for a country not listed here.

## Supported Devices

Tap to Pay on iPhone requires specific hardware and software:

- **Device:** iPhone XS or later (models with NFC capability).
- **iOS version:** iOS 16.0 or later. Some features (such as PIN entry) require iOS 16.4+. Check [Apple's ProximityReader documentation](https://developer.apple.com/documentation/proximityreader) for the latest version requirements.
- **Beta iOS:** Beta versions of iOS are **not supported** for Tap to Pay on iPhone. Always test on stable iOS releases.
- **Simulator:** The iOS Simulator supports SDK initialization and terminal registration, but cannot perform real NFC card reads. Use a physical device for end-to-end payment testing.

## Prerequisites

Before you start, confirm you have the following:

| Category | Requirement |
|----------|-------------|
| Apple Developer | Active account with Tap to Pay on iPhone permission |
| Surfboard credentials | `CONNECTION_BLOB` -- opaque config string provided by Surfboard |
| Surfboard credentials | `TMS_PUBLIC_KEY` -- retrieved from Developer Portal after registering your SDK app under Console → SDK Apps |
| Merchant identifiers | `MERCHANT_ID` and `STORE_ID` from your Surfboard merchant onboarding |
| Auth provider | `providerId` and `providerCertificate` issued by Surfboard for your backend |
| Backend | A server that calls Surfboard's Client Auth Tokens API (`/api/auth`) and creates orders via the Orders API |
| iOS device | iPhone running iOS 17.4+ with NFC (required for real payments) |
| Tooling | Xcode 15+ |
| Simulator note | Simulator supports SDK init and registration flows, but not real card reads |

## Apple Developer Setup

<div class="not-prose my-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-r-md text-sm">
  <div class="font-semibold font-display text-yellow-800 mb-1">Warning</div>
  <div class="text-yellow-900">Implementing Tap to Pay on iPhone is a complex process that requires submitting your app to Apple for approval. Plan extra time for the entitlement request and review process, which can take several weeks.</div>
</div>

Four steps to configure your Apple Developer account and Xcode project for Tap to Pay on iPhone.

### Step 1: Register your App ID

In Apple's Certificates, Identifiers & Profiles, create or select an App ID and note the Bundle ID (e.g. `com.yourcompany.yourapp`). Use the same Bundle ID for test and production -- the Surfboard SDK controls environments through the connection blob and backend URLs, not the bundle identifier.

### Step 2: Enable the capability

Edit the App ID, find **Tap to Pay on iPhone** under Capabilities, and enable it. Apple may require additional contracts before this is available.

### Step 3: Update provisioning profiles

Regenerate your development and distribution profiles for the updated App ID and install them in Xcode.

### Step 4: Add the entitlement in Xcode

In your app target under Signing & Capabilities, click "+ Capability" and add **Tap to Pay on iPhone**. Xcode creates the entitlements file automatically. Also add any required `Info.plist` usage descriptions per Apple's ProximityReader documentation.

The entitlement key that must be present in your `.entitlements` file:

| Entitlement Key | Type | Value |
|-----------------|------|-------|
| `com.apple.developer.proximity-reader.payment.acceptance` | Boolean | `true` |

### Further reading

- [Apple: Setting up the entitlement for Tap to Pay on iPhone](https://developer.apple.com/documentation/proximityreader/setting-up-the-entitlement-for-tap-to-pay-on-iphone)
- [Apple: Tap to Pay on iPhone for Developers](https://developer.apple.com/tap-to-pay/)

> **Tip:** The Surfboard SDK does not use different bundle IDs for environments. Environments are controlled by the connection blob and backend URLs, not by the bundle ID.

## SDK Installation

The SDK is delivered as a prebuilt `tap_to_pay_apple.xcframework`. Surfboard provides separate staging and production builds.

1. Copy `tap_to_pay_apple.xcframework` into your repo (e.g., `YourApp/SDKs/tap_to_pay_apple/`).
2. In Xcode, go to your app target > General > Frameworks, Libraries, and Embedded Content.
3. Click + > Add Other > Add Files, then select the xcframework.
4. Set embedding to **"Do Not Embed"** (the SDK is a static framework).
5. Build to verify linking.

Import in Swift:

```swift
import tap_to_pay_apple
```

> **Note:** Swap the xcframework binary to switch between staging and production. Store both variants in your repo (e.g., `staging/` and `release/` subdirectories) and link only one at a time.

## Credentials & Initialization

Three objects to set up before processing payments: a logger, credentials, and the SDK instance.

### GapLogger

Implement the `GapLogger` protocol to route SDK logs into your logging stack. The protocol requires three methods: `addLog`, `addErrorLog`, and `addDebugLog`.

```swift
import os
import tap_to_pay_apple

final class AppGapLogger: GapLogger {
    private let logger = Logger(subsystem: "YourApp", category: "TapToPay")

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

### GapCredentials

Build `GapCredentials` once, typically at app startup, using values provided by Surfboard:

```swift
let credentials = GapCredentials(
    connectionBlob: connectionBlob,        // from Surfboard
    versionNumber: appVersion,
    tmsPublicKey: tmsPublicKey,            // from Surfboard Developer Portal
    merchantId: merchantId,                // from merchant onboarding
    storeId: storeId,                      // from merchant onboarding
    applicationBundleId: Bundle.main.bundleIdentifier ?? ""
)
```

### Gap instance

Create a single, long-lived `Gap` instance. Subscribe to events, initialize the SDK, and set the auth token:

```swift
let gap = try Gap(logger: logger, credentials: credentials)

gap.subscribeToPublicEvents { wrapper in
    // Handle wrapper.event and wrapper.data
}

try await gap.initializeSdk()

let authToken = try await fetchAuthTokenFromBackend()
gap.setAuthToken(authToken: authToken)
```

> **Warning:** Auth tokens are short-lived. Refresh them before expiry and call `setAuthToken(authToken:)` again. Never generate tokens on the device -- always fetch them from your backend.

## Terminal Lifecycle

The terminal represents a logical payment endpoint on the Surfboard side. You register it once per device, then open it for each session.

### Register (first run)

```swift
let result = await gap.registerTerminal()

switch result {
case .success:
    print("Terminal ID: \(gap.terminalId)")
case .failure(let error):
    print("Registration failed: \(error.code.details.message)")
}
```

Registration is a one-time operation per device or installation. After success, `gap.terminalId` contains the terminal identifier.

### Open and initialize (each session)

On subsequent app launches, skip registration and go straight to opening:

```swift
let openResult = await gap.openTerminal()
let readerResult = await gap.initializeReader()
try await gap.getReadyForTransaction()
```

Call these three methods in sequence before starting any payment.

### Cleanup

For logout or troubleshooting flows, use `disposeTerminal()` to close the session and `clean()` to reset SDK state. After calling `clean()`, you need to re-register the terminal.

## Payment Flow

Every payment follows three steps: create an order on your backend, start a transaction through the SDK, and handle the result.

### Step 1: Create an order

From your iOS app, call your backend to create an order via the Surfboard Orders API. Pass the amount in **minor units** (e.g., `1000` for 10.00 SEK), the ISO numeric currency code (e.g., `"752"` for SEK), and `gap.terminalId` as the terminal identifier. Your backend returns an `orderId`.

### Step 2: Start the transaction

```swift
let parameters = GapPaymentParameters(
    amount: NSNumber(value: amountInMinorUnits),
    type: "PURCHASE",
    currency: "SEK",
    orderId: orderId,
    aidPreference: nil
)

let paymentId = try await gap.startTransaction(parameters: parameters)
```

The SDK takes over and presents Apple's Tap to Pay UI. The customer taps their card. The SDK emits events throughout -- use them to update your UI ("Present card", "Processing", "Approved", "Declined").

### Step 3: Complete or cancel

After the transaction resolves:

```swift
// Confirm completion
gap.sendCompletedEvent(paymentId: paymentId, approved: true)

// Or cancel an in-progress transaction
let cancelResult = await gap.cancelTransaction(paymentId: paymentId)
```

## Cardholder Verification & PIN

Tap to Pay on iPhone supports on-device PIN entry starting with **iOS 16.4**. When a contactless transaction requires cardholder verification, the SDK presents a secure PIN input screen on the iPhone.

### When is PIN required?

- **NFC wallet payments** (Apple Pay, Google Pay) typically do not require PIN -- the cardholder authenticates via Face ID or passcode on their own device.
- **Physical contactless cards** may require PIN depending on the transaction amount, card issuer policy, and regional regulations.

### Regional considerations

| Region | Consideration |
|--------|--------------|
| United Kingdom | Strong Customer Authentication (SCA) may require card insertion for verification. If the card only supports offline PIN, the transaction will decline with an `offline_pin_required` error. |
| Canada & Finland | Cards that only support offline PIN are not compatible with Tap to Pay on iPhone. These transactions will be declined. |

<div class="not-prose my-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-md text-sm">
  <div class="font-semibold font-display text-blue-800 mb-1">Recommendation</div>
  <div class="text-blue-900">If a transaction declines due to PIN or verification issues, ask the customer to try a different card or use an alternative payment method such as a <a href="/products/payment-links" class="text-green-600 hover:underline">Payment Link</a> or a traditional card reader.</div>
</div>

For more information on contactless transaction limits by country, see [Visa's contactless transaction limits](https://www.visa.co.uk/dam/VCOM/regional/ve/unitedkingdom/PDF/visa-contactless-transaction-limit.pdf).

## Events & Monitoring

Subscribe to the SDK event stream to drive your UI and logging:

```swift
gap.subscribeToPublicEvents { wrapper in
    switch wrapper.event {
    case .INITIALIZED:           // SDK ready
    case .TERMINAL_CREATED:      // Registration succeeded
    case .TERMINAL_CREATION_ERROR: // Registration failed
    case .TRANSACTION_COMPLETED: // Payment finished
    case .TRANSACTION_FAILED:    // Payment failed
    default: break
    }
}
```

### Key status properties

| Property | Purpose |
|----------|---------|
| `gap.isInitialized` | SDK has completed initialization |
| `gap.terminalId` | Terminal ID after successful registration |
| `gap.isReadyForTransactions` | Terminal and reader are ready for payments |
| `gap.canMakePayments()` | Device supports Tap to Pay and is in a usable state |

Use these for health checks and to enable or disable payment UI elements.

## Best Practices

Follow these recommendations to deliver a reliable and polished Tap to Pay experience.

### Reader connection

- **Connect early:** Initialize the SDK and connect to the reader in the background during app startup, so the terminal is ready when the merchant needs to accept a payment.
- **Automatic reconnection:** When your app returns to the foreground, check `gap.isReadyForTransactions` and re-initialize the reader if needed. This ensures the terminal is always available after the app has been backgrounded.

### User experience

- Follow Apple's [Human Interface Guidelines for Tap to Pay on iPhone](https://developer.apple.com/design/human-interface-guidelines/tap-to-pay-on-iphone) to provide a consistent and intuitive payment experience.
- On **iOS 18+**, use Apple's `ProximityReaderDiscovery` API to display localized educational content that helps merchants and customers understand how Tap to Pay works.

### Marketing & branding

- When promoting Tap to Pay on iPhone in your app or marketing materials, follow Apple's [Tap to Pay on iPhone Marketing Guidelines](https://developer.apple.com/tap-to-pay/marketing-guidelines/) for correct branding, terminology, and asset usage.

## Testing

**Simulator:** Supports SDK initialization and terminal registration. Card presentation is simulated -- no real NFC reads. Use the simulator to validate your integration flow and UI before moving to a device.

**Physical device:** Required for end-to-end payment validation. Needs an iPhone running iOS 17.4+ with NFC. Test at least one full transaction on a real device before release.

### Common issues and checks

- **SDK not initializing:** Verify credentials (connection blob, TMS public key, merchant/store IDs). Check network connectivity. Inspect `GapLogger` output.
- **Registration fails:** Confirm `initializeSdk()` completed. Verify a valid `authToken` is set. Check that merchant/store IDs match the target environment.
- **Payments fail:** Confirm `gap.terminalId` is set. Verify order creation succeeds on your backend. Check that amount uses minor units and currency uses the correct ISO code. Inspect transaction events to distinguish declines from technical errors.

## Release Checklist

Verify these items before shipping your app with Tap to Pay on iPhone.

### Apple configuration

- App ID has Tap to Pay on iPhone capability enabled
- Provisioning profiles are up to date and installed
- Required `Info.plist` usage descriptions are present

### Surfboard configuration

- Using the correct `connectionBlob` and `tmsPublicKey` for the target environment
- Backend calls the correct Surfboard endpoints (staging vs. production) for auth tokens and orders
- `merchantId` and `storeId` match the target environment

### SDK wiring

- `tap_to_pay_apple.xcframework` is linked to the correct app target
- Only one xcframework variant (staging or production) is linked at a time
- `Gap` is instantiated once and reused across the app lifecycle
- Auth tokens are refreshed before expiry via `setAuthToken(authToken:)`

### Functional validation

- `gap.isInitialized` returns `true` after startup
- `gap.terminalId` is populated after registration
- At least one full transaction completes on a real device
- Event stream fires expected events: `INITIALIZED`, `TERMINAL_CREATED`, `TRANSACTION_COMPLETED`

## Reference

- [iOS Example App on GitHub](https://github.com/surfboardpayments/ios-gap-example)
- [Client Auth Token API](https://developers.surfboardpayments.com/references/api/client-auth-token/create-token)
- [Orders API](https://developers.surfboardpayments.com/api/orders)

## Disclaimer

<div class="not-prose my-6 p-4 bg-gray-50 border-l-4 border-gray-400 rounded-r-md text-sm">
  <div class="text-gray-700">While this document aims to assist users in the application process, it is ultimately the user's responsibility to meet Apple's requirements, and the final decision to approve or decline an application lies with Apple.</div>
</div>