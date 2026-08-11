# Fetch Transaction Analytics

## Overview
Retrieves aggregated transaction analytics for a specific merchant. This can include analytics by store, terminal, date range, card brand, and more.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `merchantId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/analytics
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `merchantId` | `string` | Yes | Identifier supplied in the URL path. |

### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `storeId` | `string` | No | Provide store ID to filter analytics for a specific store. |
| `terminalId` | `string` | No | Provide terminal ID to filter analytics for a specific terminal. |
| `startDate` | `string` | No | Start of the date range in yyyy-mm-dd format. |
| `endDate` | `string` | No | End of the date range in yyyy-mm-dd format. |
| `orderType` | `string` | No | Type of order to filter by. Possible values are 'purchase' and 'return'. |
| `terminalType` | `string` | No | Type of terminal to filter results. Possible values: `surfpad`, `surftouch`, `surfprint`, `checkoutPro`, `checkoutX`, `softpos`, `PaymentPage`, `SelfHostedPage`, `MerchantInitiated`. |
| `paymentMethod` | `string` | No | Payment method to filter analytics. |
| `posEntryMode` | `string` | No | POS entry mode to filter by. |
| `cardBrand` | `string` | No | Card brand to filter by. |
| `currency` | `string` | No | Three digit numeric or ISO code representing currency. |
| `groupBy` | `object` | No | Use this object to group analytics by store, terminal, etc. For example, groupBy[storeId]=true. |
| &nbsp;&nbsp;&nbsp;&nbsp;`storeId` | `boolean` | No | Set to true to group results by store. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalId` | `boolean` | No | Set to true to group results by terminalId. |
| &nbsp;&nbsp;&nbsp;&nbsp;`orderType` | `boolean` | No | Set to true to group results by orderType. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalType` | `boolean` | No | Set to true to group results by terminalType. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentMethod` | `boolean` | No | Set to true to group results by paymentMethod. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cardBrand` | `boolean` | No | Set to true to group results by cardBrand. |
| &nbsp;&nbsp;&nbsp;&nbsp;`posEntryMode` | `boolean` | No | Set to true to group results by posEntryMode. |
| &nbsp;&nbsp;&nbsp;&nbsp;`timeSegments` | `string` | No | Segments the analytics by time. Possible values are 'DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY'.for example groupBy[timeSegments]=DAILY. |

### Pagination

To filter analytics by date range, send in `startDate` and `endDate` as query params. You can also use additional query parameters like `storeId`, `terminalId`, `orderType`, etc. Grouping the results can be controlled via the `groupBy` object in the query.

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /merchants/:merchantId/analytics?terminalId=YOUR_TERMINAL_ID&startDate=2024-01-01&endDate=2024-02-01
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `array` | An array of analytics objects, each containing aggregated transaction information. |
| &nbsp;&nbsp;&nbsp;&nbsp;`currency` | `string` | The currency code for the transactions, typically a three-digit numeric code. |
| &nbsp;&nbsp;&nbsp;&nbsp;`storeId` | `string` | The store ID the transactions belong to. Present when results are grouped by this dimension. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalId` | `string` | The terminal ID from which the transactions were made. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalType` | `string` | Specifies the type of terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`orderType` | `string` | The type of order. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentMethod` | `string` | The payment method used. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cardBrand` | `string` | The brand of the card, if paymentMethod is 'CARD'. This may be empty if no card brand applies. |
| &nbsp;&nbsp;&nbsp;&nbsp;`posEntryMode` | `string` | The POS entry mode used for the transactions. Present when results are grouped by this dimension. |
| &nbsp;&nbsp;&nbsp;&nbsp;`timeSegments` | `string` | The date/time segment in which these transactions occurred. |
| &nbsp;&nbsp;&nbsp;&nbsp;`orderTransactionCount` | `string` | Number of transactions that match this grouping or filter. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalTransactionAmount` | `number` | Aggregate sum of transaction amounts (in minor currency units) for this group. |
| `message` | `string` | A message describing the status or outcome of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "currency": "752",
      "storeId": "82dd3f7c6a2ab00e03",
      "terminalId": "82dd3f9aad1ec80f04",
      "terminalType": "sb_terminal_c",
      "orderType": "PURCHASE",
      "paymentMethod": "CARD",
      "cardBrand": "VISA",
      "posEntryMode": "CONTACTLESS",
      "timeSegments": "2025-01-21 00:00:00",
      "orderTransactionCount": "1",
      "totalTransactionAmount": 150
    },
    {
      "currency": "752",
      "storeId": "82dd3f7c6a2ab00e03",
      "terminalId": "82dd3f9aad1ec80f04",
      "terminalType": "sb_terminal_c",
      "orderType": "PURCHASE",
      "paymentMethod": "CARD",
      "cardBrand": "MASTERCARD",
      "posEntryMode": "CONTACTLESS",
      "timeSegments": "2025-01-21 00:00:00",
      "orderTransactionCount": "3",
      "totalTransactionAmount": 450
    }
  ],
  "message": "Transaction Analytics Data queried successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request parameters."
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
- `MERCHANT-ID` is optional; when sent it must match the `:merchantId` in the path.
- The `merchantId` is part of the URL path and must be a valid identifier.
- This endpoint is paginated; see the Query Parameters for the supported paging parameters.

---
