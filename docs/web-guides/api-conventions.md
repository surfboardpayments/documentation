# API Conventions

The rules that hold across every Surfboard endpoint: authentication, the response envelope, amounts and currencies, identifiers, dates, pagination and environments.

Source: https://www.surfboardpayments.com/developers/guides/api-conventions
Category: online
Tags: Online, API, Pagination, Conventions, Authentication

---
## Overview

Every endpoint in the platform shares the same shape. Learn it once and the rest of the reference reads faster: you will know where the data is, how amounts are expressed, and how to page through a list before you have opened the page for a particular call.

## Authentication

Most calls take a key and secret pair, plus the merchant they act on behalf of:

```
API-KEY:      YOUR_API_KEY
API-SECRET:   YOUR_API_SECRET
MERCHANT-ID:  YOUR_MERCHANT_ID
```

**The merchant is a header, not a path segment.** Order, payment, and receipt endpoints are `/orders`, `/payments`, and `/receipts` — there is no `/merchants/{merchantId}/orders`. That path returns a bare `404 Not Found` with no hint about its shape, so it reads as a bad merchant ID rather than a bad URL. If a create-order call 404s, check the path before you check the ID.

Configuration endpoints — stores, terminals, tips, notifications, payment methods — *are* merchant-scoped and do carry `:merchantId` in the path.

Partner-level endpoints — onboarding a merchant, logistics, billing plans — carry the `partnerId` in the path and often do not need `MERCHANT-ID` at all. Where it is optional and you send it anyway, it must match the `:merchantId` in the path.

Three other schemes exist for cases where a long-lived secret cannot travel:

| Scheme | Header | Used by |
|--------|--------|---------|
| Bearer JWT | `Authorization` | Server-side integrations that already hold a session |
| API token | `X-Surfboard-Api-Token` | Scoped machine access |
| Nonce | `X-Surfboard-Nonce` | Self-hosted checkout pages, issued per order |

Anything running in a browser or on a customer's phone uses a short-lived token instead of your key and secret. That is what [Client Auth Tokens](/developers/guides/client-auth-tokens) is for, and it is not optional: a key in client code is a key in public.

## The Response Envelope

Every response is the same three fields.

```json
{
  "status": "SUCCESS",
  "data": { },
  "message": "Order created successfully"
}
```

| Field | Notes |
|-------|-------|
| `status` | `SUCCESS` or `ERROR`. Check this, not just the HTTP code. |
| `data` | The payload. An object for a single resource, an array for a list. Absent or `null` on errors. |
| `message` | Human-readable. Log it; do not branch on it — the wording is not a contract. |

Errors keep the envelope and add a code where one applies:

```json
{
  "status": "ERROR",
  "message": "Invalid request body."
}
```

| HTTP | Meaning |
|------|---------|
| 400 | The body is malformed or a required field is missing. |
| 401 | Credentials are wrong, missing, or not valid for this account. |
| 403 | Authenticated, but not permitted to do this. |
| 404 | An identifier in the path does not resolve. |
| 500 | Server-side. Retry with backoff; if it persists, contact support. |

Order creation adds its own codes in the `OR_*`, `PS_*`, `GC_*` and `SP_*` families — see [Create Order Error Codes](/developers/guides/create-order-error-codes).

## Amounts and Currencies

**Amounts are integers in the smallest currency unit.** 10.00 SEK is `1000`. 5.00 EUR is `500`. There are no decimal amounts anywhere in the API, and passing one is a class of bug that survives testing and surfaces in production at a hundredth of the intended price.

**Currencies are numeric ISO 4217 codes, as strings.** SEK is `"752"`, EUR is `"978"`, NOK is `"578"`, DKK is `"208"`. Not `"SEK"`.

```json
"amount": {
  "regular": 50000,
  "total": 50000,
  "currency": "752"
}
```

**Prices are tax-inclusive.** Every amount you send is gross: the tax is already inside it. The `tax` array reports how much VAT is *contained within* the price, and never an amount to add on top. That is why `regular` and `total` match in the example above -- it is the rule, not a coincidence of round numbers.

```json
"totalOrderAmount": {
  "regular": 10999,
  "total": 10999,
  "currency": "752",
  "tax": [{ "amount": 2200, "percentage": 25, "type": "VAT" }]
}
```

`totalOrderAmount.total` must equal `regular` plus shipping, minus campaign discounts and adjustments. Adding tax on top so that `total` exceeds `regular` returns `P_0001: Invalid total order price`.

If you are coming from a sales-tax market, this is a real transformation rather than a field rename. A system that stores net prices and computes tax at checkout has to gross each unit up before building the order, and round per unit rather than on the order total. It is worth checking early: net prices pass every local test and fail on the first call to the API.

Countries, by contrast, are two-letter ISO 3166-1 alpha-2 codes in uppercase — `"SE"`, `"NO"` — and phone numbers split into a dialling code without the plus and a national number:

```json
"phoneNumber": { "code": "46", "number": "701234567" }
```

## Identifiers and Dates

Identifiers are opaque hex strings — `"83a1ba32774149710b"`. Do not parse them, infer type from them, or assume a length; store them as strings and hand them back unchanged. A `terminal$id` carries a `$` in its field name, which trips up some ORMs and query builders — quote it.

Dates and timestamps are ISO 8601 (`2026-04-04T10:20:30+02:00`). Durations, where a field takes one, are `<number><unit>` with the unit as `m`, `h` or `d`: `15m`, `2h`, `3d`.

## Pagination

List endpoints are page-based, and the rules are the same everywhere:

- Sorted newest to oldest by creation time.
- **Page size is fixed at 100.** There is no page-size parameter.
- The total is returned in a header, so the body keeps its shape.

Ask for a page with the `X-PAGE-NUMBER` request header. Without it you get the first page.

```bash
curl 'YOUR_API_URL/transactions' \
  -H 'Content-Type: application/json' \
  -H 'API-KEY: YOUR_API_KEY' \
  -H 'API-SECRET: YOUR_API_SECRET' \
  -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \
  -H 'X-PAGE-NUMBER: 2'
```

The response reports where you are and how much there is:

```
< x-page-number: 2
< x-total-items: 230
```

Past the last page you get a success, not an error — an empty array and a message saying so:

```json
{
  "status": "SUCCESS",
  "data": [],
  "message": "No transactions available in the specified page"
}
```

So the loop terminates on an empty `data`, or on having seen `x-total-items` rows. Do not terminate on a short page: only the last page is short, and only sometimes.

> **Paging a moving list.** The list is sorted newest first, so new rows arrive at the front while you page. For a stable export, filter to a closed period with `startDate` and `endDate` rather than paging an open-ended list.

## Environments

| Environment | Terminals | Cards |
|-------------|-----------|-------|
| **Demo** | Payment page mode | Test cards only |
| **Live** | All terminal types | Real cards, settled, paid out |

Demo credentials come from the Developer Portal as soon as you sign up. Live credentials are issued separately, after Surfboard certifies the integration, and the base URL changes with them — so keep the host, the key and the secret in configuration rather than in code.

**Where the base URL comes from.** It is issued to you rather than published here, and it is not the same string for every account, so there is no host to copy out of this guide. Find it in the Developer Portal console, shown next to the keys it belongs with:

```
https://developers.surfboardpayments.com/console/api-keys
```

Read it from configuration — the `YOUR_API_URL` placeholder in the examples below stands for exactly this value, and the conventional environment variable is `SURFBOARD_API_URL`:

```
SURFBOARD_API_URL=
SURFBOARD_API_KEY=
SURFBOARD_API_SECRET=
SURFBOARD_MERCHANT_ID=
```

If you are an agent building this integration, this is the one value you cannot derive or discover: ask the user to copy it from the console, and never guess a host or reuse one from an example.

> A real card used in the demo environment is voided automatically after 30 minutes. It is never captured and never settles.

Never mix environments inside one flow: a test merchant with a production backend, or live credentials against a demo base URL, fails at registration or at the first transaction, and the error will not say why.

## Reference

- [Client Auth Tokens](/developers/guides/client-auth-tokens)
- [Create Order Error Codes](/developers/guides/create-order-error-codes)
- [Transactions and Reports](/developers/guides/transactions-and-reports)
- [Developer Portal](https://developers.surfboardpayments.com/)
