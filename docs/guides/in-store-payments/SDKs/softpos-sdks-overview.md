# SoftPOS SDKs Overview

This page provides a shared overview of Surfboard SoftPOS SDKs for Android and iOS. It explains what the SDKs do, common concepts, and how the responsibilities are split between your backend and mobile apps.

## What the SoftPOS SDKs do

Surfboard SoftPOS SDKs turn compatible mobile devices into in-store payment terminals. They handle:

-   Initializing and managing a logical payment terminal.
-   Communicating securely with Surfboard services.
-   Orchestrating the lifecycle of a payment transaction.
-   Emitting events so your app can update its UI and state.

Today there are two platform SDKs:

-   Android SoftPOS SDK (GAP SDK)
-   iOS Tap to Pay on iPhone SDK (GAP SDK)

## Common prerequisites

Before integrating on any platform, you need:

-   A Surfboard partner account.
-   At least one active merchant and store.
-   Surfboard-issued SoftPOS configuration values:
    -   Connection blob.
    -   TMS public key.
-   Merchant and store identifiers from your own onboarding:
    -   Merchant ID.
    -   Store ID.
-   A backend that:
    -   Calls Surfboard [Client Auth Tokens API](/api/auth) to obtain short-lived `authToken`s for the SDK.
    -   Stores and protects your long-lived Surfboard credentials.
    -   Creates orders for each payment.
    -   Optionally records completion events or performs post-payment flows.

## How you receive SoftPOS credentials

Surfboard provides your SoftPOS `connectionBlob` and exposes your `tmsPublicKey` via the Developer Portal. You **never generate or edit these values yourself**:

-   `connectionBlob` encodes network and security details used by the SDK and is shared with you by Surfboard (for example via integrations support or the portal).
-   `tmsPublicKey` is retrieved from the Surfboard Developer Portal after you register your SDK app under **Console → SDK Apps** and complete the questionnaire for that app.

In most setups the same `connectionBlob` is used for both development and production. Switching between test and live traffic is handled by your backend (which Surfboard base URL you call) and which merchant/store you create there.

`merchantId` and `storeId` come from your own merchant/store onboarding:

-   You typically create merchants and stores via Surfboard's onboarding flows (for example the [Merchants API](/api/merchants) and [Stores API](/api/stores)) or the Surfboard portal.
-   The IDs returned from those flows are the ones you pass to the SDK.

Do not mix merchants, stores, and backend endpoints from different environments in the same build; for example, do not use a test merchant/store while your backend calls production APIs. This will cause registration and transaction failures.

If you are missing the connection blob or TMS public key, or are unsure about your configuration, contact Surfboard integrations support (for example via `integrations@surfboard.se` or your Slack channel) before continuing.

For both **Android** and **iOS** SoftPOS SDKs, the short-lived `authToken` you pass into the SDK comes from this same Client Auth Tokens API. Surfboard will set up an auth provider for you and issue `providerId` and `providerCertificate` values that your **backend** uses when calling `/api/auth`. The Client Auth Tokens API documentation explains these fields and how to obtain the provider credentials if you do not already have them.

## Shared integration responsibilities

Across Android and iOS, you follow the same high-level pattern:

-   Your backend:
    -   Owns all long-lived credentials.
    -   Exposes an endpoint for the mobile app to fetch a current auth token.
    -   Calls Surfboard order APIs.
-   Your mobile app:
    -   Initializes the SDK with a logger and credentials.
    -   Registers the terminal.
    -   Starts and cancels transactions.
    -   Listens to SDK events and updates the experience.

## Where to start

If you are integrating on a single platform, start here:

-   **Android**
    -   [Android SoftPOS SDK – Integration](/guides/in-store-payments/SDKs/android-gap-sdk)
    -   [Android SoftPOS SDK Setup](/guides/in-store-payments/SDKs/setup-android)
-   **iOS**
    -   [iOS SoftPOS SDK – Integration](/guides/in-store-payments/SDKs/iOS-gap-sdk)
    -   [Tap to Pay Apple SDK Setup](/guides/in-store-payments/SDKs/setup-ios)

If you are designing your overall SoftPOS integration for both platforms, read this page first and then follow the platform-specific guides to see how the shared concepts map to code on each platform.
