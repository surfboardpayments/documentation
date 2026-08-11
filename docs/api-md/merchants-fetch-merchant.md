# Fetch Merchant

## Overview
Retrieve the profile and lifetime transaction summary for the authenticated merchant, including contact details, address, and current/previous-month sales analytics. Use this to display merchant information in your own dashboards.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `merchantId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `merchantId` | `string` | Yes | Identifier supplied in the URL path. |

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
GET /merchants/:merchantId
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | The merchant profile and transaction summary. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `string` | Unique identifier of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantType` | `string` | Classification of the merchant account within Surfboard. Possible values: `STANDARD`, `DYNAMIC_MERCHANT`, `MARKETPLACE_MERCHANT`, `PF_MERCHANT`, `PF_TEST_MERCHANT`, `PARTNER_MERCHANT`, `TEST_MERCHANT`, `DEACTIVATED_MERCHANT`, `ISV_MERCHANT`, `BLOCKED_MERCHANT`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`partnerId` | `string` | Identifier of the partner the merchant is affiliated with. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantName` | `string` | Name of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantLanguage` | `string` | Preferred language selected by the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantLogoUrl` | `string` | URL of the merchant logo. |
| &nbsp;&nbsp;&nbsp;&nbsp;`email` | `string` | Email address of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`companyId` | `string` | Company (corporate) identifier of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | `string` | Two-letter ISO country code, in uppercase, of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`mccCode` | `string` | Merchant Category Code (MCC) of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`createdAt` | `string` | Timestamp at which the merchant was created. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalNumberOfTransaction` | `string` | Total number of transactions performed by the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalAmountOfTransaction` | `string` | Total monetary value of all transactions performed by the merchant, in the smallest currency unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;`lastTransactionAt` | `string` | Timestamp of the merchant's most recent transaction, in ISO 8601 format. |
| &nbsp;&nbsp;&nbsp;&nbsp;`phoneNumber` | `string` | Contact phone number of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalSales` | `string` | Total value of sales transactions for the merchant, in the smallest currency unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalRefunds` | `string` | Total value of refunded transactions for the merchant, in the smallest currency unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;`currencyCode` | `string` | Three-digit ISO currency code of the merchant's settlement currency, e.g. '752' for SEK. |
| &nbsp;&nbsp;&nbsp;&nbsp;`acquirerMID` | `string` | Acquirer Merchant ID assigned when the merchant is onboarded through a payment facilitator or acquirer. |
| &nbsp;&nbsp;&nbsp;&nbsp;`address` | `object` | Physical address of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`careOf` | `string` | Name of the addressee accepting correspondence on behalf of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine1` | `string` | First line of the merchant address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine2` | `string` | Second line of the merchant address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine3` | `string` | Third line of the merchant address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`city` | `string` | City where the merchant is located. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | `string` | Two-letter ISO country code, in uppercase, of the merchant address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`postalCode` | `string` | Postal code of the merchant address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`analytics` | `object` | Aggregated sales and refund counts for the current and previous month. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`countOfSales` | `number` | Total number of sales transactions recorded for the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`countOfRefunds` | `number` | Total number of refund transactions recorded for the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`currentMonthSale` | `number` | Value of sales in the current month, in the smallest currency unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`previousMonthSale` | `number` | Value of sales in the previous month, in the smallest currency unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`currentMonthCountOfSale` | `number` | Number of sales in the current month. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`previousMonthCountOfSale` | `number` | Number of sales in the previous month. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "merchantId": "81fa6b2d8d5dc8040e",
    "merchantType": "STANDARD",
    "partnerId": "8113d3f8403b380409",
    "merchantName": "Conroy Hane and Parker",
    "merchantLanguage": "sv",
    "merchantLogoUrl": "https://storage.googleapis.com/logo.png",
    "email": "contact@surfboard.se",
    "companyId": "5590520507",
    "countryCode": "SE",
    "mccCode": "5812",
    "createdAt": "2024-06-06T06:03:49.125Z",
    "totalNumberOfTransaction": "1877",
    "totalAmountOfTransaction": "774628102",
    "lastTransactionAt": "2024-07-15T09:23:09.816Z",
    "phoneNumber": "46812345678",
    "totalSales": "774628102",
    "totalRefunds": "12000",
    "currencyCode": "752",
    "acquirerMID": "gfprLY1dyAQO",
    "address": {
      "careOf": "John Doe",
      "addressLine1": "Main Street 123",
      "city": "Stockholm",
      "countryCode": "SE",
      "postalCode": "12345"
    },
    "analytics": {
      "countOfSales": 1850,
      "countOfRefunds": 27,
      "currentMonthSale": 45900,
      "previousMonthSale": 61200,
      "currentMonthCountOfSale": 120,
      "previousMonthCountOfSale": 158
    }
  },
  "message": "Successfully fetched merchant details"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Unable to fetch merchant details"
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

---
