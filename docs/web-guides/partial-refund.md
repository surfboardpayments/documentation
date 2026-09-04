# Partial Refund

Refund specific items or a reduced amount from a completed order. Process partial returns by creating a return order with only the items to be refunded.

Source: https://www.surfboardpayments.com/developers/guides/partial-refund
Category: online
Tags: Online, API, Payments, Refunds, In-Store

---
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
POST /orders
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
      "paymentMethod": "CARD_NP",
      "refundProcessingParams": {
        "purchasePaymentId": "ORIGINAL_PAYMENT_ID",
        "refundReason": "CUSTOMER_INITIATED_RETURN"
      }
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

The `terminal$id` only needs to be a **valid** terminal -- it does **not** have to be the same terminal that processed the original purchase.

## Payment Method for Refunds

Set `paymentMethod` to either the method the customer originally paid with, or `CARD_NP`:

| Original Payment Method | Refund Method |
|------------------------|---------------|
| CARD | `CARD_NP` (recommended) or `CARD` |
| KLARNA | `KLARNA` |
| SWISH | `SWISH` |
| Other digital methods | Same as original |

For card refunds, the two card methods behave differently:

| Method | Behaviour |
|--------|-----------|
| `CARD_NP` | **Card not present.** Refunds straight back to the card that paid -- no terminal interaction. This is the recommended default for card refunds. |
| `CARD` | **Card present.** Triggers a card tap on the terminal, so a card must be physically presented to receive the refund. |

> **Note:** All payment methods except NSWISH, SVIPPS, and SMOBILEPAY support partial refunds.

## Refund Processing Parameters

Pass refund metadata through `refundProcessingParams` inside `initiatePaymentsOptions`:

```json
{
  "controlFunctions": {
    "initiatePaymentsOptions": {
      "paymentMethod": "CARD_NP",
      "refundProcessingParams": {
        "purchasePaymentId": "ORIGINAL_PAYMENT_ID",
        "refundReason": "CUSTOMER_INITIATED_RETURN"
      }
    }
  }
}
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `purchasePaymentId` | No | The `paymentId` of the **original purchase** (returned when the original order was created). This is the payment-level reference, distinct from the `purchaseOrderId` you set on each line item. |
| `refundReason` | No | Why the refund is being issued. See the allowed values below. |
| `otherReason` | Conditional | Free-text explanation. **Required when `refundReason` is `OTHER`.** |

### Refund Reasons

| Value | Meaning |
|-------|---------|
| `CUSTOMER_INITIATED_RETURN` | The customer returned the goods or requested the refund. |
| `SUSPECTED_MALFUNCTION` | The product is suspected to be faulty or not working. |
| `SUSPECTED_FRAUD` | The transaction is suspected to be fraudulent. |
| `DUPLICATE_TRANSACTION` | The original charge was a duplicate. |
| `OTHER` | Any other reason -- requires a message in `otherReason`. |

When using `OTHER`, include the explanation:

```json
{
  "controlFunctions": {
    "initiatePaymentsOptions": {
      "paymentMethod": "CARD_NP",
      "refundProcessingParams": {
        "purchasePaymentId": "ORIGINAL_PAYMENT_ID",
        "refundReason": "OTHER",
        "otherReason": "Goodwill credit for delayed delivery"
      }
    }
  }
}
```

## Step 2: Check Refund Status

Verify the partial refund completed:

```json
GET /orders/:orderId/status
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
