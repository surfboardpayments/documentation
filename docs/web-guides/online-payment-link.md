# Online Payment Link

Take a payment on the web without a checkout page of your own. Create an online store, verify its domains, create an order against the PaymentPage terminal it comes with, and send the customer the link it returns.

Source: https://www.surfboardpayments.com/developers/guides/online-payment-link
Category: online
Tags: Online, API, Payment Link, Payment Page, Orders

---
## Overview

An online payment link is an order created against an online terminal. The API returns a URL hosted by Surfboard; you send it to the customer by email, SMS, chat, or a redirect from your own site, and the card details never touch your infrastructure.

The order call is the same [Create Order](/developers/guides/create-an-order) call you use in store. What changes is everything around it: the terminal must be an **online** terminal, that terminal must sit in an **online store**, and the store's domains must be verified before Surfboard will approve it. This guide walks the whole path once, then covers the `controlFunctions.online` block that shapes the page the customer lands on.

If you want to render the card fields inside your own page instead of sending the customer away, use the [Self-Hosted Checkout](/developers/guides/self-hosted-checkout) guide. If you want to charge a stored card from your backend with no customer present, see [Server-to-Server API](/developers/guides/server-to-server-api).

## Prerequisites

1. A developer account at the [Developer Portal](https://developers.surfboardpayments.com/sign-up)
2. A merchant that has completed onboarding and KYB
3. Control of the DNS for the webshop domain you are going to register

> **Demo environment:** payment page mode is the only online terminal type supported in demo, and only test cards work there. Real cards used in demo are voided automatically after 30 minutes and never settle.

## Step 1: Create an Online Store

Terminals live under stores, and an online terminal needs a store that carries an `onlineInfo` block. Create the store with the webshop details, or add `onlineInfo` to an existing physical store.

```json
POST /partners/:partnerId/merchants/:merchantId/stores
{
  "storeName": "Web Store",
  "email": "webstore@example.com",
  "phoneNumber": { "code": 46, "number": "701234567" },
  "address": "Drottninggatan 10",
  "city": "Stockholm",
  "zipCode": "103 16",
  "country": "SE",
  "onlineInfo": {
    "merchantWebshopURL": "https://shop.example.com",
    "paymentPageHostURL": "https://shop.example.com/payment",
    "termsAndConditionsURL": "https://shop.example.com/terms",
    "privacyPolicyURL": "https://shop.example.com/privacy"
  }
}
```

```json
// Response
{
  "status": "SUCCESS",
  "data": {
    "storeId": "81d64e7174dcb00b0f",
    "merchantId": "818712cdbcb670070e",
    "name": "Web Store",
    "merchantUrlDomainVerificationKey": "499470649f03b53fa1175659d4389743974710260b7f410313487e6062b3d559",
    "paymentPageUrlDomainVerificationKey": "2179beab4f5e8c3960615205f042939a2ccc6c51a6e5923c9c068b3d9a645590"
  },
  "message": "Store Created Successfully"
}
```

| Field | Required | Notes |
|-------|----------|-------|
| `onlineInfo.merchantWebshopURL` | Yes | The shop the customer is buying from. Verified by DNS. |
| `onlineInfo.termsAndConditionsURL` | Yes | Must include the refund policy. Rendered on the checkout page. |
| `onlineInfo.privacyPolicyURL` | Yes | Rendered on the checkout page. |
| `onlineInfo.paymentPageHostURL` | No | Only needed for SDK and iFrame modes. Verified by DNS when present. |

> **Online info can only be set once.** Get these URLs right before you send the call; they cannot be edited afterwards through the same route.

Terms, privacy policy and contact details must also be visible on the webshop itself. This is an acquiring requirement, not a Surfboard preference.

## Step 2: Verify the Domains

The response carries one verification key per URL. Publish each as a **TXT record** on the matching domain, then ask Surfboard to check it:

```json
POST /partners/:partnerId/merchants/:merchantId/stores/:storeId/verify
{
  "domainType": "MERCHANT_WEBSHOP_URL"
}
```

Repeat with `"domainType": "PAYMENT_PAGE_HOST_URL"` if you registered a payment page host. Surfboard also re-checks automatically every six hours, so a record published late is picked up without another call.

Verification is what unlocks the online terminal types: until the webshop domain passes, there is nothing to register a terminal against. Once it passes, the store goes through an internal approval step at Surfboard. Poll the store to see where it stands:

```
GET /partners/:partnerId/merchants/:merchantId/stores/:storeId/online
```

See [Store Management](/developers/guides/store-management) for the full store lifecycle.

## Step 3: Pick Up the Terminal You Already Have

An online terminal is a mode, not a device — and for payment links you do not have to create one. Creating the online store provisions two terminals by default: a `PaymentPage` terminal, which is the one this guide uses, and a `MerchantInitiated` terminal for backend charges against a stored token. List the store's terminals and take the ID:

```
GET /partners/:partnerId/merchants/:merchantId/stores/:storeId/terminals
```

```json
// Response
{
  "status": "SUCCESS",
  "data": [
    {
      "terminalId": "813ca2cb12ce400405",
      "terminalType": "PaymentPage",
      "terminalStatus": "ACTIVE",
      "storeId": "81d64e7174dcb00b0f"
    },
    {
      "terminalId": "813ca2cb12ce400406",
      "terminalType": "MerchantInitiated",
      "terminalStatus": "ACTIVE",
      "storeId": "81d64e7174dcb00b0f"
    }
  ],
  "message": "Terminals fetched successfully"
}
```

Store the `PaymentPage` `terminalId` against something identifiable in your system — it is the `terminal$id` every order in this guide is created against.

| Mode | Use it for | Provisioned with the store |
|------|------------|----------------------------|
| `PaymentPage` | Payment links and hosted checkout. This guide. | Yes |
| `MerchantInitiated` | Backend charges against a stored token, such as subscription renewals. | Yes |
| `SelfHostedPage` | Card fields rendered on your own page by the Online SDK. Returns a `publicKey` and `sdkUrl`. | No |
| `iFrame` | An embedded payment frame inside your site. | No |

The two default terminals exist from the moment the store does, but they cannot take a payment until the domains verify and the store is approved. The other two modes are registered when you need them, and a store can hold as many as you like:

```json
POST /merchants/:merchantId/stores/:storeId/online-terminals
{
  "onlineTerminalMode": "SelfHostedPage"
}
```

```json
// Response
{
  "status": "SUCCESS",
  "data": {
    "terminalId": "813ca2cb12ce400407",
    "registrationStatus": "REGISTERED"
  },
  "message": "Terminal registered successfully"
}
```

## Step 4: Create the Order

Now the familiar call. The `terminal$id` is the `PaymentPage` terminal from step 3, and the response carries the link.

```json
POST /orders
{
  "terminal$id": "813ca2cb12ce400405",
  "referenceId": "order-2026-0418",
  "customer": {
    "person": {
      "name": { "firstName": "John", "lastName": "Doe" },
      "email": "john@example.com",
      "phoneNumber": { "code": "46", "number": "768100190" }
    }
  },
  "orderLines": [
    {
      "id": "ITEM-001",
      "name": "Annual Subscription",
      "quantity": 1,
      "amount": {
        "regular": 99900,
        "total": 99900,
        "currency": "752",
        "tax": [{ "amount": 19980, "percentage": 25, "type": "VAT" }]
      }
    }
  ],
  "totalOrderAmount": {
    "regular": 99900,
    "total": 99900,
    "currency": "752",
    "tax": [{ "amount": 19980, "percentage": 25, "type": "VAT" }]
  },
  "controlFunctions": {
    "initiatePaymentsOptions": {
      "paymentMethod": "CARD",
      "amount": 99900
    },
    "online": {
      "paymentPageValidFor": "2h",
      "enforce3DSecure": true,
      "generateShortLink": true,
      "payButtonType": "PAY",
      "redirectUrl": "https://shop.example.com/thanks",
      "failureRedirectUrl": "https://shop.example.com/checkout/failed"
    }
  }
}
```

```json
// Response
{
  "status": "SUCCESS",
  "data": {
    "orderId": "8455c12f9fd0620a010b",
    "paymentPageLink": "https://pay.withsurfboard.com/8455c12f9fd0620a010b?pi=Dr4GoyMXF0zHvjca_Oa0vHgxcT-OD1qp7KdokyI7dkTwRwYJt8nkXyQm3bT6vqCfgraOw50Bf5uOp__3ckbMWOV6L9QbiTiSEFS3YmF4Eb8lr5pTWP2KFjm9Ukmd0000&add=IzFlNDBhZg==",
    "shortLinkUrl": "https://srfb.se/Iq4JfPgHL"
  },
  "message": "Order created successfully"
}
```

`paymentPageLink` is the page to send the customer to. Treat it as opaque and pass it on whole: the query string carries the payment intent, and a link with a trimmed or re-encoded `pi` will not open. `shortLinkUrl` appears only when you asked for it with `generateShortLink`, and is the one to put in an SMS.

Keep the `orderId`. Everything afterwards is keyed on it, and unlike an in-store order there is no `paymentId` yet: nothing has been attempted until the customer opens the page. The `paymentId` arrives with the first attempt, in the status response and in the webhook.

Line items, tax, adjustments, customer objects and the order-level calculation rules all behave exactly as they do in store. [Create an Order](/developers/guides/create-an-order) covers them in full.

## Control Functions for Online Orders

Everything specific to the hosted page lives in `controlFunctions.online`.

| Field | Description |
|-------|-------------|
| `paymentPageValidFor` | How long the link works, as `<number><unit>` where the unit is `m`, `h` or `d` — for example `15m`, `2h`, `3d`. Defaults to one day. |
| `redirectUrl` | Where the customer lands after a successful payment. The `orderId` is appended as a query parameter. |
| `failureRedirectUrl` | Where the customer lands after a failure. Also carries the `orderId`. |
| `generateShortLink` | Returns `shortLinkUrl` alongside the full link. Default `false`. |
| `payButtonType` | The label on the button: `PAY`, `DONATE`, `BOOK`, `ORDER`, `CHECKOUT`, `CONTINUE`, `CONTRIBUTE`, `ADD_MONEY`, `RENT`, `SUPPORT`, `TIP`, `TOP_UP`. |
| `enforce3DSecure` | Force 3-D Secure where the issuer supports it. |
| `relaxed3ds` | Allow relaxed 3-D Secure handling. |
| `addressRequirements` | Ask for an address on the page. |
| `enforceTokenization` | Save the card for later use, overriding the terminal configuration. |
| `tokenisationIfPossible` | Tokenize when supported, but do not fail the payment if it is not. |
| `errorIfTokenizationFails` | Fail the flow when the card cannot be tokenized. |
| `subscription` | Mark the order as recurring-capable. |
| `generateOnlineLinkWith` | Generate the link with a different terminal than the one the order was created against. |
| `selfCardCharging` | Let the customer charge their own card. |

These sit next to the order-level controls that are not online-specific but matter here:

| Field | Description |
|-------|-------------|
| `delayCapture` | Authorize now, capture later. See [Capture a Payment](/developers/guides/capture-a-payment). |
| `authMode` | `AUTH` or `PRE-AUTH`. Choosing `PRE-AUTH` sets `delayCapture` for you. |
| `lockToPaymentMethods` | Restrict the page to the methods you list, e.g. `["CARD", "KLARNA"]`. |
| `delayPayout` | Hold the payout for a period, as `<number><unit>`. |
| `callBackUrl` | Per-order webhook URL for this order and its payments. |

### Recurring Orders

For a subscription, add the `recurring` object inside `online` and mark the order as one:

```json
{
  "controlFunctions": {
    "online": {
      "subscription": true,
      "enforceTokenization": true,
      "recurring": {
        "subscriptionAmountType": "fixed",
        "frequency": "monthly",
        "numberOfPayments": 12,
        "uniqueReference": "sub-4471",
        "validation": "validated"
      }
    }
  }
}
```

The first payment is a customer-initiated transaction on the page, which is where the card is tokenized and 3-D Secure is satisfied. Every renewal after that is a merchant-initiated transaction against the stored token, charged from your backend through a `MerchantInitiated` terminal. [Recurring Payments](/developers/guides/recurring-payments) has the renewal side.

| Field | Description |
|-------|-------------|
| `subscriptionAmountType` | `fixed` or `variable`. |
| `maxAmount` | Ceiling in minor units, for `variable` subscriptions only. |
| `frequency` | `daily`, `twiceWeekly`, `weekly`, `tenDays`, `fortNightly`, `monthly`, `everyTwoMonths`, `trimester`, `quarterly`, `twiceYearly`, `annually`, `unscheduled`. Required. |
| `numberOfPayments` | How many payments the schedule expects. |
| `uniqueReference` | Your reference for the recurring order. |
| `validation` | `validated` or `notValidated`. |

## Step 5: Confirm the Payment

The redirect back to your site tells you the customer finished, not that the money moved. Confirm server-side, either by polling or, better, by subscribing to the webhook.

```
GET /orders/:orderId/status
```

```json
// Response
{
  "status": "SUCCESS",
  "data": {
    "orderStatus": "PAYMENT_COMPLETED",
    "payments": [
      {
        "paymentId": "83a1ba3264bd500106",
        "paymentStatus": "PAYMENT_COMPLETED",
        "paymentMethod": "CARD",
        "amount": 99900
      }
    ]
  }
}
```

The states are the same as in store. An order sits in `PENDING` while the link is unused, and a failed or cancelled payment leaves it there, so the same `orderId` can be paid again without creating a new order.

| Order status | Meaning |
|--------------|---------|
| `PENDING` | The link has not been paid yet, or the last attempt failed or was cancelled. |
| `PAYMENT_COMPLETED` | Paid in full. The order is closed. |
| `PARTIAL_PAYMENT_COMPLETED` | Part of the total is paid. See [Partial Payments](/developers/guides/partial-payments). |
| `PAYMENT_CANCELLED` | The order was cancelled. |

Subscribe to `order.paymentcompleted` and `order.paymentfailed` rather than polling on a timer. The payload carries the `orderId`, your `referenceId`, the amount and the transaction details, and each delivery carries a `metadata.eventId` you should use for idempotency — Surfboard retries a failed delivery twice, after 5 and 10 minutes.

```json
{
  "eventType": "order.paymentcompleted",
  "metadata": {
    "eventId": "831fc2f040bf405fff",
    "created": 1745821536443,
    "retryAttempt": 0,
    "terminalId": "813ca2cb12ce400405"
  },
  "data": {
    "orderId": "83a1ba32774149710b",
    "referenceId": "order-2026-0418",
    "paymentId": "83a1ba3264bd500106",
    "paymentStatus": "PAYMENT_COMPLETED",
    "paymentMethod": "CARD",
    "amount": "99900",
    "type": "PURCHASE"
  }
}
```

See [Webhooks](/developers/guides/webhooks-notifications) for subscription and signature verification.

## Sending the Link

The link is a URL, so how it reaches the customer is your call:

- **Redirect** from your own checkout, the closest thing to a hosted checkout flow.
- **Email or SMS** for invoices, deposits and quotes. Use `shortLinkUrl` in an SMS and keep `paymentPageValidFor` short enough that a stale link cannot be paid by mistake.
- **QR code** printed or shown on screen, for pay-at-table and self-service.

Two things to hold on to. Set `paymentPageValidFor` deliberately — a link that lives for three days is a link someone can pay three days late, after you have cancelled the order. And never treat the arrival at `redirectUrl` as proof of payment: a customer can reach that URL by other means. The webhook and the status call are the record.

## Error Handling

Create-order failures come back as `status: "ERROR"` with an `OR_*` or `PS_*` code. The ones you will meet setting this up:

| Code | Cause |
|------|-------|
| `OR_0042` | Terminal not found. The `terminal$id` is wrong, or it belongs to another merchant. |
| `OR_0037` | The total does not reconcile with the line items. |
| `OR_0048` | Line items mix currencies. |

If the store's terminal list comes back without a `PaymentPage` entry, the store was created without `onlineInfo` — the two default terminals only come with an online store. A terminal that will not register, or one that is there but refuses a payment, usually means the store has not cleared domain verification or is still in approval. Check the store's online status before you look at the terminal call.

The [Create Order Error Codes](/developers/guides/create-order-error-codes) reference lists the rest, including errors raised by the payment initiation that happens inside the same call.

## Next Steps

- [Payment Page](/developers/guides/payment-page) — the hosted checkout redirect in more detail
- [Self-Hosted Checkout](/developers/guides/self-hosted-checkout) — keep the customer on your own page
- [Server-to-Server API](/developers/guides/server-to-server-api) — charge a stored card with no customer present
- [Capture a Payment](/developers/guides/capture-a-payment) — finalize a delayed-capture authorization
- [Refund an Order](/developers/guides/refund-an-order) — return funds after settlement

## Reference

- [Stores API](https://developers.surfboardpayments.com/api/stores)
- [Terminals API](https://developers.surfboardpayments.com/api/terminals)
- [Create Order API](https://developers.surfboardpayments.com/api/orders)
- [Payments API](https://developers.surfboardpayments.com/api/payments)
- [Developer Portal](https://developers.surfboardpayments.com/)
