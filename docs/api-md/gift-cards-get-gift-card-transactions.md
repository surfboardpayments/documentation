# Get Gift Card Transactions

## Overview
Retrieves a paginated list of transactions for a specific gift card. Supports filtering by transaction type.

## Prerequisites
- API Key and API Secret are required for authentication.
- A valid Merchant ID is required.
- The `giftCardId` must be a valid gift card identifier.

## Request

### HTTP Method and URL
```
GET /giftcards/:giftCardId/transactions
```

### Headers
| Header | Value | Required |
|---|---|---|
| `api-key` | Your API Key | Yes |
| `api-secret` | Your API Secret | Yes |
| `merchant-id` | Your Merchant ID | Yes |
| `x-page-number` | Page number for pagination | No |

### Query Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| `transactionType` | string | No | Filter transactions by type. Possible values: `ISSUED`, `CREDIT`, `DEBIT`. |

### Request Body Parameters
N/A

### Request Example
```json
{
  "headers": {
    "api-key": "YOUR_API_KEY",
    "api-secret": "YOUR_API_SECRET",
    "merchant-id": "YOUR_MERCHANT_ID",
    "x-page-number": "1"
  },
  "queryParameters": {
    "transactionType": "DEBIT"
  }
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| `status` | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | array | Array of transaction objects. |
| `data[].paymentId` | string | Unique identifier for the payment/transaction. |
| `data[].transactionType` | string | Type of transaction (ISSUED, CREDIT, DEBIT). |
| `data[].transactionAmount` | number | Amount involved in the transaction. |
| `data[].currency` | string | Currency code for the transaction amount. |
| `data[].valueBefore` | number | Gift card value before the transaction. |
| `data[].valueAfter` | number | Gift card value after the transaction. |
| `data[].orderId` | string | Associated order ID if applicable. |
| `data[].merchantId` | string | Merchant ID associated with the transaction. |
| `data[].storeId` | string | Store ID associated with the transaction. |
| `data[].metadata` | object | Additional metadata for the transaction. |
| `message` | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "paymentId": "83a2adb2fd9d58095d",
      "transactionType": "ISSUED",
      "transactionAmount": 100,
      "currency": "SEK",
      "valueBefore": 0,
      "valueAfter": 100,
      "merchantId": "83a2adb2fd9d58001a",
      "storeId": "83a2adb2fd9d58002b"
    },
    {
      "paymentId": "83a2adb2fd9d58095e",
      "transactionType": "DEBIT",
      "transactionAmount": 25,
      "currency": "SEK",
      "valueBefore": 100,
      "valueAfter": 75,
      "orderId": "83a2adb2fd9d58003c",
      "merchantId": "83a2adb2fd9d58001a",
      "storeId": "83a2adb2fd9d58002b",
      "metadata": {
        "terminalId": "83a2adb2fd9d58004d",
        "transactionDate": "2024-11-15T10:30:00Z"
      }
    }
  ],
  "message": "Gift card transactions retrieved successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid gift card ID"
}
```
**Description:** The provided gift card ID is invalid or not found. Ensure the gift card ID is correct.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API Key or Secret"
}
```
**Description:** The API Key or Secret provided in the headers is incorrect or missing. Verify that the API Key and Secret are valid and properly included in the request headers.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** A server-side error occurred during the request processing. Try again later. If the problem persists, contact support.

## Notes
- The `x-page-number` header is used for pagination. If not provided, the first page is returned.
- The `transactionType` query parameter allows filtering transactions by type. Valid values are `ISSUED`, `CREDIT`, and `DEBIT`.
- If no transactions are found for the specified gift card, the `data` array will be empty.

---
