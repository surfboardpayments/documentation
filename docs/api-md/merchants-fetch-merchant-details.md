# Fetch Merchant Details

## Overview
Retrieves information for a specific merchant. As a partner you can use this API to get information regarding your sub-merchants

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.
- The resource identified by `merchantId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/merchants/:merchantId
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |
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
GET /partners/:partnerId/merchants/:merchantId
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR' |
| `data` | `object` | Response data |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `String` | Merchant ID of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantType` | `string` | Classification of the merchant account within Surfboard. Possible values: `STANDARD`, `DYNAMIC_MERCHANT`, `MARKETPLACE_MERCHANT`, `PF_MERCHANT`, `PF_TEST_MERCHANT`, `PARTNER_MERCHANT`, `TEST_MERCHANT`, `DEACTIVATED_MERCHANT`, `ISV_MERCHANT`, `BLOCKED_MERCHANT`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`partnerId` | `String` | The Partner ID of the partner with whom the merchant is affiliated. |
| &nbsp;&nbsp;&nbsp;&nbsp;`currencyCode` | `Number` | Three-digit ISO currency code, representing the supported currency for the merchant. Can be any one of the following: ‘208’ \| ‘978’ \| ‘752’. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantName` | `String` | Name of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantLanguage` | `String` | Preferred language selected by the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantLogoUrl` | `String` | Merchant logo URL. |
| &nbsp;&nbsp;&nbsp;&nbsp;`email` | `String` | Email address of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`companyId` | `String` | Company ID of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | `String` | Two-letter ISO country code in uppercase, representing the primary location of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`mccCode` | `String` | Merchant Category Code (MCC) of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`address` | `object` | Physical address of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`careOf` | `string` | Name of the addressee that is accepting the correspondence for the intended recipient. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine1` | `string` | Address of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine2` | `string` | Address of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine3` | `string` | Address of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`city` | `string` | City where the merchant is located. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | `string` | Two-letter ISO country code in uppercase, representing the location of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`postalCode` | `string` | Postal code of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`createdAt` | `String` | Timestamp at which the merchant was created. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalNumberOfTransaction` | `String` | Total number of transactions performed by the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalAmountOfTransaction` | `String` | Denotes the total monetary value of all transactions performed by the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`lastTransactionAt` | `String` | Timestamp of the last transaction in ISO 8601 format represented as 'YYYY-MM-DDTHH:mm:ss.sssZ'. |
| &nbsp;&nbsp;&nbsp;&nbsp;`phoneNumber` | `String` | Phone number of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`acquirerMID` | `String` | Denotes the Acquirer MID for onboarding merchants through payment institution partners(PF or Acquirer). |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalSales` | `string` | Total value of sales transactions for the merchant, in the smallest currency unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalRefunds` | `string` | Total value of refunded transactions for the merchant, in the smallest currency unit. |
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
    "partnerId": "8113d3f8403b380409",
    "merchantName": "Conroy Hane and Parker",
    "merchantLanguage": "se",
    "merchantLogoUrl": "https://firebasestorage.googleapis.com/v0/b/firebase-test-2e49.appspot.com/o/files%2F8113d3f8403b380409%2FlogoUrl_1749127943794_emoji.png?alt=media&token=61077942-b4b3-482d-bd4d-1e3526486b7e",
    "email": "ashinisb@surfboard.se",
    "companyId": "5590520507",
    "countryCode": "SE",
    "mccCode": 1520,
    "phoneNumber": "917676576569",
    "merchantType": "STANDARD",
    "currencyCode": "752",
    "acquirerMID": "gfprLY1dyAQO",
    "address": {
      "careOf": "chennai",
      "addressLine1": "Stockholm",
      "addressLine2": "Diya ssssssTowers",
      "addressLine3": "process",
      "city": "Sweden",
      "countryCode": "SE",
      "postalCode": "22331"
    }
  },
  "message": "Successfully fetched merchant details "
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
- The `partnerId` is part of the URL path and must be a valid identifier.
- The `merchantId` is part of the URL path and must be a valid identifier.

---
