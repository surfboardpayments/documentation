## Overview

Every payment follows a lifecycle: create an order, authorize payment, capture funds, and settle. At each stage you can intervene -- void before settlement, cancel before completion, or refund after. This guide covers each operation with the API calls you need.

## Lifecycle at a Glance

| Operation | When to Use | Endpoint | Method |
|-----------|-------------|----------|--------|
| **Create Order** | Start a new payment | `/merchants/:merchantId/orders` | POST |
| **Capture** | Finalize a delayed-capture auth | `/payments/:paymentId/capture` | POST |
| **Void** | Reverse before settlement | `/payments/:paymentId/void` | POST |
| **Cancel** | Stop before completion | `/payments/:paymentId` | DELETE |
| **Refund** | Full return after settlement | `/merchants/:merchantId/orders` | POST |
| **Partial Refund** | Partial return after settlement | `/merchants/:merchantId/orders` | POST |

## Order and Payment Statuses

**Order statuses:** `PENDING` | `PAYMENT_COMPLETED` | `PAYMENT_CANCELLED` | `PARTIAL_PAYMENT_COMPLETED` | `PAYMENT_PROCESSED`

**Payment statuses:** `PAYMENT_INITIATED` | `PAYMENT_PROCESSING` | `PAYMENT_PROCESSED` | `PAYMENT_COMPLETED` | `PAYMENT_FAILED` | `PAYMENT_CANCELLED`

### Terminal Payment States

Every payment ends in one of three terminal states. Once a payment reaches a terminal state, it is final and cannot change.

| Payment Status | Order Status | Description |
|----------------|--------------|-------------|
| `PAYMENT_COMPLETED` | `PAYMENT_COMPLETED` | Payment succeeded -- funds are captured and the order is closed. |
| `PAYMENT_CANCELLED` | `PENDING` | Payment was cancelled -- the order remains open and a new payment can be initiated using the existing `orderId`. |
| `PAYMENT_FAILED` | `PENDING` | Payment failed -- the order remains open and a new payment can be initiated using the existing `orderId`. |

> **Tip:** When a payment is cancelled or fails, you do not need to create a new order. Simply initiate a new payment against the same `orderId` to retry.

## Create an Order

Every payment starts with an order containing line items and a terminal ID.

```json
POST /merchants/:merchantId/orders
{
  "terminal$id": "YOUR_TERMINAL_ID",
  "orderLines": [{
    "id": "ITEM-001",
    "name": "Running Shoes",
    "quantity": 1,
    "amount": { "regular": 50000, "total": 50000, "currency": "752",
      "tax": [{ "amount": 10000, "percentage": 25, "type": "VAT" }] }
  }],
  "totalOrderAmount": { "regular": 50000, "total": 50000, "currency": "752",
    "tax": [{ "amount": 10000, "percentage": 25, "type": "VAT" }] },
  "controlFunctions": {
    "initiatePaymentsOptions": { "paymentMethod": "CARD" }
  }
}
```

```json
// Response
{ "status": "SUCCESS",
  "data": { "orderId": "83a1ba32774149710b", "paymentId": "83a1ba3264bd500106" },
  "message": "Order created successfully" }
```

Store both `orderId` and `paymentId` -- you need them for all subsequent operations.

### Delay Capture

To authorize now but capture later (e.g., charge at shipment), set `delayCapture: true` in `controlFunctions`. You can also use `authMode: "PRE-AUTH"` for pre-authorization flows, which automatically enables delayed capture.

## Capture a Payment

When an order uses `delayCapture: true`, explicitly capture to finalize the charge.

```json
POST /payments/:paymentId/capture
{ "amount": 50000 }
```

The `amount` field is only required for `PRE-AUTH` orders where you capture a different amount than authorized. For standard delayed capture, send an empty body `{}`.

```json
// Response
{ "status": "SUCCESS", "message": "Payment captured successfully" }
```

Check capture status with `GET /payments/:paymentId/capture`. Possible `captureStatus` values: `PENDING`, `SUCCESS`, `ERROR`.

## Void a Payment

Voiding reverses a completed payment **before settlement** -- no money moves.

```json
POST /payments/:paymentId/void
{}
```

```json
// Response
{ "status": "SUCCESS",
  "data": { "voidStatus": "VOIDED" },
  "message": "Payment voided successfully" }
```

Possible `voidStatus` values: `VOID_INITIATED`, `CANNOT_VOID`, `VOIDED`.

> **Important:** Voiding is only possible before 23:00 UTC on the transaction day, and only for completed payments. After settlement cutoff, use a refund instead.

## Cancel a Payment

Cancellation stops a payment **before it completes** -- for example, if the customer abandons checkout while payment is processing.

```json
DELETE /payments/:paymentId
```

```json
// Response
{ "status": "SUCCESS",
  "data": { "paymentStatus": "PAYMENT_CANCELLED" },
  "message": "Payment cancelled successfully" }
```

> **Cancel vs. Void:** Cancel applies to in-progress payments (before completion). Void applies to completed payments (before settlement).

## Refund an Order

A full refund is a **new order** with negative quantities and the original `orderId` as `purchaseOrderId` on each line item.

```json
POST /merchants/:merchantId/orders
{
  "terminal$id": "YOUR_TERMINAL_ID",
  "orderLines": [{
    "id": "ITEM-001",
    "purchaseOrderId": "ORIGINAL_ORDER_ID",
    "name": "Running Shoes",
    "quantity": -1,
    "amount": { "regular": 50000, "total": -50000, "currency": "752",
      "tax": [{ "amount": 10000, "percentage": 25, "type": "VAT" }] }
  }],
  "totalOrderAmount": { "regular": 50000, "total": -50000, "currency": "752",
    "tax": [{ "amount": 10000, "percentage": 25, "type": "VAT" }] },
  "controlFunctions": {
    "initiatePaymentsOptions": { "paymentMethod": "CARD" }
  }
}
```

Key details:

- Set `quantity` to a negative value to indicate a return
- Set `amount.total` to a negative value
- Include the original `purchaseOrderId` on each line item
- For card refunds, `CARD_NP` is the recommended payment method
- Transaction fees are charged again on refunds

## Partial Refund

Works the same as a full refund, but only include the specific items or reduced quantities you want to return.

```json
POST /merchants/:merchantId/orders
{
  "terminal$id": "YOUR_TERMINAL_ID",
  "orderLines": [{
    "id": "ITEM-002",
    "purchaseOrderId": "ORIGINAL_ORDER_ID",
    "name": "Water Bottle",
    "quantity": -1,
    "amount": { "regular": 15000, "total": -15000, "currency": "752",
      "tax": [{ "amount": 3000, "percentage": 25, "type": "VAT" }] }
  }],
  "totalOrderAmount": { "regular": -15000, "total": -15000, "currency": "752",
    "tax": [{ "amount": 3000, "percentage": 25, "type": "VAT" }] },
  "controlFunctions": {
    "initiatePaymentsOptions": { "paymentMethod": "CARD" }
  }
}
```

> **Note:** All payment methods except NSWISH, SVIPPS, and SMOBILEPAY support partial refunds.

## Checking Order Status

Query the current state of any order at any point:

```json
GET /merchants/:merchantId/orders/:orderId/status
```

```json
// Response
{ "status": "SUCCESS",
  "data": {
    "orderStatus": "PAYMENT_COMPLETED",
    "payments": [{ "paymentId": "83a1ba3264bd500106",
      "paymentStatus": "PAYMENT_COMPLETED", "paymentMethod": "CARD", "amount": 50000 }],
    "paymentIds": ["83a1ba3264bd500106"]
  } }
```

## Decision Guide

| Situation | Action |
|-----------|--------|
| Payment initiated but not completed | **Cancel** -- `DELETE /payments/:paymentId` |
| Payment completed, not yet settled (before 23:00 UTC) | **Void** -- `POST /payments/:paymentId/void` |
| Payment settled, need full reversal | **Full Refund** -- create order with negative quantities |
| Payment settled, need partial reversal | **Partial Refund** -- create order with specific negative items |
| Delayed-capture order, ready to charge | **Capture** -- `POST /payments/:paymentId/capture` |

## Reference

- [Create Order API](https://developers.surfboardpayments.com/api/orders)
- [Payments API](https://developers.surfboardpayments.com/api/payments)
- [Developer Portal](https://developers.surfboardpayments.com/)