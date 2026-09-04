# Create Order Error Codes

Reference of error codes returned by the create order and initiate payment flows, with notes on when each is thrown and how to handle it.

Source: https://www.surfboardpayments.com/developers/guides/create-order-error-codes
Category: online
Tags: Online, API, Orders, Errors, Reference

---
## Overview

This reference lists the error codes returned by the create order and initiate payment flows. Most create order calls also initiate a payment in the same request (via `controlFunctions.initiatePaymentsOptions`), so errors from either step can surface on the same endpoint.

See the [Create an Order](/developers/guides/create-an-order) guide for request/response shape and the [Payment Lifecycle](/developers/guides/payment-lifecycle) guide for status semantics.

## Error Response Shape

Errors return a `status` of `ERROR` along with an error code and message. Example:

```json
{
  "status": "ERROR",
  "errorCode": "OR_0042",
  "message": "Terminal not found"
}
```

Error code prefixes indicate the source:

| Prefix | Source |
|--------|--------|
| `OR_` | Orders service (validation, order state, terminal/store checks) |
| `PS_` | Payment service (payment initiation, refund handling) |
| `GC_` | Gift card service |
| `SP_` | Service provider |
| `P_` | Platform-level validation, ahead of the services above |

Messages may contain placeholders like `<id>`, `<amount>`, `<type>`, or `<status>` -- the API substitutes the real value at runtime.

### `P_0001`, where the message is the code

Payload validation that fails before the order reaches the Orders service comes back as `P_0001`, with the specific reason in free text:

```
P_0001: Input data validation failed. <reason>
```

`P_0001` is the only code in this reference where looking the code up tells you nothing. There is one code covering many faults, so **the message is the discriminator**. The three seen most often on a first integration:

| Message fragment | Cause | Fix |
|---|---|---|
| `Invalid item price for item id <id>` | `amount.total` sent as the line total | `total` is the **unit** price. See [Create an Order](/developers/guides/create-an-order) |
| `Invalid total order price` | Tax added on top of the price | Prices are tax-inclusive; `total` must equal `regular`. See [API Conventions](/developers/guides/api-conventions) |
| `Cannot read properties of undefined (reading 'vatValue')` | A line is missing `amount.tax` | Send a `tax` entry on every line, including zero-rated ones |

The same underlying faults are also described by `OR_0023` and `OR_0037` below, which is what you get when the order reaches the Orders service before failing. Either code can carry the same message.

## Create Order Errors

Errors thrown while validating and creating the order.

### Validation and Schema

| Code | Message | Notes |
|------|---------|-------|
| `OR_0015` | Order validation failed | Wraps the raw schema validator error. Check required fields and types. |
| `OR_0022` | Invalid order line item. Missing item price | At least one line is missing `amount.regular` or `amount.total`. |
| `OR_0023` | Invalid item price for item id `[<id>]`, `<errorMsg>` | Price on the named line item failed validation. |
| `OR_0037` | Invalid total order price | `totalOrderAmount` does not reconcile with the order lines and adjustments. |
| `OR_0049` | *(empty message)* | Reserved / edge-case validation failure. |

### Merchant, Store, and Terminal

| Code | Message | Notes |
|------|---------|-------|
| `PS_0059` | No Merchant found with the given Merchant ID | The `MERCHANT-ID` header does not match a merchant. Order endpoints are not merchant-scoped in the path -- the merchant travels in the header. |
| `OR_0001` | No Merchant Details found for the Merchant ID | Merchant exists but is missing required configuration. |
| `OR_0002` | Order creation is not allowed for this merchant type `<type>` | The merchant type does not permit direct order creation. |
| `OR_0028` | Store is not in an active state | Activate the store before creating orders. |
| `OR_0042` | Terminal not found | `terminal$id` does not match any terminal. |
| `OR_0007` | The Terminal ID is not associated with this merchant | Terminal exists but belongs to another merchant. |
| `OR_0006` | The terminal is in deregistered state | Re-register the terminal before use. |
| `OR_0050` | Order cannot be created, terminal is in an inactive state | Terminal is registered but not active. |

### Currency

| Code | Message | Notes |
|------|---------|-------|
| `OR_0003` | Currency Code is not present for this merchant | Merchant has no configured currency -- contact your onboarding contact. |
| `OR_0004` | The currency code is not associated with this merchant | Use a currency enabled on the merchant. |
| `OR_0005` | Currency is mandatory as the merchant has more than one currency | Multi-currency merchants must set `amount.currency` explicitly. |
| `OR_0048` | Currencies should be same in order lines | All line items must use the same currency. |

### Payment Method Locking

| Code | Message | Notes |
|------|---------|-------|
| `OR_0031` | No Payment Method found with the given payment method id | The `lockToPaymentMethods` id is unknown. |
| `OR_0032` | Lock to payment method is not allowed for this merchant | The merchant does not have the lock-to-method feature enabled. |
| `SP_0001` | Service provider IDs `[<ids>]` not associated with this merchant | One or more service provider IDs are invalid for this merchant. |

### Refunds (on create order)

Refunds are created as new orders with negative quantities and a `purchaseOrderId` on each line. These errors surface during that validation.

| Code | Message | Notes |
|------|---------|-------|
| `OR_0010` | No purchase order found with ID: `<id>` | `purchaseOrderId` does not match any completed order. |
| `OR_0035` | Cannot refund from purchase order that is not completed. Status: `<status>` | Only completed orders can be refunded. |
| `OR_0039` | Cannot refund more than the original order amount | Refund amount exceeds the remaining refundable balance. |
| `PS_0043` | Invalid order line item. Missing purchase order id for refund line | Every refund line must carry `purchaseOrderId`. |
| `PS_0010` | Unlinked refunds are only supported for CARD payment methods | Unlinked refunds cannot be issued on non-card methods. |
| `GC_0004` | Gift card refunds are not supported | Gift card payments cannot be refunded via this flow. |

## Initiate Payment Errors

When the create order request also initiates a payment, these errors can be returned from the same call. They also surface when you call initiate payment directly.

### Order State

| Code | Message | Notes |
|------|---------|-------|
| `PS_0057` | Order not found | The order referenced by the payment request does not exist. |
| `PS_0062` | Order already paid | The order has already been fully paid. |
| `OR_0046` | Order cancelled | The order is in a cancelled state and cannot accept payments. |
| `PS_0019` | Cannot pay `[<amount>]`, amount payable `[<pendingFromOrder>]` | Requested amount exceeds the outstanding balance on the order. |

### Amount and Validation

| Code | Message | Notes |
|------|---------|-------|
| `PS_0008` | Payment amount cannot be less than 0.01 | Send a positive amount in the smallest currency unit. |
| `PS_0033` | `empty payload - payment initiation rejected` or `Initiate payment validation failed with error <err>` | Payload is missing or failed schema validation. |
| `PS_0025` | Payment initiation failed: `<error.message>` | Wraps unexpected exceptions from downstream services. See the *Handling `PS_0025`* section below. |

### Terminal, Merchant, and Store

| Code | Message | Notes |
|------|---------|-------|
| `OR_0042` | Terminal not found | Terminal ID unknown. |
| `OR_0006` | Terminal `[<terminalId>]` is not active | Re-activate the terminal. |
| `PS_0013` | No linked terminals found / Terminal not linked to merchant / Terminal not linked to store | Link the terminal to the merchant/store before initiating. |
| `PS_0059` | Merchant not found | Merchant ID unknown. |
| `PS_0058` | Store not found | Store ID unknown. |

### Refund-Specific

| Code | Message | Notes |
|------|---------|-------|
| `OR_0053` | Mixed linked and unlinked refund lines are not supported | Split mixed refunds into separate requests. |
| `PS_0104` | Multiple `purchasePaymentId` values found in refund lines / This purchase order has partial payments | Specify which payment to refund using `purchasePaymentId`. |
| `PS_0017` | No valid purchase payments found for the specified payment IDs / Purchase payment not found | The `purchasePaymentId` does not match a refundable payment. |
| `PS_0010` | Payment method `<method>` not supported for returns / No payments with matching payment method found / Unlinked refunds are not enabled for this merchant / Unlinked refunds are only supported for `[<methods>]` / Purchase payment does not support CARD\_NP refund | Refund is not allowed for the given method or configuration. |
| `PS_0032` | Cannot refund amount `<amount>` (not enough remaining / not enough in card / not enough in other methods / exceeds max for `<method>`) | Refund would exceed the available balance. |
| `PS_0068` | Cannot refund amount `<amount>` as there are no card payments in the purchase order | No card payments are available to refund against. |
| `PS_0096` | Cannot initiate refund as there are no payments of type `<method>` | No payments of the requested method exist on the order. |
| `PS_0034` | Message is missing | Card-not-present refund is missing the `message` field. |
| `PS_0044` | Cannot refund amount `<amount>` as message `<msg>` is not allowed / Purchase payment id is required, more than one purchase matches the criteria | Card-not-present refund message/ID disambiguation required. |

## Combined Flow Errors

When the create order call also initiates a payment, downstream payment failures (processor, network, 3DS) are reported through the payment object rather than as a top-level error:

```json
{
  "status": "ERROR",
  "errorCode": "<first processor code>",
  "message": "Payment failed",
  "payment": {
    "error": {
      "errorMessage": "...",
      "errorCode": ["..."],
      "psErrorCodes": ["..."]
    }
  }
}
```

Merge `payment.error.errorCode` and `payment.error.psErrorCodes` to get the full list of processor codes for logging and support.

## Handling `PS_0025` -- Terminal Not Connected

A common `PS_0025` variant is:

```
PS_0025: Terminal is not connected to server so unable to send transactions
```

Re-run the terminal configure call and retry the payment. This can be done transparently -- no user interaction is required. It is most common on SoftPOS, where the consumer device can drop its server session between transactions.

See [Interapp Integration](/developers/guides/interapp-integration) for the full recovery pattern.

## Handling Patterns

- **Retryable vs. terminal.** Treat `PS_0025`, `PS_0013`, and network-class errors as retryable after a configure/refresh. Treat `OR_*` validation errors as terminal -- fix the payload and resubmit.
- **User-facing vs. internal.** `OR_0022`, `OR_0023`, `OR_0037`, `OR_0048` are actionable by the merchant integration team. `PS_0025`, `PS_0059`, `PS_0058` usually mean misconfiguration -- surface them to an internal log rather than to the cardholder.
- **Refund edge cases.** When handling `PS_0104`, always re-issue the refund with an explicit `purchasePaymentId` -- there is no sensible default when multiple payments exist on one order.
- **Log the full response.** Capture `errorCode`, `message`, and `payment.error.*` together. Support tickets without the error code are very hard to trace.

## Reference

- [Create an Order](/developers/guides/create-an-order)
- [Payment Lifecycle](/developers/guides/payment-lifecycle)
- [Interapp Integration](/developers/guides/interapp-integration) -- `PS_0025` recovery
- [Create Order API](https://developers.surfboardpayments.com/api/orders)
- [Payments API](https://developers.surfboardpayments.com/api/payments)
