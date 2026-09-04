# Create an Order

Learn how to create orders with line items, tax, customer details, and control functions. The starting point for accepting payments with the Surfboard API.

Source: https://www.surfboardpayments.com/developers/guides/create-an-order
Category: online
Tags: Online, API, Orders, In-Store

---
## Overview

An order is the starting point for every payment in Surfboard. You create an order against a `terminal$id`, include line items with pricing, and optionally initiate payment in the same call. The API returns an `orderId` and `paymentId` that you use for all subsequent operations.

This guide covers basic order creation, line items, customer details, tax handling, and common control functions.

## Prerequisites

1. Create a developer account at the [Developer Portal](https://developers.surfboardpayments.com/sign-up)
2. Complete onboarding (merchant and store setup)
3. A terminal to create the order against (any type -- in-store, PaymentPage, SelfHostedPage, or MerchantInitiated). In-store devices and SelfHostedPage are registered; an online store already carries a PaymentPage and a MerchantInitiated terminal, so fetch the store's terminals to find them.

## Basic Order

Order, payment, and receipt endpoints are **not** merchant-scoped in the path. The merchant travels in the `MERCHANT-ID` header alongside `API-KEY` and `API-SECRET`, so the path is `/orders`, not `/merchants/{merchantId}/orders`. See [API Conventions](/developers/guides/api-conventions) for the full header set.

Create an order with a single line item and initiate payment:

```json
POST /orders
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
| `amount.total` | Yes | **Unit** price after shipping and campaign (`regular + shipping - campaign`). Not the line total |
| `amount.currency` | Yes | Numeric ISO 4217 code (e.g., `"752"` for SEK) |
| `amount.tax` | Yes | Tax array for the line. Required even at zero rate -- send a `0` entry rather than omitting it |

Optional fields include `description`, `brand`, `imageUrl`, `gtin`, `categoryId`, `unit`, and `metadata`.

> **`amount.total` is per unit, not per line.** This is the single most common first-integration error, and it only shows up once a cart has a quantity above one. `total` must equal `regular + shipping - campaign` for **one** unit; the order total is `sum(total * quantity)`. Sending `unitPrice × quantity` returns `P_0001: Invalid item price for item id <id>`.

Two lines, one of them with a quantity above one:

```json
"orderLines": [
  {
    "id": "ITEM-001",
    "name": "Flat white",
    "quantity": 2,
    "amount": {
      "regular": 4500,
      "total": 4500,
      "currency": "752",
      "tax": [{ "amount": 900, "percentage": 25, "type": "VAT" }]
    }
  },
  {
    "id": "ITEM-002",
    "name": "Gift card",
    "quantity": 1,
    "amount": {
      "regular": 10000,
      "total": 10000,
      "currency": "752",
      "tax": [{ "amount": 0, "percentage": 0, "type": "VAT" }]
    }
  }
]
```

The first line contributes `4500 * 2 = 9000`, not `4500`. The order total is `19000`. The gift card is zero-rated and still carries a `tax` entry: omitting it returns `P_0001: Input data validation failed. Cannot read properties of undefined (reading 'vatValue')`.

> **Currency format:** All amounts use the smallest currency unit. For example, 10.00 SEK = `1000`, 5.00 EUR = `500`.

> **Prices include tax.** `amount.regular` and `amount.total` are gross. The `tax` array reports the VAT *contained within* that price, not an amount to add on top. See [API Conventions](/developers/guides/api-conventions) if you are coming from a sales-tax market.

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

## Error Handling

Create order responses return `status: "ERROR"` with a code in the `OR_*`, `PS_*`, `GC_*`, or `SP_*` prefix when validation or initiation fails. The most common ones are `OR_0042` (terminal not found), `OR_0037` (invalid total), `OR_0048` (mixed currencies), and `PS_0025` (terminal not connected -- retry after configure).

See the [Create Order Error Codes](/developers/guides/create-order-error-codes) reference for the full list, including errors thrown by the initiate payment step when both happen in the same call.

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
- [Create Order Error Codes](/developers/guides/create-order-error-codes)
- [Payment Lifecycle](/developers/guides/payment-lifecycle)
- [Developer Portal](https://developers.surfboardpayments.com/)
