# B2B Invoices

Bill a business buyer on payment terms instead of charging a card. Create an order paid with B2BINV, distribute the invoice as an e-invoice or by email, and credit it when the goods come back.

Source: https://www.surfboardpayments.com/developers/guides/b2b-invoices
Category: online
Tags: Online, API, Invoice, B2B, Payment Methods

---
## Overview

Above a few hundred euros, a business buyer generally will not pay by card. Procurement expects an invoice on terms, approved by someone who was not in the room when the order was placed, and paid by bank transfer thirty days later. A checkout that only takes cards quietly loses that business.

B2B invoicing in Surfboard is a payment method, not a separate product. It is the same [Create Order](/developers/guides/create-an-order) call against the same online terminal, with `paymentMethod` set to `B2BINV` and an `invoice` block that says how the invoice is delivered and when it falls due. Surfboard issues the document, distributes it as an e-invoice or by email, chases it with reminders if you ask, and gives the buyer bank details to settle against.

What changes is the timing. A card payment moves money at checkout; an invoice raises a claim at checkout and moves money on the due date. Everything downstream — reconciliation, credit notes, reporting — follows from that.

> **Scope:** B2BINV is an online payment method. Raise invoices against an online terminal — the `PaymentPage` or `MerchantInitiated` terminal your online store is provisioned with. It is not available on physical terminals.

## Prerequisites

1. A developer account at the [Developer Portal](https://developers.surfboardpayments.com/sign-up)
2. A merchant that has completed onboarding, with an approved online store — [Online Payment Link](/developers/guides/online-payment-link) covers store creation and domain verification
3. `b2binv` active on the merchant or the store
4. The `terminalId` of the store's online terminal

## Step 1: Activate B2B Invoicing

Card is on by default; `b2binv` is not. Activate it through the Payment Methods API:

```json
POST /merchants/:merchantId/payment-methods
{
  "b2binv": true
}
```

You can also activate it from the Partner Portal or the Merchant Portal — the three paths write to the same configuration, so pick whichever suits how the merchant is managed. To scope invoicing to one store rather than the whole merchant, use the store-level endpoint:

```
POST /merchants/:merchantId/stores/:storeId/payment-methods
```

See [Payment Methods](/developers/guides/payment-methods) for the full activation and deactivation flow. Until the method is active, the payment initiation inside Create Order will fail, so do this before you send the first invoice.

## Step 2: Identify the Buyer

This is the part that has no equivalent in a card payment. You are not charging a person, you are billing a legal entity, and the invoice has to name it correctly and say where to send it. Two blocks do that work: `customer`, which identifies who owes the money, and `billing`, which is the address the invoice is issued to.

### The Customer

Send both `person` and `company`:

```json
"customer": {
  "person": {
    "name": { "firstName": "Elin", "lastName": "Berg" },
    "email": "ap@radio-ocean.example",
    "phoneNumber": { "code": "46", "number": "701234567" }
  },
  "company": {
    "companyName": "Radio Ocean AB",
    "vatId": "SE556000000001",
    "registrationNumber": "5560000000"
  }
}
```

| Field | Notes |
|-------|-------|
| `company.companyName` | The legal name of the entity being billed, as it should appear on the invoice. |
| `company.vatId` | VAT registration number, including the country prefix. |
| `company.registrationNumber` | Company registration number. |
| `person.email` | Where an `EMAIL` invoice is delivered. Use the buyer's accounts-payable address, not the salesperson's. |
| `person.name`, `person.phoneNumber` | The contact on the buying side. |

The company details identify who owes the money and are what the invoice is issued against. Get them from the buyer at checkout rather than inferring them from an email domain — a wrong registration number is an invoice the buyer's finance team can reject.

### The Billing Address

`billing` is optional on a Create Order call in general. **For a B2B invoice it is mandatory** — an invoice is a document addressed to somewhere, and there is no sensible default.

```json
"billing": {
  "address": {
    "addressLine1": "Surfgatan 1",
    "city": "Stockholm",
    "postalCode": "11122",
    "countryCode": "SE"
  }
}
```

| Field | Required | Notes |
|-------|----------|-------|
| `billing.address.addressLine1` | Yes | Street address of the entity being billed. |
| `billing.address.city` | Yes | City. |
| `billing.address.postalCode` | Yes | Postal code. |
| `billing.address.countryCode` | Yes | ISO 3166-1 alpha-2, uppercase. |
| `billing.address.careOf` | No | Attention line — useful when invoices go to a named accounts-payable desk. |
| `billing.address.addressLine2`, `addressLine3` | No | Further address lines. |
| `billing.name`, `billing.email`, `billing.phoneNumber` | No | A billing contact distinct from `customer.person`. |

This is the buyer's registered billing address, which is not necessarily where the goods go. If you are shipping somewhere else, put that in `shipping` and leave `billing` as the address finance works from.

## Step 3: Create the Invoice Order

The call is Create Order with the invoice configuration carried in `controlFunctions.initiatePaymentsOptions.paymentMethodParams.invoice`:

```json
POST /orders
{
  "terminal$id": "813ca2cb12ce400405",
  "referenceId": "order-2026-0418",
  "billing": {
    "address": {
      "addressLine1": "Surfgatan 1",
      "city": "Stockholm",
      "postalCode": "11122",
      "countryCode": "SE"
    }
  },
  "orderLines": [
    {
      "id": "83dddf1596c8d03937",
      "name": "7'8 Radio Ocean Liner",
      "description": "7'8 Radio Ocean Liner surfboard",
      "quantity": 1,
      "amount": {
        "regular": 179200,
        "total": 179200,
        "currency": "752",
        "tax": [{ "type": "VAT", "percentage": 25, "amount": 35840 }]
      }
    }
  ],
  "customer": {
    "person": {
      "name": { "firstName": "Elin", "lastName": "Berg" },
      "email": "ap@radio-ocean.example",
      "phoneNumber": { "code": "46", "number": "701234567" }
    },
    "company": {
      "companyName": "Radio Ocean AB",
      "vatId": "SE556000000001",
      "registrationNumber": "5560000000"
    }
  },
  "controlFunctions": {
    "initiatePaymentsOptions": {
      "paymentMethod": "B2BINV",
      "paymentMethodParams": {
        "invoice": {
          "invoiceDistribution": "EINVOICE",
          "dueDate": "30d",
          "reminder": false,
          "invoicePaymentMethods": ["BANK", "DIRECT_BANK"]
        }
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
    "orderId": "845712d3b9674383020b",
    "paymentId": "845712d3b9675f900206",
    "interAppJWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "paymentPageLink": "https://pay.withsurfboard.com/845712d3b9674383020b?pi=ocaY_Xgzq9SqhTPR-ry9d8Ne2s3Cl9rB...",
    "invoiceDetails": {
      "invoiceId": 5100232680,
      "invoicePdfUrl": "https://b2b.payer.se/api/v1/receiptViewer/invoice/pdf/1946a1ab-141f-441c-938d-8044278922ed",
      "iban": "SE0000000000000000000000",
      "accountHolderName": "Surfboard Payments AB",
      "bic": "DNBASESX",
      "bankgiro": "0000000",
      "ocr": "00845712396759002065"
    }
  },
  "message": "Order created successfully"
}
```

Amounts follow the same rules as every other order: minor units, a numeric ISO 4217 `currency` (`752` is SEK), and tax stated per line. `totalOrderAmount` is optional, but when you send it, it has to reconcile with the lines.

Give every line a `description` as well as a `name`. On a card payment nobody reads the line items; on an invoice they are the document, and the person approving it may never have seen the order. A line that says only "Liner" is a line someone has to email you about.

### The Invoice Block

| Field | Required | Notes |
|-------|----------|-------|
| `invoiceDistribution` | Yes | `EINVOICE` or `EMAIL`. E-invoice is routed to the company; email goes to `customer.person.email`. |
| `dueDate` | Yes | A relative duration such as `30d` for Net 30, or an absolute date. |
| `invoicePaymentMethods` | Yes | How the buyer may settle: `BANK`, `DIRECT_BANK`, `CARD`. Send the ones you will accept. |
| `reminder` | Yes | Whether Surfboard sends reminders as the due date passes. |
| `debtCollectionEnabled` | No | Hands a past-due invoice to the debt-collection flow. |
| `contractReference` | No | Your reference for the underlying contract, carried on the invoice. |

`dueDate` is a commercial decision, not a technical one. Net 30 is the common default for procurement; longer terms are a financing choice the merchant is making on the buyer's behalf. Set `reminder` and `debtCollectionEnabled` deliberately too — both change what the buyer receives after the due date, and both should match what the merchant agreed with them.

### What Comes Back

Because the payment is initiated inside the same call, the response carries the invoice itself in `invoiceDetails`:

| Field | Type | Description |
|-------|------|-------------|
| `invoiceId` | number | The invoice identifier. Note it is a **number**, not a string — store it as one. |
| `invoicePdfUrl` | string | The invoice document. This is the thing the buyer's finance team will actually open. |
| `iban` | string | The account to transfer to, for international settlement. |
| `bic` | string | Bank identifier code for that account. |
| `accountHolderName` | string | The account holder shown on the invoice. |
| `bankgiro` | string | Swedish bankgiro number, for domestic transfers. |
| `ocr` | string | The OCR reference the buyer quotes on the payment so it reconciles automatically. |

`bankgiro` and `ocr` are how a Swedish buyer settles a `BANK` transfer, and the OCR is what matches their payment back to this invoice without anyone reading a bank statement. `iban` and `bic` cover payment from outside the country. All of them appear on the PDF, so you do not have to surface them yourself — but store `invoiceId` and `ocr` against your own accounts-receivable record, because those are what reconciliation is keyed on later.

The response also carries the usual `orderId` and `paymentId`, plus a `paymentPageLink` — the same hosted page a card order returns, where a buyer can settle through whichever of `DIRECT_BANK` or `CARD` you allowed in `invoicePaymentMethods`.

If you initiate the payment separately rather than inside Create Order, the same `invoiceDetails` block comes back from the [Initiate Payment](https://developers.surfboardpayments.com/api/payments) call instead.

## Step 4: Confirm and Reconcile

Order status works the same as for any other order:

```
GET /orders/:orderId/status
```

Subscribe to `order.paymentcompleted` and `order.paymentfailed` rather than polling on a timer — see [Webhooks](/developers/guides/webhooks-notifications) for subscriptions, retries and signature verification.

The thing to hold on to is that an invoice settles on its own timetable. The order tells you the invoice was raised and where it stands; the money arriving is a separate event on the buyer's terms. Reconcile invoice revenue against [Settlements & Reporting](/developers/guides/settlements-reporting) rather than treating order creation as cash in the bank.

## Crediting an Invoice

When an invoice was wrong or the goods come back, the buyer gets a credit invoice. **How you raise it depends on whether the original invoice has been paid**, and this is the one thing to get right before you write any code:

| The original invoice | What you do | One call or two |
|----------------------|-------------|-----------------|
| Raised, not yet paid | Cancel the order | One call, no body |
| Paid | Create a return order | A full order payload |

Because an invoice sits unpaid for the whole of its term by design, the unpaid case is the one you will hit most.

### Unpaid: Cancel the Order

There is nothing to give back yet, so this is a cancellation rather than a refund. Cancelling the order raises a credit invoice by default:

```
DELETE /orders/:orderId
```

The endpoint takes no request body.

```json
// Response
{
  "status": "SUCCESS",
  "message": "Order cancelled successfully"
}
```

That is the whole operation. Use it for the ordinary cases — wrong amount, wrong entity, the buyer walked away after the invoice went out.

### Paid: Create a Return Order

Once the buyer has settled, crediting is a refund and takes the standard return-order shape: a new order with negative quantities, each line pointing back at the order and the payment it credits.

```json
POST /orders
{
  "terminal$id": "813ca2cb12ce400405",
  "referenceId": "credit-2026-0418",
  "billing": {
    "address": {
      "addressLine1": "Surfgatan 1",
      "city": "Stockholm",
      "postalCode": "11122",
      "countryCode": "SE"
    }
  },
  "customer": {
    "person": {
      "name": { "firstName": "Elin", "lastName": "Berg" },
      "email": "ap@radio-ocean.example",
      "phoneNumber": { "code": "46", "number": "701234567" }
    },
    "company": {
      "companyName": "Radio Ocean AB",
      "vatId": "SE556000000001",
      "registrationNumber": "5560000000"
    }
  },
  "orderLines": [
    {
      "id": "83dddf1596c8d03937",
      "name": "7'8 Radio Ocean Liner",
      "description": "7'8 Radio Ocean Liner surfboard",
      "quantity": -1,
      "purchaseOrderId": "845712d3b9674383020b",
      "purchasePaymentId": "845712d3b9675f900206",
      "amount": {
        "regular": 179200,
        "total": 179200,
        "currency": "752",
        "tax": [{ "type": "VAT", "percentage": 25, "amount": 35840 }]
      }
    }
  ],
  "controlFunctions": {
    "initiatePaymentsOptions": {
      "paymentMethod": "B2BINV",
      "paymentMethodParams": {
        "invoice": {
          "invoiceDistribution": "EMAIL",
          "dueDate": "30d",
          "reminder": false,
          "invoicePaymentMethods": ["BANK", "DIRECT_BANK"]
        }
      }
    }
  }
}
```

Key details:

- `quantity` goes negative on every credited line. `amount.total` stays positive.
- `purchaseOrderId` and `purchasePaymentId` both belong **on the line item**: the `orderId` and `paymentId` returned when the original invoice was created.
- Repeat the `billing` address and the `invoice` block. The credit is its own addressed document and can be distributed differently from the original — `EMAIL` here, where the original went out as `EINVOICE`.
- Credit only some of the lines and you have a partial credit. The mechanics are the same as [Partial Refund](/developers/guides/partial-refund).

> **`OR_0035: Cannot refund from purchase order that is not completed. Status: PENDING`** means exactly what the two paths above describe — the invoice has not been paid, so there is nothing to refund. Cancel the order instead.

The buyer keeps the original invoice and receives a credit against it. Both documents stand; the credit does not erase the original.

## Error Handling

Failures come back as `status: "ERROR"` with an `OR_*` or `PS_*` code, and the ones you will meet setting this up are mostly configuration rather than payload:

- **The method is not active.** `b2binv` has to be activated on the merchant or store before an invoice payment can initiate. This is the most common first failure.
- **The company block is missing.** A B2B invoice needs an entity to bill; a `customer` with only a `person` is not enough.
- **The billing address is missing.** `billing.address` is optional on Create Order generally and mandatory here. Easy to miss if you are adapting a working card payload.
- **The invoice block is incomplete.** `invoiceDistribution`, `dueDate`, `invoicePaymentMethods` and `reminder` are all required by the payment initiation, even though Create Order will accept the order without them.
- **You refunded an invoice nobody paid.** `OR_0035` on a return order means the original is still `PENDING`. Cancel it instead.
- **A credit line has no `purchaseOrderId`.** Every negative line must reference the order it credits, and carry the `purchasePaymentId` alongside it.

[Create Order Error Codes](/developers/guides/create-order-error-codes) lists the full set, including the errors raised by the payment initiation that happens inside the same call.

## Next Steps

- [Payment Methods](/developers/guides/payment-methods) — activating and deactivating `b2binv`
- [Create an Order](/developers/guides/create-an-order) — line items, tax and control functions in full
- [Refund an Order](/developers/guides/refund-an-order) — the card-side equivalent of a credit invoice
- [Settlements & Reporting](/developers/guides/settlements-reporting) — reconciling what has actually been paid
- [Online Payment Link](/developers/guides/online-payment-link) — the store and terminal setup this guide assumes

## Reference

- [Create Order API](https://developers.surfboardpayments.com/api/orders)
- [Cancel an Order API](https://developers.surfboardpayments.com/api/orders) — the one-call credit for an unpaid invoice
- [Initiate Payment API](https://developers.surfboardpayments.com/api/payments)
- [Payment Methods API](https://developers.surfboardpayments.com/api/payment-methods)
