## Overview

An order is the starting point for every payment in Surfboard. You create an order against a `terminal$id`, include line items with pricing, and optionally initiate payment in the same call. The API returns an `orderId` and `paymentId` that you use for all subsequent operations.

This guide covers basic order creation, line items, customer details, tax handling, and common control functions.

## Prerequisites

1. Create a developer account at the [Developer Portal](https://developers.surfboardpayments.com/sign-up)
2. Complete onboarding (merchant and store setup)
3. Register a terminal (any type -- in-store, PaymentPage, SelfHostedPage, or MerchantInitiated)

## Basic Order

Create an order with a single line item and initiate payment:

```json
POST /merchants/:merchantId/orders
{
  "terminal$id": "YOUR_TERMINAL_ID",
  "orderLines": [
    {
      "id": "ITEM-001",
      "name": "Nike Shoes",
      "quantity": 1,
      "amount": {
        "regular": 50000,
        "total": 50000,
        "currency": "752",
        "tax": [
          { "amount": 10000, "percentage": 25, "type": "VAT" }
        ]
      }
    }
  ],
  "totalOrderAmount": {
    "regular": 50000,
    "total": 50000,
    "currency": "752",
    "tax": [
      { "amount": 10000, "percentage": 25, "type": "VAT" }
    ]
  },
  "controlFunctions": {
    "initiatePaymentsOptions": {
      "paymentMethod": "CARD"
    }
  }
}
```

```json
// Response
{
  "status": "SUCCESS",
  "data": {
    "orderId": "83a1ba32774149710b",
    "paymentId": "83a1ba3264bd500106"
  },
  "message": "Order created successfully"
}
```

Store both `orderId` and `paymentId` -- you need them for status checks, captures, voids, and refunds.

## Line Items

Every order requires at least one line item in the `orderLines` array. Each line item must include:

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique line item identifier |
| `name` | Yes | Product name |
| `quantity` | Yes | Quantity (negative for refunds) |
| `amount.regular` | Yes | Unit price in smallest currency unit |
| `amount.total` | Yes | Total line amount in smallest currency unit |
| `amount.currency` | Yes | Numeric ISO 4217 code (e.g., `"752"` for SEK) |

Optional fields include `description`, `brand`, `imageUrl`, `gtin`, `categoryId`, `unit`, and `metadata`.

> **Currency format:** All amounts use the smallest currency unit. For example, 10.00 SEK = `1000`, 5.00 EUR = `500`.

## Customer, Billing, and Shipping

Include customer, billing, and shipping details when available:

```json
{
  "terminal$id": "YOUR_TERMINAL_ID",
  "customer": {
    "person": {
      "name": { "firstName": "John", "lastName": "Doe" },
      "email": "john@example.com",
      "phoneNumber": { "code": "46", "number": "768100190" }
    },
    "company": {
      "vatId": "SE556026998601"
    }
  },
  "billing": {
    "name": { "firstName": "John", "lastName": "Doe" },
    "phoneNumber": { "code": "46", "number": "768100190" },
    "address": {
      "addressLine1": "Storgatan 1",
      "city": "Stockholm",
      "postalCode": "11122",
      "countryCode": "SE"
    }
  },
  "shipping": {
    "name": { "firstName": "John", "lastName": "Doe" },
    "phoneNumber": { "code": "46", "number": "768100190" },
    "address": {
      "addressLine1": "Storgatan 1",
      "city": "Stockholm",
      "postalCode": "11122",
      "countryCode": "SE"
    }
  },
  "orderLines": [...]
}
```

All customer fields are optional but recommended for invoice payments, fraud prevention, and receipt delivery.

## Order Line Level Calculation

The `orderLineLevelCalculation` control function changes how `totalOrderAmount` is computed from line items.

| Setting | Formula | Example |
|---------|---------|---------|
| `false` (default) | Sum of `(total * quantity)` per line | `(50 * 2) + (150 * 1) = 250` |
| `true` (recommended) | Sum of `((regular * quantity) - campaign + shipping)` per line | `((200 * 2) - 100 + 50) = 350` |

Enable it when your line items have campaigns or shipping costs:

```json
{
  "controlFunctions": {
    "orderLineLevelCalculation": true,
    "initiatePaymentsOptions": { "paymentMethod": "CARD" }
  }
}
```

## Adjustments

Adjustments modify the total order value for tips, donations, gift cards, or discounts:

```json
{
  "terminal$id": "YOUR_TERMINAL_ID",
  "orderLines": [...],
  "adjustments": [
    { "type": "TIP", "value": 1000 }
  ],
  "totalOrderAmount": {
    "regular": 50000,
    "total": 51000,
    "currency": "752"
  },
  "controlFunctions": {
    "initiatePaymentsOptions": { "paymentMethod": "CARD" }
  }
}
```

The `totalOrderAmount.total` should reflect the adjusted amount (regular + adjustments).

## Delay Capture

To authorize payment now but capture funds later (e.g., at shipment), set `delayCapture: true`:

```json
{
  "controlFunctions": {
    "delayCapture": true,
    "initiatePaymentsOptions": { "paymentMethod": "CARD" }
  }
}
```

You can also use `authMode: "PRE-AUTH"` for pre-authorization flows, which automatically enables delayed capture and lets you capture a different amount than originally authorized.

See the [Capture a Payment](/developers/guides/capture-a-payment) guide for the full flow.

## Check Order Status

After creating an order, check its status at any time:

```json
GET /merchants/:merchantId/orders/:orderId/status
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
        "amount": 50000
      }
    ],
    "paymentIds": ["83a1ba3264bd500106"]
  }
}
```

**Order statuses:** `PENDING` | `PAYMENT_COMPLETED` | `PAYMENT_CANCELLED` | `PARTIAL_PAYMENT_COMPLETED` | `PAYMENT_PROCESSED`

**Payment statuses:** `PAYMENT_INITIATED` | `PAYMENT_PROCESSING` | `PAYMENT_PROCESSED` | `PAYMENT_COMPLETED` | `PAYMENT_FAILED` | `PAYMENT_CANCELLED`

Every payment ends in one of three terminal states:

| Payment Status | Order Status | Description |
|----------------|--------------|-------------|
| `PAYMENT_COMPLETED` | `PAYMENT_COMPLETED` | Payment succeeded -- the order is closed. |
| `PAYMENT_CANCELLED` | `PENDING` | Payment was cancelled -- the order remains open and a new payment can be initiated using the existing `orderId`. |
| `PAYMENT_FAILED` | `PENDING` | Payment failed -- the order remains open and a new payment can be initiated using the existing `orderId`. |

## Next Steps

Once you have an order created, you can:

- [Capture a Payment](/developers/guides/capture-a-payment) -- finalize a delayed-capture authorization
- [Cancel a Payment](/developers/guides/cancel-a-payment) -- stop an in-progress payment
- [Void a Payment](/developers/guides/void-a-payment) -- reverse a completed payment before settlement
- [Refund an Order](/developers/guides/refund-an-order) -- return funds after settlement
- [Partial Payments](/developers/guides/partial-payments) -- split an order across multiple payments

## Reference

- [Create Order API](https://developers.surfboardpayments.com/api/orders)
- [Payments API](https://developers.surfboardpayments.com/api/payments)
- [Payment Lifecycle](/developers/guides/payment-lifecycle)
- [Developer Portal](https://developers.surfboardpayments.com/)