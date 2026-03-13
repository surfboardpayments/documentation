## Overview

A partial refund returns a portion of the order amount to the customer. Like a full refund, it works by creating a **new order** with negative quantities -- but only for the specific items being returned.

## When to Use Partial Refund

| Scenario | Description |
|----------|-------------|
| **Single item return** | Customer returns one item from a multi-item order |
| **Partial quantity** | Customer returns 1 of 3 identical items |
| **Price adjustment** | Discount applied after purchase |
| **Damaged goods** | Partial compensation for a defective item |

## Step 1: Create a Partial Refund Order

Include only the line items being refunded, with negative `quantity` and negative `amount.total`. Reference the original order's `orderId` as `purchaseOrderId`:

```json
POST /merchants/:merchantId/orders
{
  "terminal$id": "YOUR_TERMINAL_ID",
  "referenceId": "partial-refund-001",
  "orderLines": [
    {
      "id": "ITEM-002",
      "purchaseOrderId": "ORIGINAL_ORDER_ID",
      "name": "Apple Pods",
      "quantity": -1,
      "amount": {
        "regular": 20000,
        "total": -20000,
        "currency": "752",
        "tax": [
          { "amount": 4000, "percentage": 25, "type": "VAT" }
        ]
      }
    }
  ],
  "totalOrderAmount": {
    "regular": -20000,
    "total": -20000,
    "currency": "752",
    "tax": [
      { "amount": 4000, "percentage": 25, "type": "VAT" }
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
    "orderId": "83c4db56990b428c0b",
    "paymentId": "83c4db5674ce610706"
  },
  "message": "Order created successfully"
}
```

## Payment Method for Refunds

Use the corresponding refund method for the original payment:

| Original Payment Method | Refund Method |
|------------------------|---------------|
| CARD | `CARD_NP` (recommended) or `CARD` |
| KLARNA | `KLARNA` |
| SWISH | `SWISH` |
| Other digital methods | Same as original |

> **Note:** All payment methods except NSWISH, SVIPPS, and SMOBILEPAY support partial refunds.

## Step 2: Check Refund Status

Verify the partial refund completed:

```json
GET /merchants/:merchantId/orders/:orderId/status
```

Track refund status via the API response or through [webhooks](/developers/guides/webhooks-notifications).

## Partial Refund via Partner Portal

1. Log in to **Partner Portal** > **Merchants** > select merchant > **Transactions**
2. Select the transaction to refund
3. Click **Create Refund** > **Partial Refund**
4. Choose **Select Line Items** or **Enter Custom Amount**
5. **Process Refund** with a refund reason

## Multiple Partial Refunds

You can issue multiple partial refunds against the same original order. Each refund creates a separate return order referencing the same `purchaseOrderId`.

When the original order included adjustments (tips, discounts), the first partial refund includes adjustments by default. Subsequent partial refunds do not. Override this with `includeAdjustmentsForRefund` in `controlFunctions`.

## Reference

- [Create Order API](https://developers.surfboardpayments.com/api/orders)
- [Refund an Order](/developers/guides/refund-an-order)
- [Payment Lifecycle](/developers/guides/payment-lifecycle)
- [Developer Portal](https://developers.surfboardpayments.com/)