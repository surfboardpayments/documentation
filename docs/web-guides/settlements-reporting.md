# Settlements & Reporting

Retrieve settlement reports, view adjustments, manage merchant charges, and register customer profiles for reconciliation and billing.

Source: https://www.surfboardpayments.com/developers/guides/settlements-reporting
Category: online
Tags: Online, API, Settlements, Reporting, Charges, Adjustments

---
## Overview

Once transactions are processed, you need visibility into what was settled, what fees were applied, and how to bill merchants for additional services. The Settlements and Reporting APIs give you that visibility.

This guide covers four related capabilities:

1. **Settlement reports** -- retrieve payout summaries for a merchant over a given period.
2. **Adjustments** -- view tips, surcharges, insurance, and other amounts applied to orders.
3. **Merchant charges** -- create, update, and list one-time or recurring charges billed to a merchant.
4. **Customer details** -- register customer profiles with addresses, contact information, and linked payment cards.

It also covers [reading a settlement report](#reading-a-settlement-report): why a monthly total and the payouts inside that month rarely match, and which figure answers which merchant question.

## Prerequisites

- A valid `partnerId` and `merchantId`
- API credentials (API key, API secret)

## Settlement Reports

Settlement reports summarize a merchant's settled transactions for a selected time period. Reports can be configured as `DAILY` or `MONTHLY` depending on the merchant's setup.

### Fetch settlement reports

```
GET /partners/:partnerId/merchants/:merchantId/reports
```

**Response:**

```json
{
  "status": "SUCCESS",
  "data": [
    {
      "payoutId": "po_83a1f...",
      "merchantId": "m_91b2c...",
      "transactionStartDate": "2026-01-01",
      "transactionEndDate": "2026-01-31",
      "settlementDate": "2026-02-03",
      "reportType": "MONTHLY",
      "url": "https://reports.surfboardpayments.com/settlements/po_83a1f...",
      "totalSale": 1250000,
      "totalRefund": 35000,
      "fee": 18750,
      "payout": 1196250
    }
  ],
  "message": "Settlement reports fetched successfully"
}
```

### Response fields

| Field | Type | Description |
|-------|------|-------------|
| `payoutId` | string | Identifies this specific payout |
| `transactionStartDate` | string | First transaction date covered (`YYYY-MM-DD`) |
| `transactionEndDate` | string | Last transaction date covered (`YYYY-MM-DD`) |
| `settlementDate` | string | Date the payout was issued (`YYYY-MM-DD`) |
| `reportType` | string | `MONTHLY` or `DAILY` |
| `url` | string | Direct link to view the full report |
| `totalSale` | number | Total sales amount in smallest currency unit |
| `totalRefund` | number | Total refunded amount |
| `fee` | number | Total fees deducted |
| `payout` | number | Net payout to the merchant |

Use the `url` field to download or redirect merchants to a detailed breakdown of every transaction in the settlement period.

## Reading a Settlement Report

This is the part support gets asked about most, so it is worth understanding before a merchant asks you.

A monthly report carries two fee totals, and they are usually different numbers:

- The **header figure** is the fee on transactions that happened in that calendar month. It is on a **transaction-date** basis.
- The **fee column in the payouts breakdown** sums the fees of the payouts issued during that month. It is on a **payout-date** basis.

Both are correct. They measure different things, and at a month boundary they cannot agree.

### Why the two totals differ

Payouts lag transactions by two to three days. A payout issued on 1 May settles transactions from the end of April, and the transactions from the last days of May are paid out in June. So the payout-date total borrows from the previous month at one end and loses to the next month at the other.

Take a merchant on daily payouts in May:

| Transactions | Paid out | Fee |
|---|---|---|
| 29--30 April | 1--2 May | 43.50 |
| 1--28 May | during May | 1,196.50 |
| 29--31 May | 1--3 June | 87.20 |

The monthly report header reads **1,283.70**, the fee on May's transactions: `1,196.50 + 87.20`. The fee column of the payouts breakdown reads **1,240.00**, the fee on May's payouts: `43.50 + 1,196.50`. Nothing has been charged twice, and neither figure is wrong.

The same shift applies to the sales and payout columns, not just fees. It is simply most visible on fees, because that is the number merchants ask about.

### Mapping a transaction to its report

One rule covers every case:

> **The monthly report follows the transaction date. The payouts breakdown follows the payout date.**

Every transaction is therefore counted in two places, and at a month boundary those two places are different months:

| Transaction happened | Paid out | Counted in the monthly report for | Appears in the payouts breakdown for |
|---|---|---|---|
| 30 April | 2 May | **April** | **May** |
| 15 May | 17 May | May | May |
| 31 May | 2 June | **May** | **June** |

The middle row is what people expect. The first and last rows are what the questions are about.

Drawn on a calendar, the two views are the same trading, shifted by the settlement lag:

```
transactions  │ 29 Apr  30 Apr │ 01 May  ...  30 May  31 May │
paid out      │ 01 May  02 May │ 03 May  ...  01 Jun  02 Jun │
                └──────┬───────┘              └──────┬──────┘
                 April's trading,              May's trading,
                 inside May's payouts          inside June's payouts
```

To show a merchant where a specific transaction went, take its date, add the settlement lag, and read off both columns. That is the whole mapping.

### The fee is not taken out of the payout

A payout settles transactions. The Surfboard fee for the period is collected separately, once the month has closed, rather than being netted off each payout as it goes.

That matters when a merchant reconciles a bank statement. They see payouts arriving through the month, then one fee deduction afterwards. **The deduction that lands in early June is May's fees, and it matches the May monthly report header, not the sum of the May payout rows.** A merchant who compares the June deduction against the May payout breakdown is comparing two different periods and will always find a gap.

If you do see a fee deducted from an individual payout, that is not the normal arrangement -- check the merchant's billing setup before explaining it as expected behaviour.

### Which figure answers which question

| The merchant asks | Use |
|---|---|
| "What were my fees for May?" | The **monthly report header** fee. Transaction basis, the month they actually traded. |
| "What was deducted from my account in June?" | The **May monthly report** fee total. Fees are collected after the month closes. |
| "Why was this payout this amount?" | The **payout row**, or the daily report for that settlement date. |
| "What did I sell in May?" | The **monthly report header** sales figure, not the sum of May's payouts. |

The short version to give a merchant: *your monthly report tells you what you traded and what it cost you that month; your payouts tell you what arrived in the bank and when. The two are offset by a couple of days at each end of the month.*

### Refunds land in the period they were processed

A refund processed in June against a May sale reduces June's payouts. It does not reopen May. A merchant looking for a refund in the month of the original sale will not find it, and the monthly totals are not wrong for lacking it.

### Before escalating a mismatch

Work through this first -- it resolves most reports of a mismatch:

1. Take the two figures and subtract. Does the difference equal the fees or sales of the days either side of the month boundary? If so, the report is right and this is the transaction-date versus payout-date offset.
2. Is a refund or an adjustment sitting in a different period from its original sale?
3. Is the merchant comparing a fee deduction against the payouts of the same month rather than the month before?

If none of those explain it, raise it with support with the `payoutId` values and the two figures you are comparing. Both come from the same [settlement reports endpoint](#fetch-settlement-reports), so quoting the IDs is faster than describing the rows.

### Getting the numbers over the API

The report list gives you both bases without downloading a file. `transactionStartDate` and `transactionEndDate` are the transaction basis; `settlementDate` is the payout basis. Filter on the pair you mean:

```
GET /partners/:partnerId/merchants/:merchantId/reports
```

- Fees a merchant incurred in May: the `MONTHLY` report whose `transactionStartDate` falls in May.
- Fees inside payouts issued in May: sum `fee` across the reports whose `settlementDate` falls in May.

Reading those two into a support tool, side by side and labelled, answers the question before it gets asked.

## Adjustments

Adjustments represent additional amounts applied to orders during a transaction -- tips, surcharges, insurance payments, and similar line items. The Adjustments API lets you retrieve all adjustments at the merchant level for tracking and reconciliation.

### Fetch adjustments

```
GET /partners/:partnerId/merchants/:merchantId/adjustments?startDate=2026-01-01&endDate=2026-01-31
```

Both `startDate` and `endDate` are required query parameters in `YYYY-MM-DD` format.

**Response:**

```json
{
  "status": "SUCCESS",
  "data": [
    {
      "adjustmentId": "adj_44c2e...",
      "adjustmentType": "TIP",
      "amount": "2500"
    },
    {
      "adjustmentId": "adj_55d3f...",
      "adjustmentType": "SURCHARGE",
      "amount": "1500"
    }
  ],
  "message": "Adjustments fetched successfully"
}
```

### Response fields

| Field | Type | Description |
|-------|------|-------------|
| `adjustmentId` | string | Unique identifier for the adjustment |
| `adjustmentType` | string | Type of adjustment (e.g. `TIP`, `SURCHARGE`, `INSURANCE`) |
| `amount` | string | Adjustment amount in smallest currency unit |

## Merchant Charges

Merchant charges let partners bill merchants for services, fees, or subscriptions. A charge can be one-time or recurring, and supports VAT.

### Create a charge

```json
POST /partners/:partnerId/merchants/:merchantId/charges
{
  "description": "Monthly platform fee",
  "currency": "752",
  "amount": 5000000,
  "vat": 35,
  "billingDate": "2026-03-01",
  "recurring": {
    "frequency": "monthly",
    "billingEndDate": "2027-03-01"
  }
}
```

**Response:**

```json
{
  "status": "SUCCESS",
  "data": {
    "chargeId": "chg_72a4d..."
  },
  "message": "Charge created successfully"
}
```

### Create charge request fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `description` | string | Yes | Brief description of the charge |
| `currency` | string | Yes | Three-digit ISO currency code |
| `amount` | number | Yes | Charge amount in smallest currency unit |
| `vat` | number | No | VAT amount |
| `billingDate` | string | No | Effective date (`YYYY-MM-DD`) |
| `recurring.frequency` | string | No | Billing frequency (see table below) |
| `recurring.billingEndDate` | string | No | When to stop recurring charges (`YYYY-MM-DD`) |

### Frequency options

| Value | Cycle |
|-------|-------|
| `daily` | Every day |
| `twiceWeekly` | Twice per week |
| `weekly` | Every week |
| `tenDays` | Every 10 days |
| `fortNightly` | Every 2 weeks |
| `monthly` | Every month |
| `everyTwoMonths` | Every 2 months |
| `trimester` | Every 4 months |
| `quarterly` | Every 3 months |
| `twiceYearly` | Every 6 months |
| `annually` | Every year |
| `unscheduled` | No fixed schedule |

### Fetch a charge by ID

```
GET /partners/:partnerId/merchants/:merchantId/charges/:chargeId
```

The response includes subscription details, VAT, frequency, billing dates, and any associated `subCharges`. Sub-charges are individual billing instances generated from a recurring charge.

**Key response fields:**

| Field | Type | Description |
|-------|------|-------------|
| `isSubscriptionCharge` | boolean | Whether this is a recurring charge |
| `description` | string | Charge description |
| `amount` | number | Charge amount in smallest currency unit |
| `vat` | number | VAT applied |
| `frequency` | string | Billing frequency |
| `billingStartDate` | string | Start date (ISO 8601) |
| `billingEndDate` | string | End date (ISO 8601) |
| `subCharges` | array | Individual billing instances with their own `chargeId`, `amount`, `status`, and `billingDate` |

### Update a charge

Modify an existing charge's amount, VAT, or recurring configuration:

```json
PUT /partners/:partnerId/merchants/:merchantId/charges/:chargeId
{
  "amount": 650000,
  "vat": 15,
  "recurring": {
    "updateType": "onlyNext",
    "billingEndDate": "2027-10-23"
  }
}
```

The `recurring.updateType` field controls the scope of the update:

| Value | Behaviour |
|-------|-----------|
| `onlyNext` | Apply the change only to the next billing cycle |
| `allFuture` | Apply the change to all future billing cycles |

### List all merchant charges

```
GET /partners/:partnerId/merchants/:merchantId/charges
```

Returns a paginated list of all charges (one-time and recurring) for the merchant, including `chargeId`, `description`, `amount`, `vat`, `status`, `billingDate`, and whether the charge is subscription-based.

## Billing Plans

A merchant charge is what a merchant is billed. A billing plan is the pricing behind it: the rates that apply to a card brand, a payment method and a terminal type, broken down by where the card comes from and what kind of card it is. Plans are defined once at partner level and then assigned to merchants.

### Create billing plans

```json
POST /partners/:partnerId/billing-plans
{
  "plans": [
    {
      "id": "SP_STANDARD_CARD",
      "paymentMethod": "CARD",
      "cardBrand": "VISA",
      "terminalType": "STANDARD",
      "planType": "FIXED",
      "description": "Standard card pricing 2026",
      "domesticDebitNonCommercial": 0.6,
      "domesticCreditNonCommercial": 0.9,
      "eeaDebitNonCommercial": 0.8,
      "eeaCreditNonCommercial": 1.1,
      "internationalDebitNonCommercial": 1.9,
      "internationalCreditNonCommercial": 2.3,
      "fixedCost": 30,
      "vatPercentage": 25
    }
  ]
}
```

`plans` is an array, so a full price list goes up in one call.

| Field | Description |
|-------|-------------|
| `id` | Your identifier for the plan. |
| `paymentMethod`, `cardBrand`, `terminalType` | What the plan applies to. One plan per combination. |
| `planType` | `FIXED` for a flat percentage or amount, `VARIABLE` for pricing that depends on transaction type. |
| `domestic*`, `eea*`, `international*` | Percentage rates, split by debit or credit and commercial or non-commercial. |
| `minimumCeiling` | Minimum amount for the rate to apply. |
| `fixedCost` | Fixed cost per transaction, in minor units. |
| `fixedPercentage` | Flat percentage across the board. |
| `vatPercentage` | VAT applied to the plan. |

The twelve rate fields are not padding. Interchange differs by card origin and card type, so a single blended rate either loses money on international commercial cards or overcharges on domestic debit. Price the grid.

### Manage plans

```
GET    /partners/:partnerId/billing-plans
GET    /partners/:partnerId/billing-plans/:id
DELETE /partners/:partnerId/billing-plans/:id
GET    /partners/:partnerId/merchants/:merchantId/plans
```

The last one is the useful one in support: it returns the plans actually assigned to a merchant, which is the answer to "why was I charged this". Plans are attached to a merchant during onboarding through the `transactionPricingPlan` and `displayProducts` control fields — see [Merchant Onboarding](/developers/guides/merchant-onboarding) and [Order and Return Terminals](/developers/guides/terminal-logistics).

## Customer Details

The Customer API lets you create and retrieve customer profiles. Profiles store personal information, addresses, contact details, and linked payment cards, enabling richer order data and streamlined checkout experiences.

### Create a customer

```json
POST /customers
{
  "firstName": "John",
  "middleName": "Doe",
  "birthDate": "1990/03/04",
  "countryCode": "SE",
  "address": [
    {
      "addressLine1": "Storgatan 12",
      "city": "Stockholm",
      "countryCode": "SE",
      "postalCode": "111 23",
      "role": "shipping"
    }
  ],
  "phoneNumbers": [
    {
      "phoneNumber": {
        "code": "46",
        "number": "701234567"
      },
      "role": "own"
    }
  ],
  "emails": [
    {
      "email": "john.doe@example.com",
      "role": "personal"
    }
  ],
  "cardIds": [
    "824c514bfe001805f0"
  ]
}
```

**Response:**

```json
{
  "status": "SUCCESS",
  "data": {
    "customerId": "cust_61e3b..."
  },
  "message": "Customer created successfully"
}
```

### Customer fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `firstName` | string | No | Customer's first name |
| `lastName` | string | No | Customer's last name |
| `birthDate` | string | No | Date of birth (`YYYY/MM/DD`) |
| `countryCode` | string | No | Two-letter ISO country code |
| `address` | array | No | Array of address objects (shipping, billing, etc.) |
| `address.addressLine1` | string | Yes | Primary address line |
| `address.city` | string | Yes | City |
| `address.countryCode` | string | Yes | Two-letter ISO country code |
| `address.postalCode` | string | Yes | Postal code |
| `address.role` | string | No | Address purpose (`shipping`, `billing`) |
| `emails` | array | No | Array of email objects with `email` and `role` |
| `phoneNumbers` | array | No | Array of phone objects with nested `phoneNumber` (`code`, `number`) and `role` |
| `cardIds` | array | No | Payment card identifiers to associate with the customer |

### Fetch a customer

```
GET /customers/:customerId
```

Returns the full customer profile including all addresses, emails, phone numbers, and linked card IDs.

## API Quick Reference

| Operation | Method | Endpoint |
|-----------|--------|----------|
| Fetch settlement reports | GET | `/partners/:partnerId/merchants/:merchantId/reports` |
| Fetch adjustments | GET | `/partners/:partnerId/merchants/:merchantId/adjustments` |
| Create merchant charge | POST | `/partners/:partnerId/merchants/:merchantId/charges` |
| Fetch charge by ID | GET | `/partners/:partnerId/merchants/:merchantId/charges/:chargeId` |
| Update merchant charge | PUT | `/partners/:partnerId/merchants/:merchantId/charges/:chargeId` |
| List all merchant charges | GET | `/partners/:partnerId/merchants/:merchantId/charges` |
| Create billing plans | POST | `/partners/:partnerId/billing-plans` |
| Fetch billing plans | GET | `/partners/:partnerId/billing-plans` |
| Fetch billing plan by ID | GET | `/partners/:partnerId/billing-plans/:id` |
| Remove billing plan | DELETE | `/partners/:partnerId/billing-plans/:id` |
| Fetch a merchant's plans | GET | `/partners/:partnerId/merchants/:merchantId/plans` |
| Create customer | POST | `/customers` |
| Fetch customer by ID | GET | `/customers/:customerId` |
