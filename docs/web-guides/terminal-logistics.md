# Order and Return Terminals

Get hardware to your merchants and back again. Order terminals during onboarding or later, track the shipment by webhook, and raise a return when a device is no longer needed.

Source: https://www.surfboardpayments.com/developers/guides/terminal-logistics
Category: in-store
Tags: In-Store, API, Logistics, Terminals, Partners

---
## Overview

Before a merchant can take a card payment in a shop, a physical device has to arrive at that shop. The Logistics API is how you place that order, follow it to the door, and send hardware back when a merchant leaves or a device fails.

There are two moments to order from, and they are different calls:

| When | How |
|------|-----|
| During onboarding | Control fields on the Create Merchant call — the merchant picks from a catalogue you curate, or you preselect for them |
| Any time after | The Create Shipment call, against an existing merchant |

Returns are one call plus a waybill, and everything in flight reports its progress through a single webhook.

## Prerequisites

1. A partner account with API credentials and your `partnerId`
2. Product IDs and pricing plans for the hardware you resell — Surfboard provides both
3. A webhook endpoint subscribed to `logistics.orderupdate`

## Ordering During Onboarding

Terminals can be chosen as part of merchant creation, which is the tidiest path: the merchant signs up and orders hardware in the same sitting. It is configured with control fields on [Create Merchant](/developers/guides/merchant-onboarding).

```json
POST /partners/:partnerId/merchants
{
  "country": "SE",
  "organisation": { "corporateId": "1234567890", "legalName": "Example AB" },
  "controlFields": {
    "showProductCatalogue": true,
    "displayProducts": [
      { "productId": "815db2c5adc9b00301", "pricingPlans": ["816192c7efa2b0091a"] }
    ],
    "preSelectProducts": [
      {
        "productId": "815db2c5adc9b00301",
        "quantity": 2,
        "pricingPlanId": "816192c7efa2b0091a"
      }
    ],
    "transactionPricingPlan": "816192c7efa2b0091a"
  }
}
```

| Control field | What it does |
|---------------|--------------|
| `showProductCatalogue` | Shows the hardware catalogue during onboarding. |
| `displayProducts` | Restricts the catalogue to the products you list, each with the pricing plan that merchant gets. |
| `preSelectProducts` | Ships the listed products without asking. Use it when the hardware is part of the package rather than a choice. |

Curate `displayProducts` per segment rather than showing everything. A merchant choosing between two terminals decides; a merchant choosing between nine calls support.

## Ordering After Onboarding

For additional terminals, replacements, or accessories, create a shipment directly:

```json
POST /partners/:partnerId/merchants/:merchantId/shipment
{
  "shippingAddress": {
    "name": "John Doe",
    "addressLine1": "Main Street 123",
    "addressLine2": "Building C",
    "city": "Stockholm",
    "countryCode": "SE",
    "postalCode": "123 45",
    "phoneNumber": { "code": "46", "number": "771890089" },
    "email": "store@example.com",
    "deliveryInstruction": "Reception, ask for the store manager"
  },
  "lineItems": [
    { "productId": "815db2c5adc9b00301", "quantity": 1 }
  ]
}
```

```json
// Response
{
  "status": "SUCCESS",
  "data": { "orderId": "81376ad8ebedf80310" },
  "message": "Order for shipping terminal successfully created"
}
```

`shippingAddress` is optional and falls back to the merchant's registered address. Send it anyway when the hardware goes to a shop rather than a head office — the registered address is where the company is incorporated, not where the till is.

| Line item field | Notes |
|-----------------|-------|
| `productId` | The Surfboard product ID, unique to you as a partner. |
| `quantity` | How many of that product. |
| `billingPlanId` | Optional. Falls back to the default plan for that product. |
| `replacementFor` | The `terminalId` of a device being replaced. |

### Replacements

Set `replacementFor` to the failing terminal's ID and the shipment is handled as a swap: Surfboard supplies a waybill for the old device, and the merchant can return it in the box the new one arrived in. It saves a separate return request, and it keeps the two halves of the swap linked in reporting.

```json
{
  "lineItems": [
    {
      "productId": "815db2c5adc9b00301",
      "quantity": 1,
      "replacementFor": "816a0ff6bc0fb00404"
    }
  ]
}
```

## Tracking the Shipment

Every change of state raises `logistics.orderupdate` against your webhook endpoint:

```json
{
  "eventType": "logistics.orderupdate",
  "metadata": {
    "eventId": "81a214e74b107801ff",
    "created": 1695793998732,
    "retryAttempt": 0
  },
  "data": {
    "merchantId": "81412e2e4102f80f0e",
    "orderId": "81376ad8ebedf80310",
    "orderStatus": "ORDER_SHIPPED",
    "trackingUrl": "https://www.dhl.com/home/tracking.html",
    "packageDetails": [
      { "productId": "817361bb0a23400701", "serial": "658364" }
    ]
  }
}
```

| `orderStatus` | Meaning |
|---------------|---------|
| `ORDER_PLACED` | The order is accepted. |
| `ORDER_PENDING_FOR_STOCK` | Waiting on stock. Worth surfacing to the merchant — this is the status behind "where is my terminal". |
| `ORDER_SHIPPED` | In transit. Carries `trackingUrl` and `packageDetails`. |
| `ORDER_COMPLETED` | Delivered and fulfilled. |

`trackingUrl` and `packageDetails` appear only on `ORDER_SHIPPED`. Store the serials from `packageDetails` as they arrive: that is the link between a shipment and the physical device a merchant will later register, and the fastest way to answer "which terminal did we send to which store". Registration itself is covered in [Device Registration](/developers/guides/device-registration).

Acknowledge with `200 OK` within 10 seconds, and deduplicate on `metadata.eventId`. Failed deliveries are retried twice, after 5 and 10 minutes.

## Returning a Terminal

When a merchant churns, downsizes, or has a device that will not come back to life:

```json
POST /partners/:partnerId/logistics/return
{
  "terminalId": "816a0ff6bc0fb00404",
  "name": "John Doe",
  "email": "store@example.com",
  "phoneNumber": { "code": "46", "number": "771890089" },
  "address": {
    "addressLine1": "Main Street 123",
    "addressLine2": "Building C",
    "city": "Stockholm",
    "countryCode": "SE",
    "postalCode": "123 45"
  },
  "deliveryInstruction": "Go left after the elevator",
  "comment": "Merchant closed the second location",
  "reasonForReturn": "NOT_USING_SERVICE"
}
```

The address here is the pickup address — where the device is now, not where it was originally shipped. A terminal that moved between stores moved with a `changeStore` call, and the return has to follow the device rather than the paperwork.

List what is in flight:

```
GET /partners/:partnerId/logistics/return
```

> **Deactivating a store?** A store cannot be deactivated while terminals are registered to it. Move them to another store under the same merchant, or return them first. See [Store Management](/developers/guides/store-management).

## What to Build Around This

Three things repay the effort:

- **Mirror `orderStatus` onto the merchant's own view.** Most support contact about hardware is "has it shipped", and the answer is already in your database.
- **Keep serial-to-store mapping from the shipped event.** It turns a later terminal fault into a lookup rather than an investigation.
- **Treat `ORDER_PENDING_FOR_STOCK` as an alert, not a status.** It is the one state where the merchant is waiting and nobody is working on it.

## Reference

- [Logistics API](https://developers.surfboardpayments.com/api/logistics)
- [Logistics Order Update webhook](https://developers.surfboardpayments.com/references/webhooks)
- [Merchant Onboarding](/developers/guides/merchant-onboarding)
- [Device Registration](/developers/guides/device-registration)
- [Terminal & Device Management](/developers/guides/terminal-device-management)
