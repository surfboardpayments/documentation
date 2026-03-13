## Overview

Surfboard's CheckoutX app handles payment acceptance on Android payment terminals and as a SoftPOS solution. If you have your own POS or business app, you can integrate with CheckoutX through **native app switch** -- your app opens CheckoutX to process a payment, and CheckoutX returns control to your app when done.

This guide covers terminal registration, the payment flow, and NFC tag scanning -- all through deep links.

> **Important:** Surfboard terminals operate in full online mode. All data exchange happens through APIs and deep link parameters -- no offline data passing is supported.

## How It Works

The inter-app flow is a bi-directional app switch:

1. **Your app -> CheckoutX** -- initiate a task (registration, payment, or tag scan)
2. **CheckoutX -> Your app** -- return the result via your redirect URL

There are three flows:

| Flow | Purpose | Frequency |
|------|---------|-----------|
| **Terminal Registration** | Link CheckoutX to a terminal | Once per device |
| **Payment** | Process a payment via CheckoutX | Every transaction |
| **Tag Scanning** | Read NFC product tags | As needed |

## Setting Up Your App for App Switch

Configure your app to receive the callback from CheckoutX after a task completes.

### Android

Register a deep link intent filter in your `AndroidManifest.xml`:

```xml
<activity android:name=".YourActivity">
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="posapp" android:host="hello" />
  </intent-filter>
</activity>
```

### iOS

Register a custom URL scheme in your `Info.plist` or Xcode project settings. Add your scheme (e.g., `posapp`) under **URL Types**.

## Configure Terminal Before Payment

Before the first payment (especially after a device reboot), call the configuration route to prepare CheckoutX:

```
checkoutx://com.surfboard.checkoutx/configure?redirectUrl=REDIRECT_URL
```

Replace `REDIRECT_URL` with your base64-encoded app URL. CheckoutX will open, configure itself, and return with `isConfigured: true` when ready.

Use this step before starting the payment flow for optimal performance on the first transaction.

## Terminal Registration (One-Time Setup)

Register a terminal with CheckoutX once per device. This links your Surfboard terminal to the CheckoutX app.

### Step 1: Get an Interapp Code

Call the API to generate a registration code:

```json
GET /merchants/:merchantId/stores/:storeId/terminals/interapp
```

```json
// Response
{
  "status": "SUCCESS",
  "data": {
    "registrationCode": "abc123..."
  },
  "message": "Interapp code generated successfully"
}
```

> The registration code is valid for **120 seconds**. Complete the app switch before it expires.

### Step 2: App Switch to Register

Build the registration deep link with the code:

```
checkoutx://com.surfboard.checkoutx/register?redirectUrl=REDIRECT_URL&data=REGISTRATION_CODE
```

- `REDIRECT_URL` -- your base64-encoded app callback URL
- `REGISTRATION_CODE` -- base64-encoded JSON: `{"registrationCode": "GENERATED_CODE"}`

### Step 3: Handle the Callback

After registration, CheckoutX calls your redirect URL with a `data` query parameter containing the `terminalId`:

```
posapp://hello/order?orderRef=...&data=<base64_encoded_data>
```

Decode the base64 `data` parameter to get the terminal ID:

```kotlin
// Kotlin
val data = String(Base64.getUrlDecoder().decode(uri.getQueryParameter("data")))
val jsonObject = serializer.fromJson(data, JsonObject::class.java)
val terminalId = jsonObject["terminalId"].asString
```

```swift
// Swift
guard let base64String = URLComponents(url: url, resolvingAgainstBaseURL: false)?
    .queryItems?.first(where: { $0.name == "data" })?.value,
    let jsonData = Data(base64Encoded: base64String),
    let json = try? JSONSerialization.jsonObject(with: jsonData) as? [String: Any],
    let terminalId = json["terminalId"] as? String
else { return }
```

Store the `terminalId` -- you need it for all future payments on this device.

### Step 4: Verify Registration

Confirm the registration status via API:

```json
GET /merchants/:merchantId/stores/:storeId/terminals/interapp/:interappCode
```

```json
// Response
{
  "status": "SUCCESS",
  "data": {
    "registrationStatus": "REGISTERED",
    "terminalId": "83abab731f6fb00704"
  }
}
```

**Possible `registrationStatus` values:** `REGISTERED` | `NOT_REGISTERED`

## Payment Flow

Once the terminal is registered, process payments through app switch.

### Step 1: Create an Order via API

Create an order using the [Create Order API](/developers/guides/create-an-order) with the `terminalId` from registration. The response includes a `paymentId` and an `interAppJWT`:

```json
POST /merchants/:merchantId/orders
{
  "terminal$id": "YOUR_TERMINAL_ID",
  "orderLines": [
    {
      "id": "ITEM-001",
      "name": "Running Shoes",
      "quantity": 1,
      "amount": { "regular": 50000, "total": 50000, "currency": "752" }
    }
  ],
  "totalOrderAmount": { "regular": 50000, "total": 50000, "currency": "752" },
  "controlFunctions": {
    "initiatePaymentsOptions": { "paymentMethod": "CARD" }
  }
}
```

```json
// Response
{
  "status": "SUCCESS",
  "data": {
    "orderId": "83a1ba32774149710b",
    "paymentId": "83a1ba3264bd500106",
    "interAppJWT": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Step 2: App Switch to CheckoutX

Build the transaction deep link:

```
checkoutx://com.surfboard.checkoutx/transaction?redirectUrl=REDIRECT_URL&data=REQUIRED_DATA
```

- `REDIRECT_URL` -- your base64-encoded callback URL
- `REQUIRED_DATA` -- base64-encoded JSON containing the terminal ID:

```json
{ "terminalId": "YOUR_TERMINAL_ID" }
```

#### iOS Performance Optimization

On iOS, include the `interAppJWT` from the order response in the data parameter for faster payment initiation:

```json
{ "interAppJWToken": "eyJhbGciOiJIUzI1NiIs..." }
```

### Step 3: Perform the App Switch

```kotlin
// Kotlin
val url = "checkoutx://com.surfboard.checkoutx/transaction?redirectUrl=$encodedRedirectUrl&data=$encodedData"
val intent = Intent(Intent.ACTION_VIEW)
intent.data = Uri.parse(url)
startActivity(intent)
```

```swift
// Swift
let url = "checkoutx://com.surfboard.checkoutx/transaction?redirectUrl=\(encodedRedirectUrl)&data=\(encodedData)"
if let deepLink = URL(string: url) {
    UIApplication.shared.open(deepLink)
}
```

```dart
// Flutter
String url = "checkoutx://com.surfboard.checkoutx/transaction?redirectUrl=$encodedRedirectUrl&data=$encodedData";
Uri uri = Uri.parse(url);
if (await canLaunchUrl(uri)) {
    await launchUrl(uri);
}
```

### Step 4: Handle the Result

CheckoutX calls your redirect URL with the result. Check the order status via API to confirm payment completion:

```json
GET /merchants/:merchantId/orders/:orderId/status
```

## Framing the Redirect URL

The redirect URL follows the format:

```
<YOUR_SCHEME>://<YOUR_HOST>/<ROUTES>?<QUERY_PARAMS>
```

For example, if your scheme is `posapp` and host is `hello`:

```
posapp://hello/order?orderRef=6ba7b7db-519f-4ed9-9f6b-a834140466f7
```

This URL must be **base64-encoded** before passing it as the `redirectUrl` parameter:

```kotlin
// Kotlin
val url = "posapp://hello/order?orderRef=6ba7b7db-519f-4ed9-9f6b-a834140466f7"
val encoded = Base64.getUrlEncoder().encodeToString(url.toByteArray())
```

```swift
// Swift
let url = "posapp://hello/order?orderRef=6ba7b7db-519f-4ed9-9f6b-a834140466f7"
let encoded = Data(url.utf8).base64EncodedString()
```

## NFC Tag Scanning

Scan product NFC tags through CheckoutX before or during a sale:

```
checkoutx://com.surfboard.checkoutx/scanProducts?redirectUrl=REDIRECT_URL&data=REQUIRED_DATA
```

The `REQUIRED_DATA` is a base64-encoded JSON specifying the read mode:

```json
{ "readMode": "SINGLE" }
```

| Read Mode | Description |
|-----------|-------------|
| `SINGLE` | Scan one product tag |
| `MULTIPLE_EDITABLE` | Scan multiple tags, allow editing scanned data |
| `MULTIPLE_NONEDITABLE` | Scan multiple tags, no editing allowed |

The redirect URL and app switch mechanics are identical to the payment flow.

## Example Repositories

- [Android Example App (Kotlin)](https://github.com/surfboardpayments/surfboard-interapp-kotlin-simple)

## Reference

- [Terminals API](https://developers.surfboardpayments.com/api/terminals)
- [Create an Order](/developers/guides/create-an-order)
- [Tap to Pay on iPhone](/developers/guides/tap-to-pay-iphone)
- [NFC Tag Reading](/developers/guides/nfc-tag-reading)
- [Developer Portal](https://developers.surfboardpayments.com/)