# TTP SDK Integration Guide

## 1. Introduction

---

The Surfboard Payments SDK enables Android applications to process tap-to-pay transactions using NFC-enabled devices. It provides a robust solution for terminal management, transaction processing, and security, supporting seamless integration for contactless payments.

This guide focuses on **Android**. For a high-level overview of all SoftPOS SDKs, see [SoftPOS SDKs Overview](/guides/in-store-payments/SDKs/softpos-sdks-overview). For iOS-specific integration, refer to the [Surfboard Tap to Pay on iPhone SDK Integration Guide](/guides/in-store-payments/SDKs/iOS-gap-sdk).

## 2. Prerequisites

---

Before starting integration, ensure you have:

## Development Environment

-   **Android Studio**: Version 4.1 or higher
-   **Minimum SDK Version**: API level 29 (Android 10.0)
-   **Java Version**: 11 or higher
-   **Kotlin Version**: 2.0.21 or higher

### Surfboard Account & Credentials

-   Registered Surfboard Partner account
-   Active merchant setup with at least one store active under them
-   Surfboard-issued SoftPOS configuration values:
    -   `connectionBlob` – shared with you by Surfboard (for example via integrations support or the portal).
    -   `tmsPublicKey` – retrieved by you from the Surfboard Developer Portal after registering your Android SDK app under **Console → SDK Apps** and completing the questionnaire.
-   Merchant and store identifiers from your own onboarding:
    -   `merchantId`
    -   `storeId`
-   Access to [Client Auth Token API](/api/auth) for obtaining bearer tokens (`authToken`s) that you pass to the SDK.

You do **not** generate `connectionBlob` or `tmsPublicKey` yourself. Surfboard shares them as part of your onboarding. The `merchantId` and `storeId` come from the merchant and store you create (for example via the [Merchants API](/api/merchants) and [Stores API](/api/stores) or the Surfboard portal). If you are missing any of these values, or are unsure which set to use, contact Surfboard integrations support (for example via `integrations@surfboard.se` or your shared Slack channel).

To call the Client Auth Tokens API from your backend you also need `providerId` and `providerCertificate`. These are issued by Surfboard as part of configuring your auth provider. The **Client Auth Tokens API** documentation at `/api/auth` describes these fields and includes guidance on how to obtain the provider credentials (for example, contacting the Surfboard integrations team). Do **not** hardcode these values in the app.

-   SDK public key and connection certificate from the Developer Portal
-   Access to [Client Auth Token API](https://developers.surfboardpayments.com/api/auth?lang=cURL) for obtaining bearer tokens

## 3. SDK Versions

---

## Sandbox / Test SDK

-   Once you **register your app**, you’ll receive the **Sandbox/Test TTP SDK**.
-   Use this SDK to test transactions with **production TEST partners**.
-   Follows the **same integration process as the production SDK**.
-   Allows you to safely test all transaction flows **without processing real payments**.

## Production SDK

-   The **Production SDK** will be shared **after your integration has been tested and certified on the sandbox environment**.
-   Use this SDK for **live transactions with production partners**.
-   Requires **certification and approval** before it’s enabled for your app.
-   Follows the **standard integration process** as per production guidelines.

## 4. Installation & Setup

---

Most build and dependency configuration is covered in [Android SoftPOS SDK Setup and Distribution](/guides/in-store-payments/SDKs/setup-android). Use that page to:

-   Add and secure `softpos.properties`.
-   Configure Maven repositories and Gradle dependencies.
-   Manage SDK versions for sandbox and production.

This section focuses on runtime configuration that is specific to your Android app.

## Android Manifest Configuration

Add the following permissions and features to your `AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

<!-- Hardware Features -->
    <uses-feature
        android:name="android.hardware.camera"
        android:required="false" />
    <uses-feature
        android:name="android.hardware.nfc"
        android:required="true"/>

<!-- Permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.NFC" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.CAMERA"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.VIBRATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme">

<!-- Your activities -->

    </application>
</manifest>

```

**Permission Explanations**

| **Permission**       | **Reason**                                      |
| -------------------- | ----------------------------------------------- |
| **NFC**              | Required for terminal communication             |
| **Camera**           | Optional for barcode/QR code scanning           |
| **Audio**:           | Required for audio feedback during transactions |
| **Internet/Network** | Required for API communication                  |

## Verify Installation

Verify that the SDK is properly installed by importing:

```kotlin
import com.surfboardpayments.gapsdk.Gap
// If this import works without errors, the SDK is properly installed

```

For reference, see our [Android GAP Example](https://github.com/surfboardpayments/android-gap-example/blob/master/readme.md)

## **ProGuard/R8 Configuration (Optional)**

If you choose to enable ProGuard/R8 for code obfuscation in release builds, ensure you preserve Surfboard SDK classes by adding these rules to `proguard-rules.pro`:

```
# Surfboard Gap SDK Protection Rules
-keep class com.surfboardpayments.** { *; }
-keepclassmembers class com.surfboardpayments.** { *; }

# Terminal library classes
-keep class com.mypinpad.** { *; }

# Haptics library classes
-keep class com.haptics.** { *; }

# Supporting libraries
-keep class okhttp3.** { *; }
-keep class rx.** { *; }
-keep class arrow.** { *; }
-keep class com.google.gson.** { *; }

```

<aside>

**Note**: ProGuard/R8 configuration is optional. Only add these rules if you plan to enable code minification in your release builds.

</aside>

## 5. Credentials & SDK Initialization

---

### 5.1 Prerequisites for integration

-   Registered Surfboard Partner account
-   Active merchant setup with at least one store
-   Surfboard SoftPOS configuration (`connectionBlob`, `tmsPublicKey`) and the `merchantId` / `storeId` for the store you want to use
-   SDK public key and connection certificate from the Developer Portal
-   Valid API token (refreshed every 60 minutes via setAuthToken)

### 5.2 Initial setup

### 1. Create Logger Implementation

The SDK requires a logger implementation. Create a custom logger class:

```kotlin
class LoggerLog() : GapLogger(){
    override fun addDebugLog(log: String) {
        TODO("Not yet implemented")
    }

    override fun addErrorLog(log: String) {
        TODO("Not yet implemented")
    }

    override fun addLog(log: String) {
        TODO("Not yet implemented")
    }
}

private var logger: Result<LoggerLog> = Result.failure(Exception("Logger not initialized"))
logger = Result.success(loggerWidget)

```

### 2. Create SDK Instance

Create the Gap SDK instance with required credentials:

```kotlin

private var _softposSDK: Result<Gap> = Result.failure(Exception("SDK Instance is not initialized"))

        _softposSDK = Result.success(
            Gap(
                logger = this.logger.getOrThrow(),
                gapCredentials = GapCredentials(
                    connectionBlob = BuildConfig.connectionBlob,
                    versionNumber = "YOUR_APPLICATION_VERSION",
                    tmsPublicKey = "PUBLIC_KEY_ASSIGNED_BY_SURFBOARD_FOR_YOUR_APPLICATION",
                    merchantId = BuildConfig.merchantId,
                    storeId = BuildConfig.storeId,
                    applicationBundleId = "YOUR_APPLICATION_BUNDLE_ID"
                ),
                context = applicationContext
            )
        )

```

In your real app, `connectionBlob` and `tmsPublicKey` come from Surfboard, and `merchantId` / `storeId` come from the merchant and store you created. A common pattern is:

-   Store `connectionBlob`, `tmsPublicKey`, `merchantId`, and `storeId` in build configuration (for example `BuildConfig`) or a secure remote config.
-   Keep separate builds or flavors if you need distinct test vs production configurations (for example different Surfboard base URLs and merchant/store IDs).
-   Never mix credentials from different environments in the same build.

### 3. Set Authentication Token

Set the bearer token before any SDK operations. You can get this via [Client Auth Token API](https://developers.surfboardpayments.com/api/auth?lang=cURL):

```kotlin
private fun setAuthToken() {
    val bearerToken = "YOUR_BEARER_TOKEN" // Get from your auth system
    softposSDK?.setAuthToken(bearerToken)
}

```

<aside>
📌

**Important**: Bearer tokens expire every 60 minutes. Implement automatic refresh mechanism.

</aside>

Your Android app should **not** call the Client Auth Tokens API directly or embed `API-KEY` / `API-SECRET`. Instead:

-   Your backend calls the Client Auth Tokens API using its Surfboard API key/secret, `providerId`, and `providerCertificate`.
-   The backend then exposes a lightweight endpoint for the app to fetch the current `authToken`.
-   The app calls that backend endpoint, receives the short-lived token, and passes it to `setAuthToken`.

### 4. Subscribe to Events

Use the `subscribeToPublicEvents` to receive updates about transactions, card reader status, and network connectivity:

```kotlin
val subscription = gapSdk.subscribeToPublicEvents { wrapper ->
    when(wrapper.event){
        GapPublicEvent.INITIALIZED -> {
            // Handle SDK initialization event
        }
        // Handle other events as needed
    }
}

```

## 6. Terminal lifecycle and payment flow

### Step 1: Register Terminal

After creating SDK instance, you must call `registerTerminal` method which will return `terminalId` which is used to create order.

```kotlin
 private fun registerTerminal(){

        CoroutineScope(Dispatchers.Main).launch {
            logger.addLog("registering terminal...")

            try {
                // Switch to IO dispatcher for the network operation
                val result = withContext(Dispatchers.IO) {
                  softposSDK.registerTerminal().await()
                }

                // Back on the main thread for UI updates
                result.fold(
                    { error ->
                        logger.addErrorLog("Error activating terminal: ${error.explainError()}")
                    },
                    { terminalId ->
                        logger.addLog("Terminal activated successfully: $terminalId")


                    }
                )
            } catch (e: Exception) {
                logError("Error activating terminal: ${e.message}")
            }
        }
        this.logInfo("Registering terminal using Gap SDK")

    }
```

**Accessing Terminal ID**: After registration, you can access the terminal ID anywhere in your application:

```kotlin
gapSdk.terminalId.onRight { tid ->
    logger.addDebugLog("Terminal ID : $tid")
}

```

### Step 2: Initialize SDK

Initialize the SDK after terminal registration:

```kotlin
private fun initializeSDK() {
    try {
        softposSDK?.initializeGapSDK()
        // Wait for INITIALIZED event
    } catch (e: GapException) {
        handleGapException(e)
    }
}

```

### Step 3: Fetch Prerequisites (First Time Only)

This step is only required during the first-time SDK initialization to fetch prerequisite data to the terminal. It will fetch all the merchant and store branding, emv configs and currency, etc,.

```kotlin
softposSDK.fetchPrerequisites()// Wait for completion before proceeding
```

<aside>
📌

**Note**: You can do it in Parallel while you initialising the SDK.

</aside>

In practice, you will follow this pattern:

-   **First run on a device (or after reinstall / environment change)**
    1. Build the `Gap` instance with the correct SoftPOS credentials (SDK instance creation).
    2. Set a valid `authToken` from your backend using `setAuthToken`.
    3. Call `initializeGapSDK()`.
    4. Call `registerTerminal()` to provision a logical terminal and obtain `terminalId`.
    5. Call `fetchPrerequisites()` once to download configuration and branding controlled by Surfboard’s TMS (driven by your `tmsPublicKey`).
-   **Subsequent runs on the same device**
    -   Rebuild the `Gap` instance.
    -   Set a fresh `authToken`.
    -   Skip `fetchPrerequisites()` unless Surfboard asks you to re-fetch, or you change environment / credentials.
    -   Use `openTerminal()` and the rest of the flow as normal.

If `registerTerminal` or `fetchPrerequisites` fails, double-check that:

-   You are using the `connectionBlob` and `tmsPublicKey` provided by Surfboard.
-   The `merchantId`, `storeId`, and `authToken` all belong to the same Surfboard environment (for example your test vs production cluster).

### Step 4: Open Terminal session

Open a terminal session (call every time app comes to foreground

```kotlin
// openTerminal also accepts Pin Pad configurations to customize the PIN screen.
softposSDK.openTerminal().onLeft { err ->
            logger.onSuccess {
                it.addDebugLog(err.explainError())
            }
        }.onRight { _ ->
            logger.onSuccess {
                it.addLog("Terminal created successfully")
            }
            //if needed, Notify all listeners that terminal has been created
            notifyTerminalCreated()
        }
```

### Step 5: Prepare for Transaction

This method prepares transaction keys and is only valid for 120 seconds. Call this method right before starting a transaction. (Only when you're about to initiate the payment.)

```kotlin
CoroutineScope(Dispatchers.Main).launch {
            logInfo("Activating terminal...")

            try {
                // Switch to IO dispatcher for the network operation
                val result = withContext(Dispatchers.IO) {
                    softposSDK.getReadyForTransaction().await()
                }

                // Back on the main thread for UI updates
                result.fold(
                    { error ->
                        logError("Error activating terminal: ${error.explainError()}")
                    },
                    { _ ->
                        logInfo("Terminal activated successfully")

                    }
                )
            } catch (e: Exception) {
                logError("Error activating terminal: ${e.message}")
            }
        }

```

### Step 6: Create Order

Before starting a transaction, create an order using the Surfboard Orders API. See the [Create Orders API](https://developers.surfboardpayments.com/api/orders?lang=cURL#Create-New-Order) for details.

### Step 7: Start Transaction

Start the actual payment transaction with the required parameters.

```kotlin
CoroutineScope(Dispatchers.Main).launch {


            try {
                // Switch to IO dispatcher for the network operation
                val result = withContext(Dispatchers.IO) {
                    softposSDK.startTransaction(
                        GapInitiatePayment(
                            amount = amount,
                            type = type,
                            orderId = orderId,
                            currency = android.icu.util.Currency.fromJavaCurrency(Currency.getInstance("SEK"))
                        )
                    ).await() // Await the deferred result
                }

                // Back on the main thread for UI updates
                result.fold(
                    { error ->
                        logError("Transaction failed to start: ${error.explainError()}")

                    },
                    { paymentId ->
                        logInfo("Transaction started successfully with payment ID: $paymentId")

                    }
                )
            } catch (e: Exception) {
                logError("Error starting transaction: ${e.message}")

            }
        }

```

## 7. Transaction events

During a transaction, you'll receive these events.

```kotlin
private fun handleTransactionEvents(event: GapPublicEvent) {
    when (event) {
        GapPublicEvent.TRANSACTION_STARTED -> {
            // Transaction started successfully
        }
        GapPublicEvent.PRESENT_CARD -> {
            // Show "Present card" UI
        }
        GapPublicEvent.HOLD_CARD -> {
            // Show "Hold card still" UI
        }
        GapPublicEvent.TRANSACTION_PRESENT_CARD -> {
            // Card presented
        }
        GapPublicEvent.TRY_ANOTHER_CARD -> {
            // Show "Try another card" UI
        }
        GapPublicEvent.REMOVE_CARD -> {
            // Show "Remove card" UI
        }
        GapPublicEvent.CARD_READ -> {
            // Card read successfully
        }
        GapPublicEvent.TRANSACTION_ENTER_PIN -> {
            // PIN screen will appear automatically
        }
        GapPublicEvent.TRANSACTION_CLEAR_DISPLAY -> {
            // PIN entry completed
        }
        GapPublicEvent.TRANSACTION_AUTHORIZING -> {
            // Transaction being authorized
        }
        GapPublicEvent.TRANSACTION_NOT_AUTHORIZED -> {
            // Transaction not authorized
        }
        GapPublicEvent.TRANSACTION_APPROVED -> {
            // Transaction approved - show success UI
            sendCompletedEvent(paymentId, true)
        }
        GapPublicEvent.TRANSACTION_DECLINED -> {
            // Transaction declined
            sendCompletedEvent(paymentId, false)
        }
        GapPublicEvent.TRANSACTION_COMPLETED -> {
            // Transaction completed - show receipt
        }
        GapPublicEvent.TRANSACTION_CANCELLED -> {
            // Transaction cancelled
        }
    }
}

```

### Step 9: Send Completion Event

After displaying the receipt screen to the customer, notify the SDK that the transaction flow is complete. Send `true` for success or `false` for failure along with the corresponding `paymentId`.

```kotlin
  softposSDK.sendCompletedEvent(paymentId, true);

```

## 8. Error handling

| **Event/Error**                  | **Common Causes**                                              | **Handling Strategy**                                        | **Code Example**                                             |
| -------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **SDK Initialization Errors**    | Invalid credentials, network issues, missing permissions       | Check connectivity, validate credentials, retry with backoff | `softposSDK.initializeSdk()`                                 |
| **TERMINAL_CREATION_ERROR**      | Invalid merchant credentials, terminal exists, network failure | Log error, re-enable create button, check network            | `softposSDK.openTerminal().onLeft { err -> }`                |
| **TERMINAL_ACTIVATION_ERROR**    | Session timeout, invalid state, auth failure                   | Retry activation, check terminal state                       | `softposSDK.activateTerminal().fold({ error -> }, { _ -> })` |
| **TRANSACTION_FAILED**           | Invalid parameters, insufficient funds, network timeout        | Validate parameters, check readiness, retry                  | `softposSDK.startTransaction().onLeft { error -> }`          |
| **TRANSACTION_NOT_AUTHORIZED**   | Card declined, PIN incorrect, limit exceeded                   | Show specific message, allow retry                           | Event listener handles automatically                         |
| **TRANSACTION_CANCELLED**        | User cancelled, timeout, card removed                          | Clean up state, return to ready state                        | Event listener handles automatically                         |
| **TERMINAL_SESSION_TIMEOUT**     | Inactivity timeout, network loss                               | Recreate terminal, check session validity                    | Monitor `sessionActiveUntil()`                               |
| **NETWORK_DISCONNECTED**         | WiFi/mobile data loss, server unreachable                      | Queue operations, show offline status                        | Event listener monitors connectivity                         |
| **Order Creation Errors**        | API failure, invalid amount, network issues                    | Validate input, retry API call                               | `orderApiService.createOrder().onFailure { }`                |
| **Transaction Readiness Errors** | Terminal not activated, session expired                        | Check `isReadyForTransaction`, reactivate                    | `softposSDK.isReadyForTransaction.onLeft { }`                |

## 9. Production considerations

### Production SDK Requirements

1. **Google Play Services**: Must be enabled
2. **Play Integrity**: Must be enabled
3. **Application Signing**: Must match registered SHA-256 hash
4. **Debug Mode**: Must be disabled
5. **Battery Level**: Recommended above 10%
6. **Time Zone**: Must be accurate (no manual time changes)
7. **Screen Recording**: Not allowed during transactions

### Card Scheme Requirements

-   **Visa**: Display Visa logo during Visa transactions (mandatory)
-   **Mastercard**: Display Mastercard logo during Mastercard transactions (mandatory)
-   **Other Schemes**: Display appropriate logos as required.

## 10. Reference example

-   **Example TTP-SDK**: [Surfboard Android GAP Example](https://github.com/surfboardpayments/android-gap-example/blob/master/readme.md)
