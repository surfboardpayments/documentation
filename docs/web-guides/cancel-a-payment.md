## Overview

Cancellation stops a payment **before it completes** -- for example, if the customer abandons checkout while payment is processing, or you need to halt a transaction before funds are transferred.

> **Cancel vs. Void:** Cancel applies to in-progress payments (before completion). If the payment has already completed, use [Void a Payment](/developers/guides/void-a-payment) instead.

## When to Use Cancel

| Scenario | Description |
|----------|-------------|
| **Customer abandons checkout** | Payment initiated but customer leaves |
| **Timeout** | Payment processing takes too long |
| **Error detected** | Issue found after payment initiation |
| **Duplicate order** | Accidentally created a second payment |

## Step 1: Cancel the Payment

Call the delete endpoint with the `paymentId` from the original order:

```json
DELETE /payments/:paymentId
```

```json
// Response
{
  "status": "SUCCESS",
  "data": {
    "paymentStatus": "PAYMENT_CANCELLED"
  },
  "message": "Payment cancelled successfully"
}
```

**Possible `paymentStatus` values:** `PAYMENT_COMPLETED` | `PAYMENT_FAILED` | `PAYMENT_CANCELLED`

If the payment already completed before your cancel request was processed, the status will show `PAYMENT_COMPLETED` and you should use a [void](/developers/guides/void-a-payment) or [refund](/developers/guides/refund-an-order) instead.

## Step 2: Verify Order Status

Confirm the order reflects the cancellation:

```json
GET /merchants/:merchantId/orders/:orderId/status
```

```json
// Response
{
  "status": "SUCCESS",
  "data": {
    "orderStatus": "PAYMENT_CANCELLED",
    "payments": [
      {
        "paymentId": "83a1ba3264bd500106",
        "paymentStatus": "PAYMENT_CANCELLED",
        "paymentMethod": "CARD",
        "amount": 50000
      }
    ]
  }
}
```

## Decision Guide

| Payment State | Action |
|---------------|--------|
| In progress (not completed) | **Cancel** -- `DELETE /payments/:paymentId` |
| Completed, not settled (before 23:00 UTC) | [Void](/developers/guides/void-a-payment) -- `POST /payments/:paymentId/void` |
| Settled | [Refund](/developers/guides/refund-an-order) -- create order with negative quantities |

## Reference

- [Payments API](https://developers.surfboardpayments.com/api/payments)
- [Create an Order](/developers/guides/create-an-order)
- [Payment Lifecycle](/developers/guides/payment-lifecycle)