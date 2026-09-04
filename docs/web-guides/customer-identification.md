# Customer Identification on Card Tap

Recognise a returning customer from the card they tap, before the payment runs. Apply their discount, points or price list to the open order, then take the money.

Source: https://www.surfboardpayments.com/developers/guides/customer-identification
Category: in-store
Tags: In-Store, API, Webhooks, Loyalty, Personalisation

---
## Overview

A card is an identity as well as an instrument. When a customer taps at the terminal, Surfboard sends you a webhook carrying a token for that card and the order it belongs to — before the payment is processed. If you recognise the token, you have a short window to change the order: apply a member price, redeem points, add a loyalty discount, attach the customer to the receipt.

The customer does nothing but pay. No app, no scan, no "are you a member with us?" at the till.

> **Android terminals only.** The feature is available for card payments on Surfboard's Android terminals. Support for further payment methods is on the roadmap.

## The Flow

| Step | Who | What happens |
|------|-----|--------------|
| 1 | You | Create the order as normal |
| 2 | Customer | Taps their card at the terminal |
| 3 | Surfboard | Sends `order.customer.identify` with the order and a card token |
| 4 | You | Look the token up, and update the order if you recognise it |
| 5 | You | Initiate the payment against the updated order |

The window between steps 3 and 5 is where your business logic lives, and it is short — the customer is standing at the terminal. Treat the lookup as a fast path: an indexed read on your side, not a report.

## Prerequisites

1. A registered Android terminal under an onboarded merchant and store
2. A webhook endpoint subscribed to `order.customer.identify` — see [Webhooks](/developers/guides/webhooks-notifications)
3. Somewhere to store card tokens against your customers

## Step 1: Create the Order

Nothing changes here. Create the order the way you always do, with the line items you have at the point of sale.

```json
POST /orders
{
  "terminal$id": "8386af3b0f71b80b04",
  "referenceId": "till-2-0418",
  "orderLines": [
    {
      "id": "ITEM-001",
      "name": "Nike Shoes",
      "quantity": 1,
      "amount": {
        "regular": 50000,
        "total": 50000,
        "currency": "752",
        "tax": [{ "amount": 10000, "percentage": 25, "type": "VAT" }]
      }
    }
  ],
  "totalOrderAmount": {
    "regular": 50000,
    "total": 50000,
    "currency": "752",
    "tax": [{ "amount": 10000, "percentage": 25, "type": "VAT" }]
  }
}
```

Leave `initiatePaymentsOptions` out. Payment is initiated as its own call in step 4, once you have had your chance to change the order — an order that starts paying immediately gives you no window to act in.

## Step 2: The Customer Taps

The terminal reads the card and Surfboard raises the event. The payment has not been processed at this point; the tap is being used for identification.

## Step 3: Receive `order.customer.identify`

```json
{
  "eventType": "order.customer.identify",
  "metadata": {
    "eventId": "832cf9fe1806581dff",
    "created": 1747553660038,
    "retryAttempt": 0,
    "webhookEventId": "81a214e74b107801ff"
  },
  "data": {
    "orderId": "832cf9f93d2fd0410b",
    "cardId": "c550c29e80908c887a"
  }
}
```

`cardId` is a tokenized stand-in for the card, stable for that card, and it is the only identity you get. It is not the card number and cannot be turned back into one, but treat it as personal data: it identifies a person across visits, which is the whole point of it.

Acknowledge with `200 OK` inside 10 seconds. A failed delivery is retried twice — after 5 minutes and then 10 — which is far too late for a customer at a till, so do the work on receipt rather than queueing it for later. Deduplicate on `metadata.eventId`.

You can also pull the same card data from the order rather than waiting for the webhook:

```
GET /orders/:orderId/tokens
```

See [Tokens](/developers/guides/tokens) for what comes back.

### Matching the Token

The first time you see a `cardId` you will not recognise it, and that is the normal state of a new customer:

- **Known token** — load the customer, apply what they are entitled to, move to step 4.
- **Unknown token** — take the payment unchanged. Store the token against the customer if they later identify themselves another way, and the next tap will be recognised.

Never block a payment on your lookup. If your service is slow or down, initiate the payment as it stands; a missed discount is a support ticket, a stalled till is a queue.

## Step 4: Update the Order

Apply what you found with the Update Order API. The order keeps its `orderId`.

```json
PUT /orders/:orderId
{
  "terminal$id": "8386af3b0f71b80b04",
  "customer": {
    "customerId": "cus_88213",
    "person": {
      "name": { "firstName": "John", "lastName": "Doe" },
      "email": "john@example.com"
    }
  },
  "orderLines": [
    {
      "id": "ITEM-001",
      "name": "Nike Shoes",
      "quantity": 1,
      "amount": {
        "regular": 50000,
        "campaign": 5000,
        "total": 45000,
        "currency": "752",
        "tax": [{ "amount": 9000, "percentage": 25, "type": "VAT" }]
      }
    }
  ],
  "totalOrderAmount": {
    "regular": 50000,
    "campaign": 5000,
    "total": 45000,
    "currency": "752",
    "tax": [{ "amount": 9000, "percentage": 25, "type": "VAT" }]
  },
  "metadata": {
    "loyaltyTier": "gold",
    "memberSince": "2023-11-02"
  },
  "controlFunctions": {
    "orderLineLevelCalculation": true
  }
}
```

What you change depends on what you are giving them:

| Intent | Where it goes |
|--------|---------------|
| Member price or loyalty discount | `campaign` on the line, or an order-level `adjustment` |
| Points redeemed as money off | An `adjustment`, so it is visible as its own line in reporting |
| Attach the person to the order | `customer`, which also carries the receipt to their email |
| Anything your own systems need later | `metadata`, on the order or the line |

Recalculate `totalOrderAmount` to match. A total that does not reconcile with its lines is rejected with `OR_0037`.

> **The window closes at payment.** Once a payment has been initiated for an order, it can no longer be updated. Everything you want to change has to be in before step 4.

## Step 5: Initiate the Payment

```json
POST /payments
{
  "orderId": "832cf9f93d2fd0410b",
  "paymentMethod": "CARD",
  "amount": 45000
}
```

The customer pays the amount you just set. From here it is an ordinary payment: `order.paymentcompleted` fires on success, and the receipt shows the discount as a line the customer can see.

## Storing Tokens Responsibly

The card token turns anonymous footfall into a recognisable customer, so it deserves the treatment personal data gets:

- Store it against a customer record, not in a log line.
- Give the customer a way to be forgotten that removes the token as well as the profile.
- Tell them what you are doing. "We recognised your card" is a good experience when the customer knows it can happen, and a bad one when they do not.
- The token is scoped to your merchant. It is not a national identifier, and it is not portable.

## Error Handling

| Symptom | Likely cause |
|---------|--------------|
| No webhook on tap | The endpoint is not subscribed to `order.customer.identify`, or the terminal is not an Android terminal. |
| `PUT /orders/:orderId` returns 404 | The `orderId` is wrong, or the order belongs to another merchant. |
| Update rejected after a tap | A payment has already been initiated for the order. The window has closed. |
| `OR_0037` on update | The new `totalOrderAmount` does not reconcile with the line items. |

## Reference

- [Order Customer Identity webhook](https://developers.surfboardpayments.com/references/webhooks)
- [Update Order API](https://developers.surfboardpayments.com/api/orders)
- [Payments API](https://developers.surfboardpayments.com/api/payments)
- [Tokens](/developers/guides/tokens)
- [Webhooks](/developers/guides/webhooks-notifications)
- [Create an Order](/developers/guides/create-an-order)
