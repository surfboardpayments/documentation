## Overview

Voiding reverses a **completed** payment before it settles -- no money moves from the customer's account to the merchant's. This is the quickest way to reverse a transaction on the same day, avoiding refund processing fees.

> **Void vs. Cancel vs. Refund:**
> - **Cancel** -- payment is still in progress (not yet completed)
> - **Void** -- payment completed but not yet settled (same day, before 23:00 UTC)
> - **Refund** -- payment has settled (next day or later)

## When to Use Void

| Scenario | Description |
|----------|-------------|
| **Wrong amount charged** | Customer was overcharged, caught same day |
| **Duplicate transaction** | Same payment processed twice |
| **Customer changed mind** | Immediate post-purchase reversal |
| **Incorrect product** | Wrong item charged at point of sale |

## Step 1: Void the Payment

Call the void endpoint with the `paymentId`:

```json
POST /payments/:paymentId/void
{}
```

```json
// Response
{
  "status": "SUCCESS",
  "data": {
    "voidStatus": "VOIDED"
  },
  "message": "Payment voided successfully"
}
```

**Possible `voidStatus` values:** `VOID_INITIATED` | `CANNOT_VOID` | `VOIDED`

> **Important:** Voiding is only possible before 23:00 UTC on the transaction day. After the settlement cutoff, you must process a [refund](/developers/guides/refund-an-order) instead.

## Step 2: Verify Order Status

Confirm the void was applied:

```json
GET /merchants/:merchantId/orders/:orderId/status
```

The order's transaction data will show `voided: true` for the affected transaction.

## Handling `CANNOT_VOID`

If the void returns `CANNOT_VOID`, the payment has either:
- Already been settled (past 23:00 UTC cutoff)
- Not yet completed (use [Cancel](/developers/guides/cancel-a-payment) instead)

In these cases, process a [full refund](/developers/guides/refund-an-order) or [partial refund](/developers/guides/partial-refund) as needed.

## Reference

- [Payments API](https://developers.surfboardpayments.com/api/payments)
- [Create an Order](/developers/guides/create-an-order)
- [Payment Lifecycle](/developers/guides/payment-lifecycle)