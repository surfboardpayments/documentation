# Transactions and Reports

Retrieve, filter and search transactions, and read a monthly report the way finance does. Covers why net sales and payout never match and how to reconcile a period end to end.

Source: https://www.surfboardpayments.com/developers/guides/transactions-and-reports
Category: online
Tags: Online, API, Transactions, Reporting, Reconciliation, In-Store

---
## Overview

A payment leaves two trails. There is the transaction, which is what happened at the terminal or the checkout, and there is the payout, which is money arriving in a bank account days later net of fees. Reconciliation is the work of tying those together, and most of the questions merchants ask about money are really questions about the gap between them.

This guide covers both halves: the transaction APIs you query directly, and how to read the monthly report that summarises a period.

## Fetching Transactions

### All Transactions

```
GET /transactions
```

Returns the merchant's transactions, newest first. Filter to a period with `startDate` and `endDate`:

```
GET /transactions?startDate=2026-04-01&endDate=2026-04-30
```

Responses are paged at 100 items. Ask for a page with the `X-PAGE-NUMBER` request header, and read `x-total-items` off the response to know how far to keep going:

```bash
curl 'YOUR_API_URL/transactions?startDate=2026-04-01&endDate=2026-04-30' \
  -H 'API-KEY: YOUR_API_KEY' \
  -H 'API-SECRET: YOUR_API_SECRET' \
  -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \
  -H 'X-PAGE-NUMBER: 2'
```

```
< x-page-number: 2
< x-total-items: 230
```

Past the last page you get `SUCCESS` with an empty `data` array rather than an error, so loop until the array comes back empty or you have seen `x-total-items` rows. Pagination works the same way on every list endpoint in the platform.

### One Order, One Payment, One Transaction

```
GET /transactions/:id/list
```

Accepts an `orderId`, a `paymentId` or a `transactionId` and returns every transaction attached to it. This is the call for an order settled in parts: one order, several payments, several transactions, all of them here. See [Partial Payments](/developers/guides/partial-payments) for how those orders come about.

### Search

```
GET /transactions/search?query=8208822
```

Free-text search across transaction data. It is the endpoint behind a support tool: a merchant reads out a number from a receipt or a bank statement, you paste it in, and you get the transaction without knowing which field it came from.

## The Monthly Report

The monthly report summarises sales, charges and payouts for a period. It is the document a merchant's bookkeeper opens, and the source of the single most common support question, which is some version of *why is the payout not the same as the sales?*

**Sales and payout do not happen in the same period.** A transaction made at the end of a month is often paid out in the next one. So total net sales is not the amount that landed in the bank that month, and it is not supposed to be.

### 1. Monthly Summary

The first page carries the totals.

**Total net sales in the period** — everything sold in the report period, after refunds. In plain terms: what was sold this month, net of what was given back.

**Total charges in the period** — everything deducted in the period:

| Line | What it is |
|------|------------|
| **Fees** | Charges tied to the payments themselves. |
| **Adjustments** | Other deductions affecting the payout, such as partner fees, itemised further down the report. |
| **VAT** | VAT on the fees and services that carry it. |

```
Fees + Adjustments + VAT = Total Charges
```

### 2. Total Payout in the Period

The total instructed for payout during the month. This is the money-moved number, and it is why the distinction matters: a payout made on 1 May can contain sales from 30 April. Total payout is not comparable, line for line, with total net sales for the same month.

### 3. Of Which: From Last Period

How much of this month's payouts came from the previous report period.

Sale on 30 April, payout on 1 May: the payout falls in May's *total payout*, but because the sale belongs to April, the same net amount also shows as *of which: from last period*.

### 4. Unsettled Amount From Period

Amounts belonging to this period that did not make it into this period's payouts. It is normal at the end of a month, and more pronounced around weekends and public holidays.

A payment taken on 31 May belongs to May's net sales. If the money is paid out in early June, it is not in May's payout — it sits here instead, and turns up in a later payout.

### 5. Why Net Sales and Payout Differ

Net sales follows the **sale**. Payout follows the **money**. In any given month, the payouts contain:

- sales from the previous month paid out in this one,
- sales from this month paid out in the next one,
- and the fees and adjustments attached to each payout.

So `Total Net Sales − Total Charges` is not `Total Payout` for a single month. Both numbers are right; they answer different questions.

### 6. A Worked Example

| Line | Amount |
|------|--------|
| Total net sales | 100 000 kr |
| Total charges | 5 000 kr |
| Total payout | 92 000 kr |
| Of which: from last period | 2 000 kr |
| Unsettled from period | 5 000 kr |

Nothing is missing here, even though 100 000 − 5 000 ≠ 92 000. Part of what was paid out this month came from the previous period, and part of this month's sales has not been paid out yet.

### 7. Behind the Summary

Three detail sections explain any total on the summary page:

| Section | What it shows |
|---------|---------------|
| **Monthly Payouts** | The individual payouts, and which sales periods they cover. |
| **Monthly Adjustments** | The individual adjustments behind the Adjustments total. |
| **Sales breakdown** | How sales split by store, payment method and so on. |

When a summary figure needs explaining, the answer is in one of these three.

### 8. How to Reconcile a Period

1. Check **total net sales** against your own sales report. Manual payment methods are not included in Surfboard's sales figures.
2. Check **total charges** and its split into fees, adjustments and VAT.
3. Look at **total payout**, and how much of it is marked *from last period*.
4. Check **unsettled amount from period** — sales from this period that have not been paid out yet.
5. For a single figure that still looks wrong, use the detail sections to find the transactions, fees or adjustments behind it.

### 9. Around Month Boundaries

Transactions and payouts near a month boundary can land in different report periods depending on when each was registered. That does not mean anything is missing. Two dates decide where a number appears:

- **Transaction date** — which sales period the payment belongs to.
- **Payout date** — when the money actually left.

### If It Still Does Not Add Up

Come to support with the specifics, and it is usually resolved in one pass:

- Merchant or company name
- The report period
- The two amounts that disagree
- The transaction ID, if it is about one transaction
- Whatever you are comparing the report against

## Reconciling With the API

The report is the summary; the API is the ledger behind it. A reconciliation job that runs monthly usually does this:

1. Pull the period's transactions with `GET /transactions?startDate=&endDate=`, paging to the end.
2. Pull the settlement reports for the same period — `GET /partners/:partnerId/merchants/:merchantId/reports`. See [Settlements & Reporting](/developers/guides/settlements-reporting).
3. Group transactions by their own date, and payouts by payout date. Do not expect the two groupings to agree; the difference is exactly *from last period* plus *unsettled from period*.
4. Investigate the individual items by ID with `GET /transactions/:id/list`.

Automate the grouping and the two reconciling numbers, and month-end stops being a conversation.

## Reference

- [Reporting API](https://developers.surfboardpayments.com/api/reporting)
- [Settlements & Reporting](/developers/guides/settlements-reporting)
- [Partial Payments](/developers/guides/partial-payments)
- [Payment Lifecycle](/developers/guides/payment-lifecycle)
- [Notification Subscriptions](/developers/guides/notification-subscriptions) — settlement reports delivered by email or SFTP
