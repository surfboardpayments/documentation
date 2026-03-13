# Fetch Transaction Analytics

## Overview
Retrieves aggregated transaction analytics for a specific merchant. This can include analytics by store, terminal, date range, card brand, and more. Results can be filtered by various criteria and grouped to provide insights into transaction patterns. This endpoint supports pagination.

## Prerequisites
- Authentication is required to access this endpoint. Ensure you have the necessary API Key and Secret.
- You need a valid `merchantId` to fetch analytics for a specific merchant. This ID is obtained during the merchant onboarding process.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/analytics
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | `application/json` | Yes, if sending a request body (though this endpoint uses query parameters). |
| API-KEY | `YOUR_API_KEY` | Yes |
| API-SECRET | `YOUR_API_SECRET` | Yes |
| MERCHANT-ID | `YOUR_MERCHANT_ID` | Yes, in the path. |

### Query Parameters

To filter analytics by date range, send in `startDate` and `endDate` as query params. You can also use additional query parameters like storeId, terminalId, orderType, etc. Grouping the results can be controlled via the groupBy object in the query.

| Parameter | Type | Required | Description |
|---|---|---|---|
| storeId | string | No | Provide store ID to filter analytics for a specific store. |
| terminalId | string | No | Provide terminal ID to filter analytics for a specific terminal. |
| startDate | string | No | Start of the date range in yyyy-mm-dd format. |
| endDate | string | No | End of the date range in yyyy-mm-dd format. |
| orderType | string | No | Type of order to filter by. Possible values are `purchase` and `return`. |
| terminalType | string | No | Type of terminal to filter results. Possible values are: `surfpad`, `surftouch`, `surfprint`, `checkoutPro`, `checkoutX`, `softpos`, `PaymentPage`, `SelfHostedPage`, `MerchantInitiated`. See the table below for descriptions. |
| paymentMethod | string | No | Payment method to filter analytics. |
| posEntryMode | string | No | POS entry mode to filter by. |
| cardBrand | string | No | Card brand to filter by. |
| currency | string | No | Three-digit numeric or ISO code representing currency. |
| groupBy | object | No | Use this object to group analytics. See table below for properties. For example, `groupBy[storeId]=true`. |

#### Terminal Type Values

| Value | Description |
|---|---|
| `surfpad` | Hardware terminal with a physical keypad. |
| `surftouch` | Android terminal with custom payment apps, digital receipts etc. |
| `surfprint` | Android terminal with a built-in printer. |
| `checkoutPro` | Complete checkout solution with a customer facing screen. |
| `checkoutX` | Software checkout solution for NFC-enabled Android devices to accept contactless card payments. |
| `softpos` | SoftPOS solution on COTS devices. |
| `PaymentPage` | In this mode, the payment page and all associated configuration is managed by Surfboard. |
| `SelfHostedPage` | With SelfHostedPage, Surfboard renders the fields in your page. |
| `MerchantInitiated` | Set this type if you want to accept Merchant Initiated Transactions (MIT). |

#### Group By Object Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| storeId | boolean | No | Set to `true` to group results by store. |
| terminalId | boolean | No | Set to `true` to group results by terminalId. |
| orderType | boolean | No | Set to `true` to group results by orderType. |
| terminalType | boolean | No | Set to `true` to group results by terminalType. |
| paymentMethod | boolean | No | Set to `true` to group results by paymentMethod. |
| cardBrand | boolean | No | Set to `true` to group results by cardBrand. |
| posEntryMode | boolean | No | Set to `true` to group results by posEntryMode. |
| timeSegments | string | No | Segments the analytics by time. Possible values are `DAILY`, `WEEKLY`, `MONTHLY`, `QUARTERLY`, `YEARLY`. For example `groupBy[timeSegments]=DAILY`. |

### Request Example
```json
{
  "headers": {
    "Content-Type": "application/json",
    "API-KEY": "YOUR_API_KEY",
    "API-SECRET": "YOUR_API_SECRET",
    "MERCHANT-ID": "YOUR_MERCHANT_ID"
  },
  "queryParameters": {
    "terminalId": "YOUR_TERMINAL_ID",
    "groupBy[terminalId]": "true",
    "startDate": "2024-01-01",
    "endDate": "2024-02-01"
  }
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either `SUCCESS` or `ERROR`. |
| data | array | An array of analytics objects, each containing aggregated transaction information. See table below for properties of each object in the array.|
| message | string | A message describing the status or outcome of the request. |

#### Data Array Object Parameters
| Parameter | Type | Description |
|---|---|---|
| currency | string | The currency code for the transactions, typically a three-digit numeric code. |
| terminalId | string | The terminal ID from which the transactions were made. |
| terminalType | string | Specifies the type of terminal. |
| orderType | string | The type of order. |
| paymentMethod | string | The payment method used. |
| cardBrand | string | The brand of the card, if paymentMethod is `CARD`. This may be empty if no card brand applies. |
| timeSegments | string | The date/time segment in which these transactions occurred. |
| orderTransactionCount | string | Number of transactions that match this grouping or filter. |
| totalTransactionAmount | number | Aggregate sum of transaction amounts (in minor currency units) for this group. |
| message | string | A message describing the status or outcome of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "currency": "752",
      "terminalId": "82dd3f9aad1ec80f04",
      "terminalType": "sb_terminal_c",
      "orderType": "PURCHASE",
      "paymentMethod": "CARD",
      "cardBrand": "VISA",
      "timeSegments": "2025-01-21 00:00:00",
      "orderTransactionCount": "1",
      "totalTransactionAmount": 150
    },
    {
      "currency": "752",
      "terminalId": "82dd3f9aad1ec80f04",
      "terminalType": "sb_terminal_c",
      "orderType": "PURCHASE",
      "paymentMethod": "CARD",
      "cardBrand": "MASTERCARD",
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
**Description:** This error occurs when one or more of the query parameters are invalid or missing. Verify that all required parameters are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Authentication failed."
}
```
**Description:** This error occurs when the provided API Key and Secret are invalid or missing. Ensure that your authentication credentials are correct.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Merchant not found."
}
```
**Description:** This error occurs if the specified `merchantId` does not exist. Verify that the `merchantId` in the URL is correct.

---

## Notes
- When grouping by time segments, ensure the `startDate` and `endDate` cover a reasonable range. Large ranges might result in slow response times.
- The `totalTransactionAmount` is represented in minor units of the currency. For example, for USD, it is in cents.
- This endpoint supports pagination, but the details are not provided in the source JSON. Consult the full API documentation for information on pagination parameters (e.g., `page`, `pageSize`).
