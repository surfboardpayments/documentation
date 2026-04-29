# Tap to Pay Apple SDK Setup and Distribution

This document explains how to install, update, and swap staging / production builds of the Surfboard Tap to Pay Apple SDK, distributed as a prebuilt `.xcframework`.

Use it together with the [Surfboard Tap to Pay on iPhone SDK Integration Guide](/guides/in-store-payments/SDKs/iOS-gap-sdk) and the shared [SoftPOS SDKs Overview](/guides/in-store-payments/SDKs/softpos-sdks-overview).

## 1. Overview

-   **Delivery format:** `tap_to_pay_apple.xcframework`
-   **Variants:**
    -   **Staging SDK** – built with `DEBUG` configuration.
    -   **Production SDK** – built with `Release` configuration.
-   **Environment selection is done by swapping the XCFramework** in your Xcode project.

The SDK internally uses `SdkConfig` to determine which AGW URL to call. Because this is resolved at SDK build time, you must use the **staging SDK binary** for staging environments and the **production SDK binary** for production.

---

## 2. Adding the SDK to Your App

### 2.1. Copy the XCFramework into your repo

1. Choose a location in your app repo to store the SDK, for example:
    - `YourApp/SDKs/tap_to_pay_apple/`
2. Copy the provided `tap_to_pay_apple.xcframework` into that folder.

### 2.2. Link the SDK in Xcode

1. Open your app project in Xcode (`.xcodeproj` or `.xcworkspace`).
2. In the **Project Navigator**, select your **app target**.
3. Go to the **General** tab.
4. Scroll to **Frameworks, Libraries, and Embedded Content**.
5. Click **“+” → “Add Other…” → “Add Files…”**.
6. Navigate to the folder where you placed `tap_to_pay_apple.xcframework` and select it.
7. When prompted for embedding, choose:
    - **“Do Not Embed”** (the SDK is provided as a static framework).

### 2.3. Verify linking

-   Confirm that `tap_to_pay_apple.xcframework` appears under **Frameworks, Libraries, and Embedded Content** for your app target.
-   Clean the build folder and build the app from Xcode.

If the app does not build, check:

-   That the XCFramework is added to the **correct target**.
-   That there are no old or conflicting references to previous versions of the SDK.

---

## 3. Using the SDK From Your Code

1. Import the SDK module in files where you use it.
2. Use the public `Gap` API surface to initialize and interact with the SDK.
3. Handle any errors and events exposed by the SDK as per the separate API reference.

(Refer to the API / usage documentation for details on initialization, event handling, and transaction flows.)

---

## 4. Updating the SDK to a New Version

When Surfboard provides a new version of the SDK (a new `tap_to_pay_apple.xcframework`):

### 4.1. Remove the old SDK reference

1. In Xcode’s **Project Navigator**, locate the existing `tap_to_pay_apple.xcframework`.
2. Right‑click it and select **Delete**.
3. Choose **“Remove Reference”** (to keep or manage the files in your repo as needed).
4. In your app target’s **General → Frameworks, Libraries, and Embedded Content**, remove any entries that reference the old framework.

### 4.2. Add the new SDK

1. Replace the old XCFramework file on disk with the newly provided one, in the same folder (for example `YourApp/SDKs/tap_to_pay_apple/`).
2. In Xcode, re‑add the framework:
    - **General → Frameworks, Libraries, and Embedded Content → “+” → “Add Other…” → “Add Files…”**.
    - Select the new `tap_to_pay_apple.xcframework`.
    - Set it to **“Do Not Embed”**.
3. Clean the build folder and rebuild the app.

If you keep multiple versions in your repo, ensure only **one** `tap_to_pay_apple.xcframework` is linked to a given target at a time.

---

## 5. Swapping Between Staging and Production SDK Builds

Surfboard can provide **two separate XCFrameworks**:

-   `tap_to_pay_apple-staging.xcframework` – built from the SDK in `DEBUG` configuration.
-   `tap_to_pay_apple-release.xcframework` – built from the SDK in `Release` configuration.

The environment your app talks to is determined entirely by **which XCFramework you link to your target**.

### 5.1. Recommended folder layout

For clarity, we recommend storing both variants in your repo using a clear structure, for example:

-   `YourApp/SDKs/tap_to_pay_apple/staging/tap_to_pay_apple.xcframework`
-   `YourApp/SDKs/tap_to_pay_apple/release/tap_to_pay_apple.xcframework`

Only one of these should be linked to a given target at any time.

### 5.2. Using the staging SDK

To have your app use the **staging** backend:

1. In Xcode, remove any existing `tap_to_pay_apple.xcframework` reference from your app target.
2. Add the **staging** framework:
    - **General → Frameworks, Libraries, and Embedded Content → “+” → “Add Other…” → “Add Files…”**.
    - Select `SDKs/tap_to_pay_apple/staging/tap_to_pay_apple.xcframework`.
    - Set to **“Do Not Embed”**.
3. Clean the build folder and rebuild.
4. The SDK will internally use the staging configuration (e.g. staging AGW URL) baked into that binary.

### 5.3. Using the production SDK

To have your app use the **production** backend:

1. Remove the staging framework reference from the target (if linked).
2. Add the **production** framework:
    - **General → Frameworks, Libraries, and Embedded Content → “+” → “Add Other…” → “Add Files…”**.
    - Select `SDKs/tap_to_pay_apple/release/tap_to_pay_apple.xcframework`.
    - Set to **“Do Not Embed”**.
3. Clean the build folder and rebuild.
4. The SDK will internally use the production configuration baked into that binary.

### 5.4. Optional: separate app targets for staging and production

If you want your project to have both a staging app and a production app side by side, you can create two targets:

-   **`YourApp-Staging` target**:
    -   Links `SDKs/tap_to_pay_apple/staging/tap_to_pay_apple.xcframework`.
    -   May use a staging bundle identifier and app name.
-   **`YourApp-Production` target**:
    -   Links `SDKs/tap_to_pay_apple/release/tap_to_pay_apple.xcframework`.
    -   Uses the production bundle identifier and app name.

This setup reduces the risk of accidentally shipping a build that uses the wrong SDK binary.

---

## 6. Release Checklist for Integrators

Before shipping an app release that uses the Tap to Pay Apple SDK, we recommend the following checks:

-   **For staging builds (internal / QA):**

    -   Confirm the app target links the **staging** XCFramework only.
    -   Run a smoke test and verify calls reach the intended staging backend.

-   **For production builds:**
    -   Confirm the app target links the **production** XCFramework only.
    -   Confirm there are no remaining references to the staging XCFramework in the project file.
    -   Perform a basic transaction flow against the production backend to verify end‑to‑end behavior.

If you encounter build or integration issues that are not covered here, please reach out to Surfboard with:

-   Xcode version,
-   iOS deployment target,
-   Exact error message from Xcode,
-   A description of your project setup (SPM/CocoaPods/manual frameworks).
