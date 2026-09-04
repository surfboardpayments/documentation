# CheckoutX SoftPOS

Accept in-person payments on smartphones and tablets by pairing the CheckoutX app with your own POS app, a dual-app setup that requires no SDK integration.

Source: https://www.surfboardpayments.com/developers/guides/checkoutx-softpos
Category: in-store
Tags: In-Store, Android, iOS, CheckoutX, SoftPOS, App Switch

---
## Overview

CheckoutX SoftPOS is the fastest way to accept in-person payments on a smartphone or tablet without integrating an SDK. You install the CheckoutX app alongside your own POS app on the same device, and your app hands off transactions to CheckoutX through a native app switch.

Use this setup when you want contactless acceptance on consumer hardware but don't want to embed and maintain a SoftPOS SDK inside your own app.

## Two Ways to Accept Payments on Phones

Surfboard gives you two routes for in-person payments on iOS and Android. Pick the one that fits your product:

| Option | What you do | When to pick it |
|--------|-------------|-----------------|
| **[Tap to Pay on iPhone SDK](/developers/guides/tap-to-pay-iphone)** / **[Android SoftPOS SDK](/developers/guides/android-softpos-sdk)** | Embed the Surfboard SoftPOS SDK directly inside your own app | You want a single, branded app with full control over the checkout UX |
| **CheckoutX SoftPOS (this guide)** | Install the CheckoutX app next to your POS app and use [Inter-App Integration](/developers/guides/interapp-integration) to hand off transactions | You want to ship faster, avoid SDK maintenance, or already have a working POS app |

Both approaches run on the same Surfboard platform, the difference is only where the payment UI lives.

## How It Works

1. **Install CheckoutX** from the App Store (iOS) or Google Play (Android) on the device running your POS app.
2. **Register CheckoutX** as a terminal once per device using the Inter-App flow.
3. **Initiate a payment** from your POS app, CheckoutX opens, accepts the tap, and returns the result to your app.

The underlying registration, payment, and tag-scanning flows are all documented in the [Inter-App Integration guide](/developers/guides/interapp-integration). CheckoutX SoftPOS is simply that flow running on a consumer phone or tablet instead of a dedicated terminal.

## Setup

1. **Get a Surfboard account** and register a store under your merchant.
2. **Download CheckoutX** on the target device.
3. **Follow [Inter-App Integration](/developers/guides/interapp-integration)** for terminal registration, payment, and tag-scanning deep link flows. The same API contract applies whether CheckoutX runs on a Surfboard terminal or on a phone in SoftPOS mode.

## The Configure Call

Before the first payment, and whenever the device has been idle, rebooted, or has lost its server session, call CheckoutX's configure route to prepare the terminal:

```
checkoutx://com.surfboard.checkoutx/configure?redirectUrl=REDIRECT_URL
```

Replace `REDIRECT_URL` with your base64-encoded app URL. CheckoutX opens, establishes its connection to the Surfboard server, and returns to your app with `isConfigured: true` when ready.

Running configure before the first transaction of a session gives the smoothest first-payment experience. See [Configure Terminal Before Payment](/developers/guides/interapp-integration#configure-terminal-before-payment) in the Inter-App guide for full details.

## Handling `PS_0025`, Terminal Not Connected

When you initiate a payment on SoftPOS, you may occasionally see:

```
PS_0025: Terminal is not connected to server so unable to send transactions
```

In these cases, run the configure call again and then re-initiate the payment. You can do this seamlessly on your end, the transaction may be slightly slower, but this is the easiest way to recover. No user action is needed.

This is specific to SoftPOS because consumer devices can go idle or lose their session to the server between transactions; a re-configure re-establishes the connection before the next payment.

## Reference

- [Inter-App Integration](/developers/guides/interapp-integration), full deep link flow
- [Tap to Pay on iPhone SDK](/developers/guides/tap-to-pay-iphone), iOS SDK alternative
- [Android SoftPOS SDK](/developers/guides/android-softpos-sdk), Android SDK alternative
