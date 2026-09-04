# Tokens

Turn a card used once into a card you can charge again. Enable tokenization on an order, fetch the token it produced, and store it for subscriptions, repeat purchases and refunds.

Source: https://www.surfboardpayments.com/developers/guides/tokens
Category: online
Tags: Online, API, Tokenization, Cards, MIT

---
## Overview

A token is a reference to a card that Surfboard holds and you do not. The customer enters their details once, on a page or a terminal that is already in scope for PCI DSS, and you get back a `tokenId` you can charge later without the card ever touching your systems.

That is what makes the rest possible: subscription renewals, one-click repeat purchases, deposits settled after the fact, refunds routed back to the original card. This guide covers producing a token, reading it, and storing it. Charging one is [Server-to-Server API](/developers/guides/server-to-server-api), and scheduling the charges is [Recurring Payments](/developers/guides/recurring-payments).

| Where the card is entered | What tokenization gives you |
|---------------------------|------------------------------|
| Payment page or Online SDK | Card data handled inside Surfboard's PCI scope, never yours |
| MerchantInitiated terminal | A card you can charge with no customer present |
| Refunds | A reference back to the card that paid, without storing the card |

## Step 1: Ask for a Token

Set `enforceTokenization` when you create the order. On an online order it belongs inside `controlFunctions.online`:

```json
POST /orders
{
  "terminal$id": "YOUR_TERMINAL_ID",
  "orderLines": [
    {
      "id": "ITEM-001",
      "name": "First month",
      "quantity": 1,
      "amount": { "regular": 19900, "total": 19900, "currency": "752" }
    }
  ],
  "totalOrderAmount": { "regular": 19900, "total": 19900, "currency": "752" },
  "controlFunctions": {
    "initiatePaymentsOptions": { "paymentMethod": "CARD", "amount": 19900 },
    "online": {
      "enforceTokenization": true
    }
  }
}
```

Three flags decide how hard you insist, and the difference matters when the card or the issuer will not play along:

| Flag | Behaviour |
|------|-----------|
| `enforceTokenization` | Tokenize the card for future use. Overrides the terminal's own configuration. |
| `tokenisationIfPossible` | Tokenize where it is supported, and carry on quietly where it is not. |
| `errorIfTokenizationFails` | Fail the whole payment if the card cannot be tokenized. |

Pick by what breaks if there is no token. A subscription with no token to renew against is worse than a failed first payment, so `errorIfTokenizationFails` is right there. A shop offering "save this card for next time" should not lose the sale over it, so `tokenisationIfPossible` is right there.

For subscriptions, pair tokenization with the `recurring` block so the first payment is authorised as the start of a series rather than a one-off — see [Online Payment Link](/developers/guides/online-payment-link#recurring-orders).

## Step 2: Fetch the Token

The token exists once the payment succeeds. Read it from the order:

```
GET /orders/:orderId/tokens
```

```json
// Response
{
  "status": "SUCCESS",
  "data": [
    {
      "cardBrand": "VISA",
      "cardholderName": "Tom",
      "tokenId": "822d544dc48c200308",
      "createdAt": "2024-04-25T11:22:24.845Z",
      "expiryMonth": 7,
      "expiryYear": 2026,
      "truncatedPan": "8907",
      "cardArt": "iVBORw0KGgoAAAANSUhEUgAAAUQAAA......"
    }
  ],
  "message": "Fetched the card information."
}
```

| Field | What it is for |
|-------|----------------|
| `tokenId` | The handle you charge against. The only field that does anything. |
| `cardBrand`, `truncatedPan` | "Visa ending 8907" — how you show a saved card back to a customer. |
| `expiryMonth`, `expiryYear` | When the token stops working. Worth acting on before it does. |
| `cardholderName` | As given by the card. |
| `cardArt` | Base64 card image, if you want the saved card to look like the card. |

The response is an array. An order paid in parts, or retried on a second card, produces more than one token, so do not assume `data[0]`.

## Step 3: Store It

Store the `tokenId` against the customer in your own system, along with enough to describe it back to them — brand, last four, expiry. That pairing is the whole point: the token is meaningless without knowing whose card it is, and useless if the customer cannot tell which of their two Visas it is.

Store it where you would store an account identifier: your primary datastore, encrypted at rest, out of logs and analytics events. A token is not card data, but it is a bearer reference to someone's money.

## Charging a Stored Token

Pass it into a payment through `paymentMethodParams`:

```json
POST /payments
{
  "orderId": "83a1ba32774149710b",
  "paymentMethod": "CARD",
  "amount": 19900,
  "paymentMethodParams": {
    "tokenId": "822d544dc48c200308"
  }
}
```

A charge with no customer present is a Merchant Initiated Transaction, and it needs a terminal in `MerchantInitiated` mode — the terminal the customer paid on cannot do it. An online store is provisioned with one, so this is usually a matter of reading the store's terminal list rather than registering anything. [Server-to-Server API](/developers/guides/server-to-server-api) covers the setup and the rules that come with MIT.

## Expiry and Housekeeping

Tokens do not live forever, and the failure is silent until you try to charge:

- **The card expires.** You have `expiryMonth` and `expiryYear` at the point of tokenization, so you can warn a subscriber before the renewal that will fail rather than after it.
- **The card is replaced, lost or cancelled.** The token stops working with no notice to you. Handle the failure on the charge and ask the customer to re-authorise.
- **The customer asks you to forget them.** Delete your side of the mapping. A token with no customer attached is not usable and should not be kept.

Build the re-authorisation path before you need it: a link back to a payment page that tokenizes a fresh card and swaps the token on the subscription. It is the difference between a churned subscriber and a two-minute interruption.

## Reference

- [Fetch Tokens from Order](https://developers.surfboardpayments.com/api/orders)
- [Payments API](https://developers.surfboardpayments.com/api/payments)
- [Server-to-Server API](/developers/guides/server-to-server-api)
- [Recurring Payments](/developers/guides/recurring-payments)
- [Online Payment Link](/developers/guides/online-payment-link)
