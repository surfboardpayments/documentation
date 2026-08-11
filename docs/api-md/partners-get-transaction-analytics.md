# Get Transaction Analytics

## Overview
Retrieve aggregated transaction analytics across the partner's merchants. Narrow the results with filters such as store, terminal, payment method, card brand, or date range, and group the totals by one or more dimensions to build reporting dashboards.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/transaction-analytics
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier of the partner to fetch analytics for. Supplied in the URL path. |

### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `merchantId` | `string` | No | Return only analytics for this merchant under the partner. |
| `storeId` | `string` | No | Return only analytics for transactions at this store. |
| `terminalId` | `string` | No | Return only analytics for transactions processed by this terminal. |
| `startDate` | `string` | No | Start of the date range to aggregate over (ISO 8601, e.g. 2026-06-01). |
| `endDate` | `string` | No | End of the date range to aggregate over (ISO 8601). |
| `orderType` | `string` | No | Return only analytics for this order type. Possible values: `PURCHASE`, `RETURN`. |
| `terminalType` | `string` | No | Return only analytics for this terminal type. |
| `paymentMethod` | `string` | No | Return only analytics for this payment method, for example CARD or SWISH. |
| `cardBrand` | `string` | No | Return only analytics for this card brand, for example VISA or MASTERCARD. |
| `currency` | `string` | No | Return only analytics in this currency (ISO 4217 code). |
| `includeRealtimeTransactions` | `boolean` | No | When true, includes transactions that have not yet settled in the aggregation. |

### Pagination

Page through results with the `x-page-number` request header. The total number of matching rows is returned in the `x-total-items` response header. Grouping is controlled with bracketed query keys, for example `groupBy[storeId]=true` or `groupBy[timeSegments]=DAILY`.

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
GET /partners/:partnerId/transaction-analytics?startDate=2026-06-01&endDate=2026-06-30&storeId=st_2a91&paymentMethod=CARD&orderType=PURCHASE
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, either 'SUCCESS' or 'ERROR'. |
| `data` | `array` | The aggregated analytics rows, one per grouping bucket. |
| &nbsp;&nbsp;&nbsp;&nbsp;`storeId` | `string` | Store the row is grouped by. Present only when grouping by store. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalId` | `string` | Terminal the row is grouped by. Present only when grouping by terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`orderType` | `string` | Order type the row is grouped by. Present only when grouping by order type. Possible values: `PURCHASE`, `RETURN`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalType` | `string` | Terminal type the row is grouped by. Present only when grouping by terminal type. |
| &nbsp;&nbsp;&nbsp;&nbsp;`orderTransactionCount` | `string` | Number of transactions in this grouping bucket. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalTransactionAmount` | `number` | Total transaction value for this bucket, in the smallest unit of the currency (e.g. öre for SEK). |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "storeId": "st_2a91",
      "orderType": "PURCHASE",
      "orderTransactionCount": "1204",
      "totalTransactionAmount": 18942000
    }
  ],
  "message": "Transaction analytics for partner fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Unable to fetch transaction analytics for partner."
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

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Resource not found."
}
```
**Description:** The requested resource does not exist. Verify the identifiers in the request path and try again.

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
- The `partnerId` is part of the URL path and must be a valid identifier.
- This endpoint is paginated; see the Pagination section for how to page through the results.

---
