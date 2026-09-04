# Inter-App Integration

Integrate your POS app with CheckoutX using native app switch. Register terminals, process payments, and scan NFC tags through a bi-directional deep link flow -- from a native app or a browser-based POS.

Source: https://www.surfboardpayments.com/developers/guides/interapp-integration
Category: in-store
Tags: In-Store, Android, iOS, Web, CheckoutX, App Switch

---
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

### Browser-based POS

A web app has no scheme of its own to register. The switch out to CheckoutX works the same way, but the return needs a redirect URL that names the operator's browser -- see [Browser-Based POS (Web Apps)](#browser-based-pos-web-apps).

## Configure Terminal Before Payment

Before the first payment (especially after a device reboot), call the configuration route to prepare CheckoutX:

```
checkoutx://com.surfboard.checkoutx/configure?redirectUrl=REDIRECT_URL
```

Replace `REDIRECT_URL` with your base64-encoded app URL. CheckoutX will open, configure itself, and return with `isConfigured: true` when ready.

Use this step before starting the payment flow for optimal performance on the first transaction.

### Handling `PS_0025`, Terminal Not Connected

When initiating a payment you may occasionally see:

```
PS_0025: Terminal is not connected to server so unable to send transactions
```

Run the configure call again and then re-initiate the payment. You can do this seamlessly on your end, the transaction may be slightly slower, but this is the easiest way to recover, and no user action is needed. This is most common in SoftPOS setups where consumer devices can go idle or lose their server session between transactions; re-configuring re-establishes the connection before the next payment.

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
POST /orders
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
- `REQUIRED_DATA` -- base64-encoded JSON containing the terminal ID and the `interAppJWToken`:

```json
{
  "terminalId": "YOUR_TERMINAL_ID",
  "interAppJWToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

> **Required on both Android and iOS:** Include the `interAppJWToken` -- the `interAppJWT` value returned in the order response -- in the data parameter on every app switch transaction. This is required for the app switch flow on both platforms, not an iOS-only step.

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
GET /orders/:orderId/status
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

```js
// JavaScript -- URL-safe base64, no padding
const encoded = btoa(url).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
```

For a browser-based POS the redirect URL names the operator's browser instead of your app -- see [Browser-Based POS (Web Apps)](#browser-based-pos-web-apps).

## Browser-Based POS (Web Apps)

If your POS runs in a browser rather than as an installed app -- a web POS on an Android tablet, for instance -- the switch **out** to CheckoutX works exactly as described above. A `checkoutx://` deep link is just a link, and the browser hands it to CheckoutX.

The difference is the way **back**. A web app has no custom scheme to register, and an `https://` redirect URL does not return the operator to their browser: CheckoutX opens it in its own in-app browser, leaving the POS session behind in a tab nobody is looking at.

### Launching CheckoutX from a page

Build and encode the deep link exactly as elsewhere in this guide, then follow it:

```js
const deepLink =
  `checkoutx://com.surfboard.checkoutx/transaction` +
  `?redirectUrl=${encodedRedirectUrl}&data=${encodedData}`;

// A temporary anchor click is more reliable than assigning window.location,
// which some in-app browsers and webviews intercept
const a = document.createElement("a");
a.href = deepLink;
a.style.display = "none";
document.body.appendChild(a);
a.click();
setTimeout(() => a.remove(), 100);
```

### Returning to the browser

Point the redirect URL at the **browser**, not at a page. On Android Chrome:

```
googlechrome://com.android.chrome
```

Base64-encode it like any other redirect URL. Chrome comes to the front on the tab the flow started in -- nothing is navigated and nothing reloads, so the POS keeps its state.

If the return has to land on a specific page instead:

```
googlechrome://navigate?url=<percent-encoded https URL>
```

This works too, but opens a **new tab** on every return and leaves the original behind. Prefer the first form unless a specific landing URL is essential.

> A `?url=` parameter on the first form is silently dropped -- `com.android.chrome` is a host Chrome ignores rather than a navigate endpoint. There is no same-tab-with-landing-URL variant.

### The return carries no data

Because the redirect names a browser rather than a URL, nothing comes back in it -- no `data` parameter to decode. That is not a limitation to work around: the API is the source of truth for the result in every flow, and a browser POS simply leans on it entirely.

- **Payment:** poll `GET /orders/:orderId/status` until it reaches a terminal state.
- **Registration:** poll `GET /merchants/:merchantId/stores/:storeId/terminals/interapp/:interappCode` until `registrationStatus` is `REGISTERED`, then store the returned `terminalId`.

Since the tab is never reloaded, becoming visible again is the signal that the operator is back:

```js
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && pendingOrderId) {
    checkOrderStatus(pendingOrderId); // re-check immediately, then keep polling
  }
});
```

Persist the pending `orderId` (and the registration code) in `localStorage` as well. The tab is not reloaded on the way back with the redirect above, but it can still be evicted while backgrounded, and the `navigate` form reloads by design.

### Other browsers

The mechanism is not Chrome-specific: **any browser that registers a launch scheme can be named in the redirect URL the same way.** Chrome on Android is simply the combination we verified end to end.

| Redirect URL | Behaviour |
|---|---|
| `googlechrome://com.android.chrome` | Chrome to the front, original tab, no reload -- verified on an Android tablet |
| `googlechrome://navigate?url=<encoded>` | Chrome opens the given URL in a new tab -- verified |
| Another browser's scheme | Same shape, verify per browser |

To check what a given browser answers to on your target device:

```
adb shell am start -a android.intent.action.VIEW -d "<scheme>://"
```

If the browser comes to the front, that scheme works as a redirect URL. Confirm on the device and browser your merchants actually use -- schemes differ between browsers and vendors, and some register none at all. Where a browser registers nothing, the flows still complete: polling reports the result, and the operator returns to the browser manually.

### What does not work from a browser

Measured against CheckoutX on Android, so you do not have to retry them:

| Redirect URL | Result |
|---|---|
| `intent://…#Intent;package=com.android.chrome;end` | No return at all, with or without `action=` and extras -- the redirect is not parsed as an intent URI |
| `https://your-pos.example.com/...` | Opens in CheckoutX's in-app browser rather than the operator's browser |
| An `https://` page that re-launches an `intent://` URI | Ignored as well -- the in-app browser does not follow it |

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
