# Fetch All Merchants

## Overview
Retrieves a list of all merchants associated with a specific partner. Partners can use this API to get information regarding all their sub-merchants.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/merchants
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /partners/:partnerId/merchants
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR' |
| `data` | `array` | Response data |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `String` | Merchant ID of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`partnerId` | `String` | The Partner ID of the partner with whom the merchant is affiliated. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantName` | `String` | Name of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantLanguage` | `String` | Preferred language selected by the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantLogoUrl` | `String` | Merchant logo URL. |
| &nbsp;&nbsp;&nbsp;&nbsp;`email` | `String` | Email address of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`companyId` | `String` | Company ID of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | `String` | Two-letter ISO country code in uppercase, representing the primary location of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`mccCode` | `String` | Merchant Category Code (MCC) of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`createdAt` | `String` | Timestamp at which the merchant was created. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalNumberOfTransaction` | `String` | The total number of transactions performed. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalAmountOfTransaction` | `String` | The total amount of money involved in all transactions, in the smallest currency unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;`lastTransactionAt` | `String` | The timestamp of the last transaction in ISO format. |
| &nbsp;&nbsp;&nbsp;&nbsp;`phoneNumber` | `String` | The contact phone number related to the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalSales` | `String` | Total value of sales transactions for the merchant, in the smallest currency unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalRefunds` | `String` | Total value of refunded transactions for the merchant, in the smallest currency unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;`currencyCode` | `String` | Three-digit ISO currency code, representing the supported currency for the merchant. Returned only when the merchant has a payment-facilitator account. Can be any one of the following: ‘208’ \| ‘978’ \| ‘752’. |
| &nbsp;&nbsp;&nbsp;&nbsp;`acquirerMID` | `String` | Denotes the Acquirer MID for onboarding merchants through payment institution partners (PF or Acquirer). Returned only when the merchant has a payment-facilitator account. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "merchantId": "8248db4c5c8dd0130e",
      "partnerId": "8113d3f8403b380409",
      "merchantName": "Raynor LLC",
      "merchantLanguage": "sv",
      "merchantLogoUrl": "https://storage.googleapis.com/logo-raynor.png",
      "email": "sathish@surfboard.se",
      "companyId": "5590890439",
      "countryCode": "SE",
      "mccCode": 8021,
      "createdAt": "2024-06-06 06:03:49.125",
      "totalNumberOfTransaction": "11",
      "totalAmountOfTransaction": "2200",
      "lastTransactionAt": "2024-08-22 07:58:35.310568",
      "phoneNumber": "4623423423",
      "totalSales": "2200",
      "totalRefunds": "0",
      "currencyCode": "752",
      "acquirerMID": "gkjb4ug3KAUP"
    },
    {
      "merchantId": "81a25a0b304ed0070e",
      "partnerId": "8113d3f8403b380409",
      "merchantName": "Conroy, Hane",
      "merchantLanguage": "en",
      "merchantLogoUrl": "https://storage.googleapis.com/logo-conroy.png",
      "email": "conroy@gmail.com",
      "countryCode": "SE",
      "mccCode": 5812,
      "createdAt": "2022-11-04 13:41:46.81",
      "totalNumberOfTransaction": "1877",
      "totalAmountOfTransaction": "774628102",
      "lastTransactionAt": "2024-07-15 09:23:09.816546",
      "phoneNumber": "+468787870484",
      "totalSales": "774628102",
      "totalRefunds": "12000",
      "currencyCode": "752",
      "acquirerMID": "kpIy8YO3ycKyhKR"
    }
  ],
  "message": "Successfully fetched merchants details"
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
- The `partnerId` is part of the URL path and must be a valid identifier.
- This endpoint is paginated; see the Query Parameters for the supported paging parameters.

---
