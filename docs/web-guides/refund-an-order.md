## Overview

A full refund in Surfboard is processed by creating a **new order** with negative quantities and negative amounts, referencing the original order's `orderId` as the `purchaseOrderId` on each line item. When the payment completes, the full amount is returned to the customer.

## When to Use Full Refund

| Scenario | Description |
|----------|-------------|
| **Product return** | Customer returns all items |
| **Service not delivered** | Full service cancellation |
| **Order error** | Wrong order fulfilled entirely |
| **Post-settlement reversal** | Payment already settled, void no longer possible |

> If the payment hasn't settled yet (same day, before 23:00 UTC), consider using [Void a Payment](/developers/guides/void-a-payment) instead -- it's faster and avoids refund processing fees.

## Step 1: Create a Refund Order

Create a new order with negative `quantity` and negative `amount.total` for each line item. Include the original `orderId` as `purchaseOrderId`:

```json
POST /merchants/:merchantId/orders
{
  "terminal$id": "YOUR_TERMINAL_ID",
  "referenceId": "refund-order-001",
  "orderLines": [
    {
      "id": "ITEM-001",
      "purchaseOrderId": "ORIGINAL_ORDER_ID",
      "name": "Nike Shoes",
      "quantity": -2,
      "amount": {
        "regular": 10000,
        "total": -20000,
        "currency": "752",
        "tax": [
          { "amount": 4000, "percentage": 25, "type": "VAT" }
        ]
      }
    },
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
    "regular": 30000,
    "total": -30000,
    "currency": "752",
    "tax": [
      { "amount": 8000, "percentage": 25, "type": "VAT" }
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
    "orderId": "83b2ca45889a317b0b",
    "paymentId": "83b2ca4564bd500606"
  },
  "message": "Order created successfully"
}
```

Key details:

- Set `quantity` to a negative value to indicate a return
- Set `amount.total` to a negative value
- Include the original `purchaseOrderId` on each line item
- `totalOrderAmount.total` must be negative (the refund amount)

## Payment Method for Refunds

Refunds must use the corresponding refund method for the original payment:

| Original Payment Method | Refund Method |
|------------------------|---------------|
| CARD | `CARD_NP` (recommended) or `CARD` |
| KLARNA | `KLARNA` |
| SWISH | `SWISH` |
| Other digital methods | Same as original |

> **Note:** Transaction fees are charged again on refunds.

## Step 2: Check Refund Status

Verify the refund completed:

```json
GET /merchants/:merchantId/orders/:orderId/status
```

The order status will show `PAYMENT_COMPLETED` once the refund is processed. You can also track refund status via [webhooks](/developers/guides/webhooks-notifications).

## Adjustments in Refunds

If the original order included adjustments (tips, discounts), the refund includes them by default. Control this with `includeAdjustmentsForRefund`:

```json
{
  "controlFunctions": {
    "includeAdjustmentsForRefund": false,
    "initiatePaymentsOptions": {
      "paymentMethod": "CARD"
    }
  }
}
```

For partial returns, by default the first refund order includes adjustments (`true`) and subsequent ones do not (`false`).

## Refund via Partner Portal

You can also process refunds through the UI:

1. Log in to **Partner Portal** > **Merchants** > select merchant > **Transactions**
2. Select the transaction to refund
3. Click **Create Refund** > **Full Refund** > **Process Refund**

## Refund FAQ

> **How long after a purchase can I issue a refund?**
> Refunds can be issued up to **90 days** after the original purchase. This limit is enforced by Surfboard across all payment methods -- there is no difference between card, Swish, Klarna, or other methods. If you need to reverse a transaction older than 90 days (e.g., an event ticket refund a year later), it cannot be processed through the API.

> **How long does it take for the customer to receive the refund?**
> Processing time depends on the payment method:
>
> | Payment Method | Refund Timeline |
> |----------------|-----------------|
> | **Card** (CARD, CARD_NP) | Up to 7 days. Depends on the issuer and acquirer fraud systems. |
> | **Swish** (SSWISH, NSWISH) | Instant |
> | **Vipps** (SVIPPS) | Instant |
> | **MobilePay** (SMOBILEPAY) | Up to 10 banking days |
> | **Klarna** (KLARNA) | Up to 10 days |

## Reference

- [Create Order API](https://developers.surfboardpayments.com/api/orders)
- [Partial Refund](/developers/guides/partial-refund)
- [Payment Lifecycle](/developers/guides/payment-lifecycle)
- [Developer Portal](https://developers.surfboardpayments.com/)