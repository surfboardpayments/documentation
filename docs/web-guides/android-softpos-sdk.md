## Overview

The Surfboard Android SoftPOS SDK enables Android applications to process tap-to-pay transactions using NFC-enabled devices. It provides terminal management, transaction processing, and security -- supporting seamless integration for contactless payments.

The SDK is distributed via Surfboard-hosted Maven repositories and ships as separate debug and release variants.

> **Note:** The canonical reference implementation is the [Android GAP Example App](https://github.com/surfboardpayments/android-gap-example), which demonstrates the full integration flow.

## Prerequisites

Before starting integration, confirm you have the following:

### Development Environment

- **Android Studio** 4.1 or higher
- **Minimum SDK**: API level 29 (Android 10.0)
- **Java**: 11 or higher
- **Kotlin**: 2.0.21 or higher

### Surfboard Account & Credentials

- Registered Surfboard Partner account
- Active merchant setup with at least one store
- Surfboard-issued SoftPOS configuration values:
  - `connectionBlob` -- provided by Surfboard during onboarding
  - `tmsPublicKey` -- retrieved from the Developer Portal after registering your SDK app under **Console > SDK Apps**
- Merchant and store identifiers:
  - `merchantId`
  - `storeId`
- Access to the [Client Auth Token API](https://developers.surfboardpayments.com/references/api/client-auth-token/create-token) for obtaining bearer tokens

> **Tip:** You do not generate `connectionBlob` or `tmsPublicKey` yourself. Surfboard shares them as part of onboarding. If you are missing any values, contact Surfboard integrations support.

## SDK Setup & Installation

### 1. Add softpos.properties

Create a `softpos.properties` file in your Android project root (same level as `settings.gradle.kts`):

```properties
softpos1.mavenurl = MAVEN_URL1
softpos1.mavenusername = MAVEN_USERNAME1
softpos1.mavenpassword = MAVEN_PASSWORD1

softpos2.mavenurl = MAVEN_URL2
softpos2.mavenusername = MAVEN_USERNAME2
softpos2.mavenpassword = MAVEN_PASSWORD2
```

Add it to `.gitignore`:

```text
softpos.properties
```

### 2. Configure Gradle Repositories

In your root `build.gradle.kts`, load the properties and configure repositories:

```kotlin
import java.util.Properties
import java.io.FileInputStream

val localProperties = Properties()
val localPropertiesFile = rootProject.file("softpos.properties")

if (localPropertiesFile.exists()) {
    localProperties.load(FileInputStream(localPropertiesFile))
}

allprojects {
    repositories {
        google()
        mavenCentral()
        mavenLocal()

        maven {
            url = uri(localProperties.getProperty("softpos1.mavenurl"))
            credentials {
                username = localProperties.getProperty("softpos1.mavenusername")
                password = localProperties.getProperty("softpos1.mavenpassword")
            }
        }

        maven {
            url = uri(localProperties.getProperty("softpos2.mavenurl"))
            credentials {
                username = localProperties.getProperty("softpos2.mavenusername")
                password = localProperties.getProperty("softpos2.mavenpassword")
            }
            authentication {
                create<BasicAuthentication>("basic")
            }
        }
    }
}
```

### 3. Add Dependencies

In `gradle/libs.versions.toml`:

```toml
[versions]
softposSDK = "1.1.4"

[libraries]
softposSDKDebug = { module = "com.surfboardpayments:gapsdk-debug", version.ref = "softposSDK" }
softposSDKRelease = { module = "com.surfboardpayments:gapsdk", version.ref = "softposSDK" }
```

In `app/build.gradle.kts`:

```kotlin
dependencies {
    debugImplementation(libs.softposSDKDebug)
    releaseImplementation(libs.softposSDKRelease)
}
```

### 4. App Module Configuration

```kotlin
android {
    compileSdk = 35

    defaultConfig {
        applicationId = "com.your.app.id"
        minSdk = 29
        targetSdk = 35
        multiDexEnabled = true
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }

    kotlinOptions {
        jvmTarget = "11"
    }
}
```

### 5. Android Manifest

Add the required permissions and features to `AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-feature android:name="android.hardware.nfc" android:required="true"/>

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.NFC" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.CAMERA"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.VIBRATE" />
</manifest>
```

### 6. Verify Installation

```kotlin
import com.surfboardpayments.gapsdk.Gap
// If this import compiles without errors, the SDK is properly installed
```

## Credentials & SDK Initialization

### 1. Create Logger

The SDK requires a logger implementation:

```kotlin
class AppLogger : GapLogger() {
    override fun addDebugLog(log: String) {
        Log.d("SoftPOS", log)
    }

    override fun addErrorLog(log: String) {
        Log.e("SoftPOS", log)
    }

    override fun addLog(log: String) {
        Log.i("SoftPOS", log)
    }
}
```

### 2. Create SDK Instance

```kotlin
val softposSDK = Gap(
    logger = AppLogger(),
    gapCredentials = GapCredentials(
        connectionBlob = BuildConfig.connectionBlob,
        versionNumber = "YOUR_APP_VERSION",
        tmsPublicKey = "YOUR_TMS_PUBLIC_KEY",
        merchantId = BuildConfig.merchantId,
        storeId = BuildConfig.storeId,
        applicationBundleId = "YOUR_BUNDLE_ID"
    ),
    context = applicationContext
)
```

### 3. Set Authentication Token

Set the bearer token before any SDK operations. Tokens are fetched from your backend, which calls the [Client Auth Token API](https://developers.surfboardpayments.com/references/api/client-auth-token/create-token):

```kotlin
val bearerToken = fetchTokenFromBackend()
softposSDK.setAuthToken(bearerToken)
```

> **Warning:** Bearer tokens expire every 60 minutes. Implement automatic refresh. Never generate tokens on the device -- always fetch them from your backend.

### 4. Subscribe to Events

```kotlin
softposSDK.subscribeToPublicEvents { wrapper ->
    when (wrapper.event) {
        GapPublicEvent.INITIALIZED -> { /* SDK ready */ }
        GapPublicEvent.TRANSACTION_APPROVED -> { /* Payment approved */ }
        GapPublicEvent.TRANSACTION_DECLINED -> { /* Payment declined */ }
        // Handle other events
    }
}
```

## Terminal Lifecycle & Payment Flow

### Step 1: Register Terminal

One-time operation per device. Returns a `terminalId` used for creating orders:

```kotlin
val result = softposSDK.registerTerminal().await()
result.fold(
    { error -> Log.e("SoftPOS", "Registration failed: ${error.explainError()}") },
    { terminalId -> Log.i("SoftPOS", "Terminal registered: $terminalId") }
)
```

### Step 2: Initialize SDK

```kotlin
softposSDK.initializeGapSDK()
// Wait for INITIALIZED event
```

### Step 3: Fetch Prerequisites (First Run Only)

Downloads merchant branding, EMV configs, and currency data:

```kotlin
softposSDK.fetchPrerequisites()
```

> **Note:** Only required on first run. Skip on subsequent launches unless you change environment or credentials.

### Step 4: Open Terminal Session

Call every time the app comes to the foreground:

```kotlin
softposSDK.openTerminal().onRight { _ ->
    Log.i("SoftPOS", "Terminal session opened")
}
```

### Step 5: Prepare for Transaction

Prepares transaction keys. Valid for 120 seconds -- call right before starting a payment:

```kotlin
val result = softposSDK.getReadyForTransaction().await()
```

### Step 6: Create Order

Create an order via the [Surfboard Orders API](https://developers.surfboardpayments.com/api/orders) from your backend. Pass the amount in minor units, the ISO numeric currency code, and the `terminalId`.

### Step 7: Start Transaction

```kotlin
val result = softposSDK.startTransaction(
    GapInitiatePayment(
        amount = amountInMinorUnits,
        type = "PURCHASE",
        orderId = orderId,
        currency = Currency.getInstance("SEK")
    )
).await()

result.fold(
    { error -> Log.e("SoftPOS", "Transaction failed: ${error.explainError()}") },
    { paymentId -> Log.i("SoftPOS", "Transaction started: $paymentId") }
)
```

## Transaction Events

During a transaction, handle these events to drive your UI:

```kotlin
when (event) {
    GapPublicEvent.TRANSACTION_STARTED -> { /* Show payment UI */ }
    GapPublicEvent.PRESENT_CARD -> { /* "Tap your card" */ }
    GapPublicEvent.HOLD_CARD -> { /* "Hold card still" */ }
    GapPublicEvent.CARD_READ -> { /* Card read successfully */ }
    GapPublicEvent.TRANSACTION_ENTER_PIN -> { /* PIN screen appears */ }
    GapPublicEvent.TRANSACTION_AUTHORIZING -> { /* Processing */ }
    GapPublicEvent.TRANSACTION_APPROVED -> { /* Show success */ }
    GapPublicEvent.TRANSACTION_DECLINED -> { /* Show declined */ }
    GapPublicEvent.TRANSACTION_COMPLETED -> { /* Show receipt */ }
    GapPublicEvent.TRANSACTION_CANCELLED -> { /* Clean up */ }
}
```

After displaying the receipt, notify the SDK:

```kotlin
softposSDK.sendCompletedEvent(paymentId, true)
```

## Production Requirements

Before releasing your app:

1. **Google Play Services** must be enabled
2. **Play Integrity** must be enabled
3. **Application signing** must match the registered SHA-256 hash
4. **Debug mode** must be disabled
5. **Card scheme logos** must be displayed during transactions (Visa, Mastercard)
6. **Battery level** recommended above 10%
7. **Screen recording** not allowed during transactions

## Reference

- [Android GAP Example App](https://github.com/surfboardpayments/android-gap-example)
- [Client Auth Token API](https://developers.surfboardpayments.com/references/api/client-auth-token/create-token)
- [Orders API](https://developers.surfboardpayments.com/api/orders)