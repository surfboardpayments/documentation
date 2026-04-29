## Overview

Partial payments let you split a single order across multiple payment transactions. The customer pays a portion with one method (e.g., card), then completes the balance with another (e.g., cash or Swish). The order stays open until the total of all payments equals the `totalOrderAmount`.

## When to Use Partial Payments

| Scenario | Description |
|----------|-------------|
| **Mixed payment methods** | Customer pays part by card, part by cash |
| **Gift card + balance** | Gift card covers partial amount, card covers the rest |
| **Split between payers** | Two customers splitting a bill |
| **Installment at POS** | Collecting payment in stages |

## Step 1: Create Order with Partial Amount

Create an order and specify a partial `amount` in `initiatePaymentsOptions`. This initiates the first payment for less than the total:

```json
POST /merchants/:merchantId/orders
{
  "terminal$id": "YOUR_TERMINAL_ID",
  "referenceId": "split-order-001",
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
          { "amount": 5000, "percentage": 10, "type": "VAT" }
        ]
      }
    },
    {
      "id": "ITEM-002",
      "name": "Apple Pods",
      "quantity": 1,
      "amount": {
        "regular": 50000,
        "total": 50000,
        "currency": "752",
        "tax": [
          { "amount": 5000, "percentage": 10, "type": "VAT" }
        ]
      }
    }
  ],
  "totalOrderAmount": {
    "regular": 100000,
    "total": 100000,
    "currency": "752",
    "tax": [
      { "amount": 10000, "percentage": 10, "type": "VAT" }
    ]
  },
  "controlFunctions": {
    "initiatePaymentsOptions": {
      "paymentMethod": "CARD",
      "amount": 50000
    }
  }
}
```

```json
// Response
{
  "status": "SUCCESS",
  "data": {
    "orderId": "83d5ec67aab053970b",
    "paymentId": "83d5ec6784df720806"
  },
  "message": "Order created successfully"
}
```

The order total is 100,000 but only 50,000 is charged in this first payment. The order remains in `PENDING` or `PARTIAL_PAYMENT_COMPLETED` status.

## Step 2: Initiate Remaining Payments

Use the Initiate Payment API to pay the remaining balance. Specify the `orderId` from the first step:

```json
POST /merchants/:merchantId/payments
{
  "orderId": "83d5ec67aab053970b",
  "paymentMethod": "CARD",
  "amount": 50000
}
```

```json
// Response
{
  "status": "SUCCESS",
  "data": {
    "paymentId": "83d5ec6794ef830906"
  },
  "message": "Payment initiated successfully"
}
```

You can split across more than two payments -- keep initiating payments until the total equals `totalOrderAmount`.

> An order is considered **complete** only when the sum of all partial payments equals the order's total amount.

## Step 3: Check Order Status

Verify the order is fully paid:

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
        "paymentId": "83d5ec6784df720806",
        "paymentStatus": "PAYMENT_COMPLETED",
        "paymentMethod": "CARD",
        "amount": 50000
      },
      {
        "paymentId": "83d5ec6794ef830906",
        "paymentStatus": "PAYMENT_COMPLETED",
        "paymentMethod": "CARD",
        "amount": 50000
      }
    ],
    "paymentIds": ["83d5ec6784df720806", "83d5ec6794ef830906"]
  }
}
```

## Mixing Payment Methods

Each partial payment can use a different method. For example, first payment by card, second by cash:

```json
// First payment (at order creation)
"initiatePaymentsOptions": { "paymentMethod": "CARD", "amount": 50000 }

// Second payment
{ "orderId": "...", "paymentMethod": "CASH", "amount": 50000 }
```

## Reference

- [Create Order API](https://developers.surfboardpayments.com/api/orders)
- [Initiate Payment API](https://developers.surfboardpayments.com/api/payments)
- [Create an Order](/developers/guides/create-an-order)
- [Payment Lifecycle](/developers/guides/payment-lifecycle)