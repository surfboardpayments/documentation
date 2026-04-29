## Overview

When you create an order with `delayCapture: true` or `authMode: "PRE-AUTH"`, funds are authorized but not immediately captured. This lets you verify inventory, confirm fulfillment, or adjust the final amount before charging the customer.

This guide walks through the full capture flow: create an authorized order, capture the payment, and verify the result.

## When to Use Delay Capture

| Scenario | Description |
|----------|-------------|
| **E-commerce fulfillment** | Authorize at checkout, capture at shipment |
| **Pre-authorization** | Hold a variable amount (e.g., hotel deposit), capture actual charge later |
| **Service bookings** | Authorize upfront, capture after service delivery |
| **Digital products** | Authorize, verify access, then capture |

## Step 1: Create an Order with Delay Capture

Create an order with `delayCapture: true` in `controlFunctions`:

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
    "delayCapture": true,
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
    "orderId": "83ac302f7c5130810b",
    "paymentId": "83ac302f24bfb00b06"
  },
  "message": "Order created successfully"
}
```

Store the `paymentId` -- you need it to capture.

### Pre-Authorization Mode

For flows where the final capture amount may differ from the authorized amount, use `authMode: "PRE-AUTH"`. This automatically enables `delayCapture`:

```json
{
  "controlFunctions": {
    "delayCapture": true,
    "authMode": "PRE-AUTH",
    "initiatePaymentsOptions": {
      "paymentMethod": "CARD"
    }
  }
}
```

## Step 2: Capture the Payment

Once ready to finalize, call the capture endpoint with the `paymentId`:

```json
POST /payments/:paymentId/capture
{}
```

For `PRE-AUTH` orders, you can specify a different capture amount:

```json
POST /payments/:paymentId/capture
{
  "amount": 45000
}
```

```json
// Response
{
  "status": "SUCCESS",
  "message": "Payment captured successfully"
}
```

> The `amount` field is only valid for `PRE-AUTH` orders. For standard `delayCapture`, send an empty body to capture the full authorized amount.

## Step 3: Check Capture Status

Verify the capture completed successfully:

```json
GET /payments/:paymentId/capture
```

```json
// Response
{
  "status": "SUCCESS",
  "data": {
    "captureStatus": "SUCCESS"
  }
}
```

**Possible `captureStatus` values:** `PENDING` | `SUCCESS` | `ERROR`

## Reference

- [Create Order API](https://developers.surfboardpayments.com/api/orders)
- [Payments API](https://developers.surfboardpayments.com/api/payments)
- [Create an Order](/developers/guides/create-an-order)
- [Payment Lifecycle](/developers/guides/payment-lifecycle)