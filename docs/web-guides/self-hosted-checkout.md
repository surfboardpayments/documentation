## Overview

The Self-Hosted Checkout (Online SDK) lets you embed payment fields directly in your website while Surfboard handles PCI compliance and payment processing. You get full control over the look and feel of your checkout page.

Surfboard renders secure input fields inside your page using the Online SDK. You control the layout, branding, and customer experience.

## Prerequisites

1. Create a developer account at the [Developer Portal](https://developers.surfboardpayments.com/sign-up)
2. Complete onboarding (merchant and store setup)
3. Register a terminal with the type set to **SelfHostedPage**
4. Note the terminal's `publicKey` from the registration response

> **Tip:** You can retrieve the terminal's public key later using the [Fetch Terminal by ID API](https://developers.surfboardpayments.com/api/terminals). It is returned as `terminalPublicKey` in the response.

## Initializing the SDK

To initialize the SDK, you need three parameters:

1. **`publicKey`** -- From terminal registration
2. **`orderId`** -- From the [Create Order API](https://developers.surfboardpayments.com/api/orders) response
3. **`nonce`** -- From the Create Order response (serves as access control)

```javascript
// Set up error handling
SurfboardOnlineSDK.errorCallback((code, message) => {
    console.error(`Error [${code}]: ${message}`);
});

// Listen for payment status changes
SurfboardOnlineSDK.paymentStatusCallback = function (data) {
    // data.paymentStatus: 'PAYMENT_INITIATED' | 'PAYMENT_COMPLETED' |
    //   'PAYMENT_CANCELLED' | 'PAYMENT_FAILED' | 'PAYMENT_PROCESSING'
    console.log("Payment status:", data.paymentStatus);
};

// Initialize
SurfboardOnlineSDK.initialiseOnlineSDK({
    publicKey: "YOUR_PUBLIC_KEY",
    orderId: "YOUR_ORDER_ID",
    nonce: "YOUR_NONCE",
});
```

To re-initialize for a different order without a full page reload:

```javascript
SurfboardOnlineSDK.remountOnlineSDK({
    publicKey: "YOUR_PUBLIC_KEY",
    orderId: "NEW_ORDER_ID",
    nonce: "NEW_NONCE",
});
```

### Error Codes

| Error Code | Message | Category |
|------------|---------|----------|
| -- | Surfboard SDK cannot function in the given environment | FATAL |
| -- | Surfboard SDK initialisation failed | FATAL |
| -- | Public key validation failed | FATAL |
| -- | Invalid Order ID | FATAL |
| -- | Invalid Nonce | FATAL |
| 401 | Invalid or Expired Link | FATAL |

## Available Data Objects

After successful initialization, the SDK exposes data objects on `SurfboardOnlineSDK`:

- **`order`** -- Order details, line items, and payment methods
- **`merchant`** -- Merchant name and organization number
- **`branding`** -- Colors, fonts, logos for your checkout styling
- **`store`** -- Store contact info, privacy policy, and terms URLs
- **`paymentMethods`** -- Supported payment methods for this terminal
- **`customer`** -- Customer details, saved cards, and addresses

> **Warning:** You are required to display the store contact information, privacy policy, and terms and conditions on your payment page.

## Payment Flow

### Updating Customer Information

Most payment methods require customer information. Provide it via the SDK or include it when creating the order.

| Payment Method | Required Fields |
|----------------|----------------|
| Card | Email, Phone, Address |
| Klarna | Email, Phone, Address, Shipping Address (physical goods) |
| Apple Pay | Email, Name, Phone, Postal Address |

```javascript
await SurfboardOnlineSDK.order.addCustomerInformation({
    name: "Jane Doe",
    email: "jane@example.com",
    phone: { countryCode: "+46", number: "701234567" },
    billingAddress: {
        addressLine1: "Main Street 1",
        city: "Stockholm",
        postalCode: "11122",
        countryCode: "SE",
    },
});
```

> **Tip:** Include the customer address in the Create Order API request when you have it. This pre-fills the address so the customer does not need to enter it manually.

### Card Payments

Mount the card input fields in your page:

```html
<div id="card-details"></div>
```

```javascript
SurfboardOnlineSDK.mount({
    mountCardWidget: "card-details",
});

// When the customer clicks "Pay":
await SurfboardOnlineSDK.order.initiatePayments("CARD");
```

### Swish Payments

```javascript
const paymentAttempt = await SurfboardOnlineSDK.order.initiatePayments("NSWISH");

// For mobile: redirect to Swish app
const redirectUrl = paymentAttempt.getSwishAppRedirectUrl("https://your-site.com/callback");

// For web: display QR code
const qrData = paymentAttempt.getSwishQRData;
```

### Apple Pay

```html
<div id="apple-pay"></div>
```

```javascript
SurfboardOnlineSDK.mount({
    mountApplePayWidget: "apple-pay",
});
// Payment is initiated automatically when the customer clicks the Apple Pay button
```

For Apple Pay, you must host the domain association file at `/.well-known/apple-developer-merchantid-domain-association` on your domain.

### Klarna

```javascript
await SurfboardOnlineSDK.order.addCustomerInformation({
    phone: { countryCode: "+46", number: "701234567" },
    name: "Jane Doe",
    email: "jane@example.com",
    billingAddress: {
        city: "Stockholm",
        postalCode: "11122",
        countryCode: "SE",
        addressLine1: "Main Street 1",
    },
});

await SurfboardOnlineSDK.order.initiatePayments("KLARNA");
```

## Payment Error Codes

| Code | Message | Category |
|------|---------|----------|
| ON_009 | Phone number required for Swish payment | Non Fatal |
| ON_010 | Payment method not supported for this order | Non Fatal |
| ON_011 | Payment already completed | Non Fatal |
| ON_012 | Error initiating payment -- retry | Non Fatal |
| ON_013 | Unknown error -- page reload may help | Non Fatal |
| ON_016 | Invalid card details | Non Fatal |
| ON_017 | Email required for this payment | Non Fatal |
| ON_018 | Billing address required for this payment | Non Fatal |

## Reference

- [React Sample App](https://github.com/surfboardpayments/react-next-online-sdk) for a complete working example
- [Create Order API](https://developers.surfboardpayments.com/api/orders)
- [Fetch Terminal API](https://developers.surfboardpayments.com/api/terminals)
- [Developer Portal](https://developers.surfboardpayments.com/)