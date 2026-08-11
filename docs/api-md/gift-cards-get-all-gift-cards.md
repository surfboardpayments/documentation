# Get All Gift Cards

## Overview
Retrieves a paginated list of all gift cards for a merchant. Supports filtering by type and status.

## Prerequisites
- Merchant must have an active account.
- API keys and secrets are required for authentication.
- Merchant ID is required to identify the merchant.

## Request

### HTTP Method and URL
```
GET /giftcards
```

### Headers
| Header | Value | Required |
|---|---|---|
| `api-key` | Your API Key | Yes |
| `api-secret` | Your API Secret | Yes |
| `merchant-id` | Your Merchant ID | Yes |
| `x-page-number` | Page number for pagination. Starts from 1. | Yes, for pagination |

### Query Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| `type` | string | No | Filter gift cards by type. Possible values: `FUND`, `ENTITLEMENT`. |
| `status` | string | No | Filter gift cards by status. |

### Request Example
```json
{
  "headers": {
    "api-key": "YOUR_API_KEY",
    "api-secret": "YOUR_API_SECRET",
    "merchant-id": "YOUR_MERCHANT_ID",
    "x-page-number": "1"
  }
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| `status` | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | array | Array of gift card objects. |
| `data[].giftCardId` | string | Unique identifier for the gift card. |
| `data[].pan` | string | Primary Account Number for the gift card. |
| `data[].name` | string | Name of the gift card. |
| `data[].cardType` | string | Type of the gift card (FUND or ENTITLEMENT). |
| `data[].amount` | number | Original monetary amount for FUND type gift cards. |
| `data[].currentAmount` | number | Current remaining amount for FUND type gift cards. |
| `data[].usageCount` | number | Number of times the gift card has been used. |
| `data[].redemptionLimit` | number | Usage limit for ENTITLEMENT type gift cards. |
| `data[].currency` | string | Currency code for the gift card. |
| `data[].accessControl` | string | Access control level of the gift card. |
| `data[].status` | string | Current status of the gift card. |
| `data[].expiryDate` | string | Expiry date of the gift card. |
| `data[].lastTransactionAt` | string | Timestamp of the last transaction. |
| `data[].transactionCount` | number | Total number of transactions. |
| `data[].totalRedeemed` | number | Total amount redeemed from the gift card. |
| `message` | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "giftCardId": "83a2adb2fd9d58095c",
      "pan": "1802723955691673",
      "name": "Birthday Gift Card",
      "cardType": "FUND",
      "amount": 100,
      "currentAmount": 100,
      "usageCount": 0,
      "redemptionLimit": 0,
      "currency": "SEK",
      "accessControl": "OPEN",
      "status": "CREATED",
      "expiryDate": "2025-12-31T00:00:00.000Z",
      "transactionCount": 0,
      "totalRedeemed": 0
    },
    {
      "giftCardId": "83a2ac747d9d580b5c",
      "pan": "1167728279630112",
      "name": "Birthday Gift Card",
      "cardType": "FUND",
      "amount": 100,
      "currentAmount": 100,
      "usageCount": 0,
      "redemptionLimit": 0,
      "currency": "SEK",
      "accessControl": "OPEN",
      "status": "CREATED",
      "expiryDate": "2025-12-31T00:00:00.000Z",
      "transactionCount": 0,
      "totalRedeemed": 0
    },
    {
      "giftCardId": "83a256695d9d28025c",
      "pan": "1657679889602692",
      "name": "Birthday Gift Card",
      "cardType": "FUND",
      "amount": 100,
      "currentAmount": 100,
      "usageCount": 0,
      "redemptionLimit": 0,
      "currency": "SEK",
      "accessControl": "OPEN",
      "status": "CREATED",
      "expiryDate": "2025-12-31T00:00:00.000Z",
      "transactionCount": 0,
      "totalRedeemed": 0
    }
  ],
  "message": "Gift cards fetched"
}
```

## Error Responses

### Possible Errors

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized"
}
```
**Description:** Invalid or missing API key and/or API secret. Ensure that the `api-key` and `api-secret` headers are correctly set and that your API key has the necessary permissions.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Forbidden"
}
```
**Description:** The API key does not have permission to access this resource. Verify that your API key has the required roles and permissions for accessing gift cards.

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request parameters"
}
```
**Description:** The request contains invalid parameters. Ensure all parameters are correctly formatted and meet the API's requirements. This can occur due to invalid filter parameters, such as an unsupported `type` or `status`.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "Internal server error"
}
```
**Description:** An unexpected error occurred on the server. Try the request again later. If the problem persists, contact support.

## Notes
- Use the `x-page-number` header for pagination. The first page is `x-page-number: 1`.
-  Filtering by `type` and `status` is optional but can improve performance by reducing the amount of data returned.
- Ensure your API key, secret, and merchant ID are securely stored and never exposed in client-side code.

---
