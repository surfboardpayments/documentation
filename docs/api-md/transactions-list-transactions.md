# List Transactions

## Overview
Retrieve a paginated list of the authenticated merchant's transactions. Narrow the results to a date range, a single store, or a single terminal. When a start date is given without an end date, a 24-hour window from the start date is used.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).

## Request

### HTTP Method and URL
```
GET /transactions
```

### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `startDate` | `string` | No | Start of the date range to fetch transactions for (ISO 8601, e.g. 2026-06-01). When omitted, results are not date-filtered. |
| `endDate` | `string` | No | End of the date range. If a startDate is supplied without an endDate, a 24-hour window from startDate is used. |
| `storeId` | `string` | No | Return only transactions that took place at this store. |
| `terminalId` | `string` | No | Return only transactions processed by this terminal (checkout). |

### Pagination

Page through results with the `x-page-number` request header. The total number of matching transactions is returned in the `x-total-items` response header.

### Headers
| Header | Value | Required |
|---|---|---|
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `x-page-number` | `1` | No |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /transactions?startDate=2026-06-01&endDate=2026-06-30&storeId=st_2a91&terminalId=t_7c33
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, either 'SUCCESS' or 'ERROR'. |
| `data` | `array` | The transactions on the current page. |
| &nbsp;&nbsp;&nbsp;&nbsp;`transactionId` | `string` | Unique identifier of the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `string` | Identifier of the merchant the transaction belongs to. |
| &nbsp;&nbsp;&nbsp;&nbsp;`storeId` | `string` | Identifier of the store where the transaction took place. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalId` | `string` | Identifier of the terminal (checkout) that processed the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;`orderId` | `string` | Identifier of the order the transaction settled. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentId` | `string` | Identifier of the payment that produced the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;`referenceId` | `string` | Your own reference, supplied when the payment was created. |
| &nbsp;&nbsp;&nbsp;&nbsp;`rrn` | `string` | Retrieval reference number assigned by the acquirer. |
| &nbsp;&nbsp;&nbsp;&nbsp;`amount` | `number` | Transaction amount, in the smallest unit of the currency (e.g. öre for SEK). |
| &nbsp;&nbsp;&nbsp;&nbsp;`currency` | `string` | ISO 4217 currency code of the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;`method` | `string` | Payment method used, for example CARD, SWISH or GIFT_CARD. |
| &nbsp;&nbsp;&nbsp;&nbsp;`type` | `string` | Transaction type, for example PURCHASE or RETURN. |
| &nbsp;&nbsp;&nbsp;&nbsp;`orderSummary` | `string` | Short, human-readable summary of the order. |
| &nbsp;&nbsp;&nbsp;&nbsp;`timestamp` | `string` | When the transaction was created, in ISO 8601 format. |
| &nbsp;&nbsp;&nbsp;&nbsp;`voided` | `boolean` | Whether the transaction was voided. |
| &nbsp;&nbsp;&nbsp;&nbsp;`issuerCountry` | `string` | Country of the card issuer, reported at settlement. |
| &nbsp;&nbsp;&nbsp;&nbsp;`interchangeDomain` | `string` | Interchange domain the card falls under, for example domestic or intra-regional. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cardCategory` | `string` | Card category reported at settlement, for example consumer or commercial. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cardUsage` | `string` | Card funding type reported at settlement, for example debit or credit. |
| &nbsp;&nbsp;&nbsp;&nbsp;`fee` | `number` | Surfboard fee charged on the transaction, in the smallest currency unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;`feeVat` | `number` | VAT charged on the Surfboard fee, in the smallest currency unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;`settlementStatus` | `string` | Settlement state of the transaction; NOT_SETTLED until it is paid out. |
| &nbsp;&nbsp;&nbsp;&nbsp;`payout` | `number` | Amount paid out to the merchant for this transaction, in the smallest currency unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;`settlementRef` | `string` | Reference of the settlement batch the transaction was paid out in. |
| &nbsp;&nbsp;&nbsp;&nbsp;`settlementDate` | `string` | Date the transaction was paid out to the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`truncatedPan` | `string` | Last four digits of the card number (PAN), zero-padded to four characters. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cardLabel` | `string` | Application label of the card scheme used (the AID name). |
| &nbsp;&nbsp;&nbsp;&nbsp;`posEntryMode` | `string` | How the card was presented at the point of sale (entry mode). |
| &nbsp;&nbsp;&nbsp;&nbsp;`issuerApplication` | `string` | Issuer application data returned by the card. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalVerificationResult` | `string` | Terminal verification results (TVR) from the card interaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;`aid` | `string` | Application identifier (AID) of the card scheme used. |
| &nbsp;&nbsp;&nbsp;&nbsp;`customerResponseCode` | `string` | Response code returned by the card issuer. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cvmMethod` | `string` | Cardholder verification method code used during the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cvmMethodDescription` | `string` | Human-readable description of the cardholder verification method (e.g. 'Online PIN', 'No CVM'). |
| &nbsp;&nbsp;&nbsp;&nbsp;`authMode` | `string` | Authorization mode; ISSUER when the issuer authorized the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cardBrand` | `string` | Card brand, for example VISA or MASTERCARD. |
| &nbsp;&nbsp;&nbsp;&nbsp;`authCode` | `string` | Authorization code returned by the issuer. |
| &nbsp;&nbsp;&nbsp;&nbsp;`adjustments` | `array` | Tip or amount adjustments applied to the transaction. Present only when adjustments exist. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`type` | `string` | The kind of adjustment, for example TIP. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`amount` | `number` | Adjustment amount, in the smallest currency unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`adjustmentId` | `string` | Unique identifier of the adjustment. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "transactionId": "txn_8f21c0a9b7",
      "merchantId": "m_5f2c1a9b3d",
      "storeId": "st_2a91",
      "terminalId": "t_7c33",
      "orderId": "ord_4b19d2",
      "paymentId": "pay_a71f",
      "referenceId": "order-2026-0012",
      "rrn": "618234501122",
      "amount": 14900,
      "currency": "SEK",
      "method": "CARD",
      "type": "PURCHASE",
      "orderSummary": "2x Flat White",
      "timestamp": "2026-06-01T09:24:11.000Z",
      "voided": false,
      "settlementStatus": "SETTLED",
      "fee": 268,
      "feeVat": 67,
      "payout": 14632,
      "cardBrand": "VISA",
      "truncatedPan": "0341",
      "cardLabel": "VISA CREDIT",
      "authMode": "ISSUER"
    }
  ],
  "message": "Fetched all transactions under merchant"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Failed to fetch transactions"
}
```
**Description:** The request parameters are malformed. Check the URL path and query parameters against the documented schema and ensure all mandatory fields are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized access. Please provide valid credentials to access this endpoint."
}
```
**Description:** Authentication failed. Ensure the `API-KEY` and `API-SECRET` headers are correctly set and valid for your account.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server. Try the request again later. If the problem persists, contact support.

## Notes
- Authenticate with **one** of: an `API-KEY` + `API-SECRET` pair (shown above), a bearer JWT (`Authorization`), an API token (`X-Surfboard-Api-Token`), or a nonce (`X-Surfboard-Nonce`).
- This endpoint is paginated; see the Pagination section for how to page through the results.

---
