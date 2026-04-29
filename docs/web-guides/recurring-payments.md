## Overview

Recurring payments let you charge customers on a schedule without requiring them to re-enter card details each time. This guide covers the full lifecycle: tokenizing a card during the initial payment, configuring subscription parameters, charging with stored tokens, and managing the subscription over time.

This builds on the concepts introduced in the [Server-to-Server API](/guides/server-to-server-api) guide. If you are new to Merchant Initiated Transactions (MIT) and tokenization, start there first.

## How It Works

1. **Initial payment** -- The customer pays through a PaymentPage or SelfHostedPage terminal. Tokenization stores their card for future use.
2. **Subscription configuration** -- You define frequency, amount type, and payment count using the `recurring` object.
3. **Recurring charges** -- Your backend creates orders against a MerchantInitiated terminal and pays using the stored token.
4. **Lifecycle management** -- You handle renewals, cancellations, amount changes, and failed payment retries.

## Prerequisites

- A **PaymentPage** or **SelfHostedPage** terminal for the initial customer-present payment
- A **MerchantInitiated** terminal for subsequent server-to-server charges
- API credentials (API key, API secret, merchant ID)

## Step 1: Create the Initial Tokenized Order

The first order collects card details and sets up the recurring agreement. Use `enforceTokenization` together with the `recurring` configuration and set `subscription` to `true`:

```json
POST /merchants/:merchantId/orders
{
  "terminal$id": "YOUR_PAYMENT_PAGE_TERMINAL_ID",
  "orderLines": [
    {
      "id": "SUB-001",
      "name": "Pro Plan - Monthly",
      "quantity": 1,
      "amount": {
        "regular": 9900,
        "total": 9900,
        "currency": "752"
      }
    }
  ],
  "controlFunctions": {
    "initiatePaymentsOptions": {
      "paymentMethod": "CARD",
      "amount": 9900
    },
    "online": {
      "enforceTokenization": true,
      "subscription": true,
      "recurring": {
        "subscriptionAmountType": "fixed",
        "frequency": "monthly",
        "numberOfPayments": 12,
        "uniqueReference": "cust-42-pro-monthly",
        "validation": "validated"
      }
    }
  }
}
```

The customer completes this payment on the payment page. Once the payment succeeds, the card is tokenized.

## Step 2: Retrieve and Store the Token

After the initial payment completes, fetch the token:

```
GET /merchants/:merchantId/orders/:orderId/tokens
```

Store the returned `tokenId` securely on your backend, associated with the customer record. This token is used for all future recurring charges.

> **Warning:** Never expose token IDs in client-side code or logs.

## Recurring Configuration Reference

The `controlFunctions.online.recurring` object controls how the subscription behaves:

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `subscriptionAmountType` | Yes | string | `"fixed"` for same amount each cycle, `"variable"` for amounts that change |
| `maxAmount` | No | number | Maximum charge amount in smallest currency unit. Only used with `"variable"` amount type |
| `frequency` | Yes | string | Billing cycle. See frequency options below |
| `numberOfPayments` | No | number | Total number of payments for the subscription. Omit for indefinite |
| `uniqueReference` | No | string | Your unique identifier for this recurring agreement |
| `validation` | Yes | string | `"validated"` if the initial payment is authenticated (3DS), `"notValidated"` otherwise |

### Frequency Options

| Value | Cycle |
|-------|-------|
| `daily` | Every day |
| `twiceWeekly` | Twice per week |
| `weekly` | Every week |
| `tenDays` | Every 10 days |
| `fortNightly` | Every 2 weeks |
| `monthly` | Every month |
| `everyTwoMonths` | Every 2 months |
| `trimester` | Every 4 months |
| `quarterly` | Every 3 months |
| `twiceYearly` | Every 6 months |
| `annually` | Every year |
| `unscheduled` | No fixed schedule (usage-based or on-demand) |

## Step 3: Charge with the Stored Token

When a billing cycle is due, create an order on the MerchantInitiated terminal and pay with the token:

### Create the recurring order

```json
POST /merchants/:merchantId/orders
{
  "terminal$id": "YOUR_MIT_TERMINAL_ID",
  "referenceId": "sub-cust42-2026-02",
  "orderLines": [
    {
      "id": "SUB-002",
      "name": "Pro Plan - February 2026",
      "quantity": 1,
      "amount": {
        "regular": 9900,
        "total": 9900,
        "currency": "752"
      }
    }
  ]
}
```

### Initiate payment with the token

```json
POST /merchants/:merchantId/payments
{
  "orderId": "ORDER_ID_FROM_ABOVE",
  "paymentMethod": "CTOKEN",
  "tokenId": "STORED_TOKEN_ID"
}
```

### Verify the result

```
GET /merchants/:merchantId/orders/:orderId/status
```

A successful charge returns `orderStatus: "PAYMENT_COMPLETED"`.

## Variable-Amount Subscriptions

For metered billing or usage-based pricing, set `subscriptionAmountType` to `"variable"` and specify a `maxAmount`:

```json
"recurring": {
  "subscriptionAmountType": "variable",
  "maxAmount": 50000,
  "frequency": "monthly",
  "uniqueReference": "cust-42-usage",
  "validation": "validated"
}
```

Each recurring charge can then use a different amount (up to `maxAmount`) based on the customer's usage for that period.

## Handling Failed Payments

When a recurring charge fails, the order status will show `PAYMENT_FAILED` or `PAYMENT_CANCELLED`. Common reasons include expired cards, insufficient funds, or issuer declines.

**Retry strategy:**

1. Check the `failureReason` on the payment status response.
2. For soft declines (insufficient funds, temporary issuer issues), retry the same order by calling the Initiate Payment API again with the token.
3. Space retries over increasing intervals (e.g., 1 day, 3 days, 7 days).
4. After repeated failures, notify the customer to update their card details. Direct them to a new payment page order with `enforceTokenization: true` to capture a fresh token.
5. Replace the old token with the new one in your system.

## Managing the Subscription Lifecycle

| Action | How to implement |
|--------|-----------------|
| **Pause** | Stop creating new orders on your billing schedule. The token remains valid. |
| **Resume** | Start creating orders again using the same stored token. |
| **Cancel** | Stop billing. Optionally delete the stored token via your internal records. |
| **Upgrade / downgrade** | Change the amount on the next order you create. For variable subscriptions this works within `maxAmount`. For fixed subscriptions, create a new initial order with the updated recurring configuration. |
| **Update payment method** | Direct the customer to a new payment page order with tokenization enabled, then replace the stored token. |

## Reference

- [Server-to-Server API Guide](/guides/server-to-server-api) -- Tokenization and MIT fundamentals
- [Create Order API](https://developers.surfboardpayments.com/api/orders)
- [Initiate Payment API](https://developers.surfboardpayments.com/api/payments)
- [Token Management](https://developers.surfboardpayments.com/api/orders)